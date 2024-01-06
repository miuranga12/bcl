let currentOrder = {
    tickets: {
        universityStudent: 0,
        outsideStudent: 0,
        child6to15: 0,
        childLess6: 0
    },
    duration: "",
    extras: {
        rackets: 0,
        foodTokens: 0
    }
};

let overallCost = 0;

function updateCurrentOrderCost() {
    let totalCost = 0;

    totalCost += currentOrder.tickets.universityStudent * 500;
    totalCost += currentOrder.tickets.outsideStudent * 800;
    totalCost += currentOrder.tickets.child6to15 * 350;
    totalCost += currentOrder.tickets.childLess6 * 250;

    // Apply additional charges based on conditions
    switch (currentOrder.duration) {
        case "30mins":
            if (currentOrder.tickets.outsideStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 200; // Additional charge for Outsider Adult and Child for 30 mins
            }
            break;
        case "1hour":
            if (currentOrder.tickets.universityStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 250; // Additional charge for University Student Adult and Child for 1 hour
            } else if (currentOrder.tickets.outsideStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 500; // Additional charge for Outsider Adult and Child for 1 hour
            }
            break;
        case "3hours":
            if (currentOrder.tickets.universityStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 500; // Additional charge for University Student Adult and Child for 3 hours
            } else if (currentOrder.tickets.outsideStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 700; // Additional charge for Outsider Adult and Child for 3 hours
            }
            break;
        case "4hours":
            if (currentOrder.tickets.universityStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 800; // Additional charge for University Student Adult and Child for 4 hours
            } else if (currentOrder.tickets.outsideStudent > 0 && (currentOrder.tickets.child6to15 > 0 || currentOrder.tickets.childLess6 > 0)) {
                totalCost += 1000; // Additional charge for Outsider Adult and Child for 4 hours
            }
            break;
    }

    totalCost += currentOrder.extras.rackets * 1000;
    totalCost += currentOrder.extras.foodTokens * 500;

    document.getElementById("current-order").innerHTML = `<p>Current Order Cost: LKR ${totalCost}</p>`;
    overallCost += totalCost;
    document.getElementById("overall-order").innerHTML = `<p>Overall Order Cost: LKR ${overallCost}</p>`;
}


document.getElementById("reservation-form").addEventListener("submit", function(event) {
    event.preventDefault();
    if(validateReservationForm()){
    currentOrder.tickets.universityStudent = parseInt(document.getElementById("university-student").value) || 0;
    currentOrder.tickets.outsideStudent = parseInt(document.getElementById("outside-student").value) || 0;
    currentOrder.tickets.child6to15 = parseInt(document.getElementById("child-6-15").value) || 0;
    currentOrder.tickets.childLess6 = parseInt(document.getElementById("child-less-6").value) || 0;

    currentOrder.duration = document.getElementById("ticket-duration").value;
    currentOrder.extras.rackets = parseInt(document.getElementById("rackets").value) || 0;
    currentOrder.extras.foodTokens = parseInt(document.getElementById("food-tokens").value) || 0;

    updateCurrentOrderCost();
    }
});

document.getElementById("reset-form").addEventListener("click", function() {
    document.getElementById("reservation-form").reset();
    currentOrder = {
        tickets: {
            universityStudent: 0,
            outsideStudent: 0,
            child6to15: 0,
            childLess6: 0
        },
        duration: "",
        extras: {
            rackets: 0,
            foodTokens: 0
        }
    };
    document.getElementById("current-order").innerHTML = `<p>Current Order Cost: LKR 0</p>`;
});

document.getElementById("donate-button").addEventListener("click", function() {
    if (validateDonation()) {
        // Process the donation data
        const donationAmount = parseInt(document.getElementById("donation-amount").value);
        const donorName = document.getElementById("donor-name").value;
        const donorAddress = document.getElementById("donor-address").value;
        const creditCardDetails = document.getElementById("credit-card-details").value;

        // Display a success message or process the donation
        document.getElementById("donation-success").innerHTML = `
            <p>Thank you, ${donorName}, for your donation of LKR ${donationAmount}. Your support is appreciated!</p>
        `;
    }
});


document.getElementById("add-to-favorites").addEventListener("click", function() {
    localStorage.setItem("favoriteOrder", JSON.stringify(currentOrder));
    alert("Current order has been added to favorites.");
});

document.getElementById("order-favorite").addEventListener("click", function() {
    const favoriteOrder = JSON.parse(localStorage.getItem("favoriteOrder"));
    currentOrder.tickets.universityStudent += favoriteOrder.tickets.universityStudent;
    currentOrder.tickets.outsideStudent += favoriteOrder.tickets.outsideStudent;
    currentOrder.tickets.child6to15 += favoriteOrder.tickets.child6to15;
    currentOrder.tickets.childLess6 += favoriteOrder.tickets.childLess6;
    currentOrder.duration = favoriteOrder.duration;
    currentOrder.extras.rackets += favoriteOrder.extras.rackets;
    currentOrder.extras.foodTokens += favoriteOrder.extras.foodTokens;

    updateCurrentOrderCost();
});

document.getElementById("place-order").addEventListener("click", function() {
    alert("Thank you for your reservation.");
    document.getElementById("reservation-form").reset();
    currentOrder = {
        tickets: {
            universityStudent: 0,
            outsideStudent: 0,
            child6to15: 0,
            childLess6: 0
        },
        duration: "",
        extras: {
            rackets: 0,
            foodTokens: 0
        }
    };
    overallCost = 0;
    document.getElementById("current-order").innerHTML = `<p>Current Order Cost: LKR 0</p>`;
    document.getElementById("overall-order").innerHTML = `<p>Overall Order Cost: LKR 0</p>`;
});
// Function to validate form inputs
function validateForm() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(e => e.remove());

    // Validate ticket quantities
    ['university-student', 'outside-student', 'child-6-15', 'child-less-6'].forEach(id => {
        const input = document.getElementById(id);
        if (input.value < 0 || isNaN(input.value)) {
            showError(input, 'Please enter a valid number of tickets');
            isValid = false;
        }
    });

    // Validate rackets and food tokens
    if (document.getElementById("rackets").value < 0 || isNaN(document.getElementById("rackets").value)) {
        showError(document.getElementById("rackets"), 'Please enter a valid number');
        isValid = false;
    }

    if (document.getElementById("food-tokens").value < 0 || isNaN(document.getElementById("food-tokens").value)) {
        showError(document.getElementById("food-tokens"), 'Please enter a valid number');
        isValid = false;
    }

    return isValid;
}

// Function to show error message
function showError(inputElement, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.8em';
    error.style.marginTop = '5px';
    error.innerText = message;
    inputElement.parentNode.appendChild(error);
}

// Modify the submit event listener

function validateDonation() {
    let isValid = true;
    const donationAmount = document.getElementById("donation-amount").value;
    const donorName = document.getElementById("donor-name").value;
    const donorAddress = document.getElementById("donor-address").value;
    const creditCardDetails = document.getElementById("credit-card-details").value;

    // Clear previous error messages
    document.querySelectorAll('.donation-error').forEach(e => e.remove());

    // Validate each field and show error if empty
    if (!donationAmount) {
        showError(document.getElementById("donation-amount"), 'Please select a donation amount');
        isValid = false;
    }
    if (!donorName.trim()) {
        showError(document.getElementById("donor-name"), 'Please enter your name');
        isValid = false;
    }
    if (!donorAddress.trim()) {
        showError(document.getElementById("donor-address"), 'Please enter your address');
        isValid = false;
    }
    if (!creditCardDetails.trim()) {
        showError(document.getElementById("credit-card-details"), 'Please enter credit card details');
        isValid = false;
    }

    return isValid;
}

// Reuse the showError function or define a new one for donation errors
function showError(inputElement, message) {
    const error = document.createElement('div');
    error.className = 'donation-error';
    error.style.color = 'red';
    error.style.fontSize = '0.8em';
    error.style.marginTop = '5px';
    error.innerText = message;
    inputElement.parentNode.appendChild(error);
}

function validateReservationForm() {
    let isValid = true;
    // Clear previous error messages
    document.querySelectorAll('.reservation-error').forEach(e => e.remove());

    // Validate ticket quantities
    ['university-student', 'outside-student', 'child-6-15', 'child-less-6', 'rackets', 'food-tokens'].forEach(id => {
        const input = document.getElementById(id);
        if (input.value < 0 || isNaN(input.value) || input.value === '') {
            showError(input, 'Please enter a valid number');
            isValid = false;
        }
    });

    // Validate ticket duration
    const ticketDuration = document.getElementById("ticket-duration").value;
    if (!ticketDuration) {
        showError(document.getElementById("ticket-duration"), 'Please select a duration');
        isValid = false;
    }

    return isValid;
}

// Reuse the showError function or define a new one for reservation errors
function showError(inputElement, message) {
    const error = document.createElement('div');
    error.className = 'reservation-error';
    error.style.color = 'red';
    error.style.fontSize = '0.8em';
    error.style.marginTop = '5px';
    error.innerText = message;
    inputElement.parentNode.appendChild(error);
}

document.getElementById("credit-card-details").addEventListener("input", function(event) {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (value.length > 16) {
        value = value.slice(0, 16); // Limit to 16 characters
    }
    event.target.value = value;
});
