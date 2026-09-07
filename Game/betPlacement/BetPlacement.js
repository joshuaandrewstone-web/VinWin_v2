getFunds();

function getFunds() {
    const fundsAmountElement = document.getElementById('funds-amount');
    const userData = JSON.parse(localStorage.getItem('userData'));

    fundsAmountElement.textContent += userData.userFunds.toFixed(2);
} 