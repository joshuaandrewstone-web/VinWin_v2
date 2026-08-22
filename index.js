const mainForm = document.getElementById('main-form');

mainForm.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById('main-form').innerHTML = `
        <div>
            <button class="form-btn start-btn">Start Game</button>
        </div>
        `;

});
