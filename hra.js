let currentPlayer = 'circle';
let gameButtons = document.querySelectorAll('.game__field--square');

const restartButton = document.querySelector;

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
