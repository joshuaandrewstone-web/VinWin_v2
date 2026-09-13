const betAmountInput = document.getElementById('bet-amount');
const currentBetElement = document.getElementById('current-bet');
const currentOddsElement = document.getElementById('current-odds');
const potentialReturnsElement = document.getElementById('potential-returns');

getFunds();
loadSelectedBet();

betAmountInput.addEventListener('input', function () {
    updatePotentialReturns(getSelectedOdds());
});

function getFunds() {
    const fundsAmountElement = document.getElementById('funds-amount');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userFunds = Number(userData.userFunds || 0);

    fundsAmountElement.textContent = `£${userFunds.toFixed(2)}`;
}

function loadSelectedBet() {
    const selectedBet = JSON.parse(localStorage.getItem('selectedBet') || 'null');

    if (!selectedBet) {
        updatePotentialReturns();
        return;
    }

    const safeOdds = toSafeNumber(selectedBet.odds);
    currentBetElement.textContent = `${selectedBet.name}`;
    currentOddsElement.textContent = safeOdds.toFixed(2);
    updatePotentialReturns(safeOdds);
}

function updatePotentialReturns(selectedOdds = getSelectedOdds()) {
    const betAmount = toSafeNumber(betAmountInput.value);
    const odds = toSafeNumber(selectedOdds);
    const totalReturns = betAmount * odds;

    potentialReturnsElement.textContent = `£${Number.isFinite(totalReturns) ? totalReturns.toFixed(2) : '0.00'}`;
}

function getSelectedOdds() {
    const selectedBet = JSON.parse(localStorage.getItem('selectedBet') || 'null');
    return selectedBet ? toSafeNumber(selectedBet.odds) : 0;
}

function toSafeNumber(value) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
}