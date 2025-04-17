let currentPlayer = 'circle';
let gameButtons = document.querySelectorAll('.game__field--square');

const currentPlayerElement = document.querySelector(
  '.game__options--state div',
);

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

  currentPlayerElement.innerHTML = `
    <img src="${currentPlayer}.svg" alt="${
    currentPlayer === 'circle' ? 'Krúžok' : 'Krížik'
  }">
  `;
  // Aby sme zamedzili možnosti zmeniť svoj ťah opakovaným kliknutím na ten istý button:
  currentButton.disabled = true;
};

gameButtons.forEach((button) => {
  button.addEventListener('click', chosenButton);
});
