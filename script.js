'use strict';

const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const btnroll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
let currentEl0 = document.getElementById('current--0');
let currentEl1 = document.getElementById('current--1');

let score, activePlayer, currentScore, playing;

const init = function () {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  dice.classList.add('hidden');
  playing = true;
};

const setCurrentScore = function (currentScore) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const switchPlayer = function () {
  currentScore = 0;
  setCurrentScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

init();

btnroll.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      setCurrentScore(currentScore);
    } else {
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 75) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnnew.addEventListener('click', function () {
  init();
});
