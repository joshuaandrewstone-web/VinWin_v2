const matchList = document.getElementById('match-list');

fetchMatches();

function fetchMatches() {
    fetch("https://api.the-odds-api.com/v4/sports/soccer_epl/odds?regions=uk&oddsFormat=decimal&apiKey=79bb14dc18b73d74906804279415a38a", { method: 'get' })
        .then(response => response.json())
        .then(data => {
            renderMatches(data);
        })
        .catch(() => {
            matchList.innerHTML = '<p class="match-error">Unable to load matches right now.</p>';
        });
}

function renderMatches(matches) {
    matchList.innerHTML = matches
        .map((match, index) => {
            const homeTeam = match.home_team || 'Home';
            const awayTeam = match.away_team || 'Away';
            const matchId = `${homeTeam}-${awayTeam}-${index}`;

            return `
                <button class="match-option" type="button" data-match-id="${matchId}" data-home="${homeTeam}" data-away="${awayTeam}">
                    <span class="match-teams">${homeTeam} vs ${awayTeam}</span>
                </button>
            `;
        })
        .join('');

    matchList.querySelectorAll('.match-option').forEach(button => {
        button.addEventListener('click', function () {
            const selectedMatch = {
                id: this.dataset.matchId,
                home: this.dataset.home,
                away: this.dataset.away,
                label: `${this.dataset.home} vs ${this.dataset.away}`
            };

            localStorage.setItem('selectedMatch', JSON.stringify(selectedMatch));
            window.location.href = '../betChoice/BetChoice.html';
        });
    });
}
