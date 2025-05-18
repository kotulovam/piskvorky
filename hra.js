import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';
// import { Winner } from "./winner.js"

let currentPlayer = 'circle';
const gameButtons = document.querySelectorAll('.game__field--square');

const chosenButton = async (event) => {
  const currentButton = event.target;

  gameButtons.forEach((button) => {
    button.disabled = true
  })

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
    <img src="${currentPlayer}.svg" alt="${currentPlayer === 'circle' ? 'Krúžok' : 'Krížik'
    }">`;

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

  setTimeout(() => {
    if (winner === 'o' || winner === 'x') {
      const nameofWinner = winner === 'o' ? 'Vyhrálo kolečko' : 'Vyhrál křížek';
      alert(`${nameofWinner}.`);
      location.reload();
    } else if (winner === 'tie') {
      alert('Hra skončila nerozhodne.');
      location.reload();
    }
  }, 100);

  if (currentPlayer === "cross") {
    const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: rewrittenField,
        player: 'x',
      }),
    })
    const data = await response.json()
    const { x, y } = data.position
    const field = gameButtons[x + y * 10]
    field.disabled = false
    field.click()

    setTimeout(() => {
      gameButtons.forEach((button) => {
        const isTaken =
          button.classList.contains("game__field--square-circle") ||
          button.classList.contains("game__field--square-cross");
        button.disabled = isTaken;
      });
    }, 200);
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
