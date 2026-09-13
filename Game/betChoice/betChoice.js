
const generateForm = document.getElementById('main-form');
const generateFormButtons = document.getElementById('main-form-buttons');

generateFormButtons.classList.add('isDisabled');

let teamsData = GetPremierLeagueTeams();

const selectedMatch = JSON.parse(localStorage.getItem('selectedMatch') || 'null');

if (selectedMatch && selectedMatch.label) {
    const matchTitle = document.createElement('h2');
    matchTitle.className = 'selected-match-label';
    matchTitle.textContent = selectedMatch.label;
    const formShell = document.getElementById('main-form');
    if (formShell && formShell.firstElementChild) {
        formShell.insertBefore(matchTitle, formShell.firstElementChild);
    }
}

requestOdds();

const submitBtn = document.getElementById('submit-btn');

const buttonOne = document.getElementById('option-1');
const buttonTwo = document.getElementById('option-2');
const buttonThree = document.getElementById('option-3');

const optionOne = document.getElementById('option-choice-1');
const optionTwo = document.getElementById('option-choice-2');
const optionThree = document.getElementById('option-choice-3');

document.addEventListener('click', function (e) {
    teamsData.forEach(team => team.isSelected = false);

    if (e.target.dataset.click) {
        if (e.target.dataset.click === "1") {
            const teamUpdate = teamsData.find(team => team.id === 1)
            teamUpdate.isSelected = true;
        }

        if (e.target.dataset.click === "2") {
            const teamUpdate = teamsData.find(team => team.id === 2)
            teamUpdate.isSelected = true;
        }

        if (e.target.dataset.click === "3") {
            const teamUpdate = teamsData.find(team => team.id === 3)
            teamUpdate.isSelected = true;
        }

        GeneratePage(teamsData);
    }

    if (e.target.dataset.confirm) {
    } else if (e.target.dataset.return) {
        teamsData.forEach(team => team.isSelected = false);
        generateForm.classList.remove('isDisabled');
        generateFormButtons.classList.add('isDisabled');
        GeneratePage(teamsData);
    }
    
})

function requestOdds() {
    fetch("https://api.the-odds-api.com/v4/sports/soccer_epl/odds?regions=uk&oddsFormat=decimal&apiKey=79bb14dc18b73d74906804279415a38a", {method: "get"})
        .then(request => request.json())
        .then(data => {
            let matchChoice = data[getRandomNumber(data.length)];

            if (selectedMatch) {
                const matchFromStorage = data.find(game => {
                    const homeMatches = game.home_team && selectedMatch.home ? game.home_team.toLowerCase() === selectedMatch.home.toLowerCase() : false;
                    const awayMatches = game.away_team && selectedMatch.away ? game.away_team.toLowerCase() === selectedMatch.away.toLowerCase() : false;
                    return homeMatches && awayMatches;
                });

                if (matchFromStorage) {
                    matchChoice = matchFromStorage;
                }
            }

            let teamData = (matchChoice.bookmakers.find(bookmaker => bookmaker.key === "leovegas").markets[0].outcomes)

            teamsData[0].name = teamData[0].name;
            teamsData[0].odds = teamData[0].price;

            teamsData[1].odds = teamData[2].price;

            teamsData[2].name = teamData[1].name;
            teamsData[2].odds = teamData[1].price;

            GeneratePage(teamsData);
        })
}

function getRandomNumber(length) {
    return Math.floor((Math.random() * length))
}

function GetPremierLeagueTeams() {
    let teamsData =
    [
        {
            name: '',
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
            name: '',
            id: 3,
            color: 'pink',
            isSelected: false,
            odds: 0
        }
    ]

    return teamsData;
}
function GeneratePage(teamsData) {
    let innerHTML = '';

    teamsData.forEach(team => {
        let isSelected = '';
        
        if (team.isSelected) {
            localStorage.setItem('selectedBet', JSON.stringify({
                id: team.id,
                name: team.name,
                odds: Number(team.odds) || 0,
                color: team.color
            }));
            GenerateSelectedPage(team);
            generateFormButtons.classList.remove('isDisabled');
            isSelected = 'isSelected';
        } 

        innerHTML += `<div class="game-option-full-container" id="option-${team.id}">
                        <h3>${team.name} to Win</h3>
                        <label class="game-option-containers ${team.color}-background game-option-text ${isSelected}" data-click="${team.id}" id="option-choice-${team.id}" for="${team.name}">${team.odds}</label>
                        <input type="radio"
                            name="${team.name}"
                            id="${team.id}"
                            value="${team.name}"
                            class="bet-option"
                            hidden />
                    </div>`
    });

    generateForm.innerHTML = innerHTML;
}

function GenerateSelectedPage(team) {
    let innerHTML = '';
    
    innerHTML += `<div class="button-container pink-background">
                    <a type="button" href="../../Game/betPlacement/BetPlacement.html" data-confirm="confirm" class="game-betChoice-btns">
                        Bet on ${team.name}?
                    </a>
                    <button type="button" data-return="return" class="game-betChoice-btns">
                        Return
                    </button>
                </div>
                `

    generateFormButtons.innerHTML = innerHTML;
    generateForm.classList.add('isDisabled');
}