const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.innerText = ''; // Clear previous text
        cell.addEventListener('click', handleClick, { once: true });
    });
    setStatusMessage(`Player X's turn`);
}

function handleClick(event) {
    const cell = event.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isCircleTurn = !isCircleTurn;
        setStatusMessage(`Player ${isCircleTurn ? 'O' : 'X'}'s turn`);
    }
}

function setStatusMessage(message) {
    statusMessage.innerText = message;
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === 'x' ? 'X' : 'O'; // Set text for X and O
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function endGame(draw) {
    if (draw) {
        setStatusMessage('Draw!');
    } else {
        setStatusMessage(`Player ${isCircleTurn ? 'O' : 'X'} wins!`);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

restartButton.addEventListener('click', startGame);
startGame();

