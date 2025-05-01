import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const gameButtons = document.querySelectorAll('.game__field--square');

const chosenButton = (event) => {
  const currentButton = event.target;

  if (currentPlayer === 'circle') {
    currentButton.classList.add('game__field--square-circle');
    currentButton.innerHTML = `<img src="circle-black.svg" alt="Krúžok">`;
    currentPlayer = 'cross';
  } else {
    currentButton.classList.add('game__field--square-cross');
    currentButton.innerHTML = `<img src="cross-black.svg" alt="Krížik">`;
    currentPlayer = 'circle';
  }

  document.querySelector('.game__options--state div').innerHTML = `
    <img src="${currentPlayer}.svg" alt="${
    currentPlayer === 'circle' ? 'Krúžok' : 'Krížik'
  }">`;

  // Aby sme zamedzili možnosti zmeniť svoj ťah opakovaným kliknutím na ten istý button:
  currentButton.disabled = true;

  let currentField = Array.from(gameButtons);

  const rewrittenField = currentField.map((fieldSquare) => {
    if (fieldSquare.classList.contains('game__field--square-circle')) {
      return 'o';
    } else if (fieldSquare.classList.contains('game__field--square-cross')) {
      return 'x';
    }
    return '_';
  });

  const winner = findWinner(rewrittenField);
  if (winner === 'o' || winner === 'x') {
    alert(`Winner of the game is ${winner.toUpperCase()}`);
    location.reload();
  }
};

gameButtons.forEach((button) => {
  button.addEventListener('click', chosenButton);
});

// Bonus
const preventRestart = document.querySelector(
  '.game__options--buttons--restart',
);
preventRestart.addEventListener('click', (event) => {
  const userConfirmation = confirm('Opravdu chceš začít znovu ?');
  if (userConfirmation === false) {
    event.preventDefault();
  }
});
