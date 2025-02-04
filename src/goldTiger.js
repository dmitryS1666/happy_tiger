// Импортируем функции для смены экранов и звуков
import { isCurrentScreen, switchScreen } from "./ui";

const grid = document.querySelector('.grid');
const startButton = document.getElementById('goldTigerStart');
const timerDisplay = document.getElementById('timer');
const preloader = document.querySelector('.preloader');

let timer = 15;
let interval;
let flippedCells = [];
let matchedCells = [];
let gameActive = false;

const images = [
    'res/happy_tiger/goldTiger/1.png',
    'res/happy_tiger/goldTiger/2.png',
    'res/happy_tiger/goldTiger/3.png',
    'res/happy_tiger/goldTiger/4.png'
];

// Создание пар изображений
function createPairs() {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 4);
    const pairs = [...selectedImages, ...selectedImages];
    shuffle(pairs);
    return pairs;
}

// Функция перемешивания массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Создание игрового поля
export function createGrid() {
    grid.innerHTML = ''; // Очистка поля перед созданием
    const pairs = createPairs();
    localStorage.setItem('lastGame', 'goldTigerPage');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        const back = document.createElement('div');
        back.classList.add('back');

        if (i === 4) {
            const img = document.createElement('img');
            img.src = 'res/happy_tiger/goldTiger/game_tiger.png';
            img.style.display = 'block';
            img.style.width = '100px';
            img.style.height = '100px';
            cell.appendChild(img);
        } else {
            const img = document.createElement('img');
            img.src = pairs[i < 4 ? i : i - 1];
            img.classList.add('front');
            cell.appendChild(back);
            cell.appendChild(img);
            cell.addEventListener('click', flipCell);
        }

        grid.appendChild(cell);
    }
}

// Переворачивание ячейки
function flipCell() {
    if (!gameActive || flippedCells.length >= 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCells.push(this);

    if (flippedCells.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

// Проверка на совпадение
function checkMatch() {
    const [cell1, cell2] = flippedCells;
    const img1 = cell1.querySelector('.front').src;
    const img2 = cell2.querySelector('.front').src;

    if (img1 === img2) {
        cell1.classList.add('matched');
        cell2.classList.add('matched');
        matchedCells.push(cell1, cell2);

        if (matchedCells.length === 8) { // Все пары найдены
            endGame(true); // Победа
        }
    } else {
        setTimeout(() => {
            cell1.classList.remove('flipped');
            cell2.classList.remove('flipped');
        }, 600);
    }
    flippedCells = [];
}

// Завершение игры
function endGame(isWin) {
    gameActive = false;
    clearInterval(interval);
    startButton.disabled = false; // Разблокируем кнопку старта

    if (isWin) {
        let score = parseInt(localStorage.getItem('score') || 0);
        localStorage.setItem('score', score + 200);
        switchScreen('winPage', 200, 'url(../res/happy_tiger/gold_tiger_bg.png) no-repeat');
    } else {
        switchScreen('failPage');
    }
}

// Функция сброса игры (сбрасывает таймер сразу)
function resetGame() {
    gameActive = false;
    clearInterval(interval);
    timer = 15; // Теперь таймер сбрасывается сразу
    timerDisplay.textContent = `00:${timer.toString().padStart(2, '0')}`;
    preloader.style.width = '100%';
    grid.innerHTML = '';
    flippedCells = [];
    matchedCells = [];
    startButton.disabled = false;
}

// Проверяем смену экрана и сбрасываем игру
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isCurrentScreen('goldTigerPage')) {
        resetGame(); // Обнуляем игру при возврате на экран
    }
});

// Обработчик старта игры
startButton.addEventListener('click', () => {
    resetGame();
    gameActive = true;
    startButton.disabled = true;
    createGrid();
    startTimer();
});

// Запуск таймера
function startTimer() {
    let timeLeft = 15;
    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
    preloader.style.width = '100%';

    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
        preloader.style.width = `${(timeLeft / 15) * 100}%`;

        if (timeLeft === 0) {
            clearInterval(interval);
            endGame(false);
        }

        // Если игрок сменил экран - сбрасываем игру
        if (!isCurrentScreen('goldTigerPage')) {
            resetGame();
            clearInterval(interval);
        }
    }, 1000);
}