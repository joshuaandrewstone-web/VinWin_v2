const buttonOne = document.getElementById('option-a');
const buttonTwo = document.getElementById('option-b');
const buttonThree = document.getElementById('option-c');

const optionOne = document.getElementById('option-choice-a');
const optionTwo = document.getElementById('option-choice-b');
const optionThree = document.getElementById('option-choice-c');

const mainForm = document.getElementById('form-no-btn');
const submitBtn = document.getElementById('submit-btn');

OddsGenerator();

buttonOne.addEventListener('click', function (e) {
    console.log(e.target.id);

    submitBtn.style.display = 'inline';
    submitBtn.classList.add('green-background');
    submitBtn.innerHTML = `you chose Spurs`;

    mainForm.style.display = 'none';
})

buttonTwo.addEventListener('click', function () {
    submitBtn.style.display = 'inline';
    submitBtn.classList.add('blue-background');
    submitBtn.innerHTML = `you chose a draw`

    mainForm.style.display = 'none';
})

buttonThree.addEventListener('click', function () {
    submitBtn.style.display = 'inline';
    submitBtn.classList.add('pink-background');
    submitBtn.innerHTML = `you chose man utd`

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