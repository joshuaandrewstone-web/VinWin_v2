
const generateForm = document.getElementById('main-form');

GetPremierLeagueTeams();

const mainForm = document.getElementById('form-no-btn');
const submitBtn = document.getElementById('submit-btn');

const buttonOne = document.getElementById('option-a');
const buttonTwo = document.getElementById('option-b');
const buttonThree = document.getElementById('option-c');

const optionOne = document.getElementById('option-choice-a');
const optionTwo = document.getElementById('option-choice-b');
const optionThree = document.getElementById('option-choice-c');

OddsGenerator();

buttonOne.addEventListener('click', function (e) {
    submitBtn.style.display = 'inline';
    submitBtn.classList.add('green-background');
    submitBtn.innerHTML = `you chose ${buttonOne.querySelector('input').value}`;

    mainForm.style.display = 'none';
})

buttonTwo.addEventListener('click', function (e) {
    submitBtn.style.display = 'inline';
    submitBtn.classList.add('blue-background');
    submitBtn.innerHTML = `you chose a draw`

    mainForm.style.display = 'none';
})

buttonThree.addEventListener('click', function (e) {
    submitBtn.style.display = 'inline';
    submitBtn.classList.add('pink-background');
    submitBtn.innerHTML = `you chose ${buttonThree.querySelector('input').value}`

    mainForm.style.display = 'none';
})

function OddsGenerator() {
    let bet1 = Math.floor(Math.random() * 100);
    let bet2 = Math.floor(Math.random() * (100 - bet1));
    let bet3 = 100 - bet2 - bet1;

    optionOne.innerHTML = bet1 + "%"
    optionTwo.innerHTML = bet2 + "%"
    optionThree.innerHTML = bet3 + "%";
}

function GetPremierLeagueTeams() {
    const team1 = {
        name: 'Spurs'
    }
    const team2 = {
        name: 'United'
    }

    GeneratePage(team1, team2)
}
function GeneratePage(team1, team2) {
    generateForm.innerHTML =
        `<form class="main-form game-option-form">
            <div id="form-no-btn">
                <div class="game-option-full-container" id="option-a">
                    <h3>${team1.name} to Win</h3>
                    <label class="game-option-containers green-background game-option-text" id="option-choice-a" for="${team1.name}">Placeholder Odds</label>
                    <input type="radio"
                            name="${team1.name}"
                            id="option-one"
                            value="${team1.name}"
                            class="bet-option"
                            hidden />
                </div>

                <div class="game-option-full-container" id="option-b">
                    <h3>Draw</h3>
                    <label class="game-option-containers blue-background game-option-text" id="option-choice-b" for="Draw">Placeholder Odds</label>
                    <input type="radio"
                            name="Draw"
                            id="option-two"
                            value="Draw"
                            class="bet-option"
                            hidden />
                </div>

                <div class="game-option-full-container" id="option-c">
                    <h3>${team2.name} to Win</h3>
                    <label class="game-option-containers pink-background game-option-text" id="option-choice-c" for="${team2.name}">Placeholder Odds</label>
                    <input type="radio"
                            name="${team2.name}"
                            id="option-three"
                            value="${team2.name}"
                            class="bet-option"
                            hidden />
                </div>
            </div>
            <button type="submit" class="game-submit-btn linen" id="submit-btn">

            </button>
        </form>`
}