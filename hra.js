let currentPlayer = 'circle';
let gameButtons = document.querySelectorAll('.game__field--square');

const chosenButton = (event) => {
  const currentButton = event.target;

  if (currentPlayer === 'circle') {
    currentButton.classList.add('game__field--square-circle');
    currentButton.innerHTML = `<img src="circle.svg" alt="Krúžok"></img>`;
    currentPlayer = 'cross';
  } else {
    currentButton.classList.add('game__field--square-cross');
    currentButton.innerHTML = `<img src="cross.svg" alt="Xko"></img>`;
    currentPlayer = 'circle';
  }
  // Aby sme zamedzili možnosti zmeniť svoj ťah opakovaným kliknutím na ten istý button:
  currentButton.disabled = true;
};

gameButtons.forEach((button) => {
  button.addEventListener('click', chosenButton);
});
