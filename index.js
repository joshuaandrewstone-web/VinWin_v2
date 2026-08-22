const mainForm = document.getElementById('main-form');
const startBtn = document.getElementById('start-btn');

mainForm.addEventListener('submit', function (e) {
    e.preventDefault();

    mainFormData = new FormData(mainForm);

    document.getElementById('main-form').innerHTML = `
        <div>
           <a href="./Game/betChoice.html" class="form-btn start-btn">
                <span class="start-btn-container">
                    <span>Start Game</span>
                    <span class="dark-amethyst">${mainFormData.get('UserName')}</span>
                </span>
            </a>
        </div>
    `;
});
