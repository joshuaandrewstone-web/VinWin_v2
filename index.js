const mainForm = document.getElementById('main-form');
const startBtn = document.getElementById('start-btn');

mainForm.addEventListener('submit', function (e) {
    e.preventDefault();

    mainFormData = new FormData(mainForm);

    createUser(mainFormData);

    document.getElementById('main-form').innerHTML = `
        <div class="main-form-buttons" id="main-form-buttons">
            <div class="fund-container">
                <form>
                    <label class="user-funds-label" for="UserFunds">Starting Funds:</label>
                    <input class="main-form-input fund-input" type="number" name="UserFunds" value="100" />
                    <p>Minimum of £20 required to open account.</p>
                    <button class="form-btn submit-btn fund-submit-btn" id="add-funds-btn" type="submit">Add Funds</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('add-funds-btn').addEventListener('click', function () {
        addFunds();
        startGameButtons();
    })
});

function startGameButtons() {
    document.getElementById('main-form-buttons').classList.add('isDisabled'); 

    document.getElementById('main-form').innerHTML = `
    <a href="./Game/betChoice/betChoice.html" class="form-btn start-btn" onclick="addFunds(${mainFormData})">
        <span class="start-btn-container">
            <span>Start Game</span>
            <span class="block">${mainFormData.get('UserName')}</span>
        </span>
    </a>`
}

function createUser(formData) {
    console.log('Creating user with the following data:');

    const userData = {
        name: formData.get('UserName'),
        email: formData.get('UserEmail'),
        password: formData.get('UserPassword'),
        userFunds: 100
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
}

function addFunds() {
    let user = localStorage.getItem('userData');
    let formData = JSON.parse(user);

    formData.userFunds = parseFloat(document.querySelector('input[name="UserFunds"]').value);

    localStorage.setItem('userData', JSON.stringify(formData));

    console.log(localStorage.getItem('userData'));
}