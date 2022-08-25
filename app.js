const form = document.getElementById('loan-form');

form.addEventListener('submit', function(e) {
    //Hide results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault()
});

function calculateResults() {
    console.log("Calculating...");
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    //results
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest')

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';
        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your values..')
    }

   
}

function showError(errorMessage) {
     //Hide results
     document.getElementById('results').style.display = 'none';
     //Show Loader
     document.getElementById('loading').style.display = 'none';
    //create a div
    const errorDiv = document.createElement('div');
    //Add a class to div
    errorDiv.className = 'alert alert-danger';

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Create a text node and append to div
    errorDiv.appendChild(document.createTextNode(errorMessage));

    //Insert error message
    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}