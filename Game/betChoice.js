
const generateForm = document.getElementById('main-form');

let teamsData = GetPremierLeagueTeams();

GeneratePage(teamsData);

const submitBtn = document.getElementById('submit-btn');

const buttonOne = document.getElementById('option-1');
const buttonTwo = document.getElementById('option-2');
const buttonThree = document.getElementById('option-3');

const optionOne = document.getElementById('option-choice-1');
const optionTwo = document.getElementById('option-choice-2');
const optionThree = document.getElementById('option-choice-3');

document.addEventListener('click', function (e) {
    teamsData.forEach(function (team) {
        team.isSelected = false;
    })

    if (e.target.dataset.click) {
        if (e.target.dataset.click === "1") {

            const teamUpdate = teamsData.find(function (team) {
                return team.id === 1
            })

            teamUpdate.isSelected = true;
        }

        if (e.target.dataset.click === "2") {
            const teamUpdate = teamsData.find(function (team) {
                return team.id === 2
            })

            teamUpdate.isSelected = true;
        }

        if (e.target.dataset.click === "3") {

            const teamUpdate = teamsData.find(function (team) {
                return team.id === 3
            })

            teamUpdate.isSelected = true;
        }

        GeneratePage(teamsData);
    }

    if (e.target.dataset.confirm) {
        console.log("confirm")
    } else if (e.target.dataset.return) {
        GeneratePage(teamsData);
    }
    
})


function GetPremierLeagueTeams() {
    let teamsData =
    [
        {
            name: 'Spurs',
            id: 1,
            color: 'green',
            isSelected: false,
            odds: 0
        },
        draw = {
            name: 'Draw',
            id: 2,
            color: 'blue',
            isSelected: false,
            odds: 0
        },
        team2 = {
            name: 'United',
            id: 3,
            color: 'pink',
            isSelected: false,
            odds: 0
        }
    ]

    let bet1 = Math.floor(Math.random() * 100);
    let bet2 = Math.floor(Math.random() * (100 - bet1));
    let bet3 = 100 - bet2 - bet1;

    const betArray = [bet1, bet2, bet3];

    for (let i = 0; i < teamsData.length; i++) {
        teamsData[i].odds = betArray[i]
    }

    return teamsData;
}
function GeneratePage(teamsData) {
    let innerHtml = '';

    teamsData.forEach(function (team) {
        let isSelected = '';
        let isDisabled = '';

        if (team.isSelected) {
            isSelected = 'isSelected';
            isDisabled = 'isDisabled'
            innerHtml +=
                `<div class="button-container pink-background">
                    <a type="button" href="./BetPlacement.html" data-confirm="confirm" class="game-betChoice-btns">
                        Bet on ${team.name}?
                    </a>
                    <button type="button" data-return="return" class="game-betChoice-btns">
                        Return
                    </button>
                </div>
                `
        }

        innerHtml +=
            `<div class="game-option-full-container" id="option-${team.id} ${isDisabled}">
                <h3>${team.name} to Win</h3>
                <label class="game-option-containers ${team.color}-background game-option-text ${isSelected}" data-click="${team.id}" id="option-choice-${team.id}" ${isDisabled} for="${team.name}">${team.odds}</label>
                <input type="radio"
                    name="${team.name}"
                    id="${team.id}"
                    value="${team.name}"
                    class="bet-option"
                    hidden />
            </div>`
    })

    generateForm.innerHTML = innerHtml;
}

function betPage() {
    console.log("hello")
}