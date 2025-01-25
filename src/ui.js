import {
    failSound,
    runMusic,
    stopMusic,
    winSound,
    clickEffect,
    selectEffect,
    settings
} from './settings'

import {checkFirstRunAndLoadData} from "./index";
import { Plugins } from '@capacitor/core';
import {setupRoulette} from "./chinaGift";
import {setupSpinJack} from "./spinJack";
import {startGame} from "./oldSaloon";

const { App } = Plugins;

// читать политику
const readPrivacyPolicyBtn = document.getElementById('readPrivacyPolicy');
if (readPrivacyPolicyBtn) {
    readPrivacyPolicyBtn.addEventListener('click', () => {
        clickEffect();

        const openInExternalBrowser = async () => {
            window.open('https://appwildwest.com/policy', '_system'); // открывает внешний браузер
        };

        openInExternalBrowser();
    });
}

// читать политику
const privacyBtn = document.getElementById('privacyBtn');
if (privacyBtn) {
    privacyBtn.addEventListener('click', () => {
        clickEffect();

        const openInExternalBrowser = async () => {
            window.open('https://appwildwest.com/policy', '_system'); // открывает внешний браузер
        };

        openInExternalBrowser();
    });
}

const privacyLink = document.getElementById('privacy_link');
if (privacyLink) {
    privacyLink.addEventListener('click', () => {
        clickEffect();

        const openInExternalBrowser = async () => {
            window.open('https://appwildwest.com/policy', '_system'); // открывает внешний браузер
        };

        openInExternalBrowser();
    });
}

// читать политику
const privacyPolicyBtn = document.getElementById('privacyPolicy');
if (privacyPolicyBtn) {
    privacyPolicyBtn.addEventListener('click', () => {
        clickEffect();

        const openInExternalBrowser = async () => {
            window.open('https://appwildwest.com/policy', '_system'); // открывает внешний браузер
        };

        openInExternalBrowser();
    });
}

// Open GAMES PAGE
const gamesBtn = document.getElementById('gamesBtn');
if (gamesBtn) {
    gamesBtn.addEventListener('click', () => {
        switchScreen('gamesPage');
    });
}

// Open GAMES PAGE
const okAcceptPageBtn = document.getElementById('okAcceptPage');
if (okAcceptPageBtn) {
    okAcceptPageBtn.addEventListener('click', () => {
        // Показать уведомление
        const acceptNotification = document.getElementById('acceptNotification');
        acceptNotification.classList.remove('hidden');

        localStorage.setItem('acceptPolicy', 'true');

        setTimeout(() => {
            acceptNotification.classList.add('hidden');
        }, 1500);

        switchScreen('firstPage');
    });
}

function isCurrentScreen(screenId) {
    const screen = document.getElementById(screenId); // Получаем элемент по ID
    return screen && !screen.classList.contains('hidden'); // Проверяем, не скрыт ли экран
}

// reset game
const resetGameBtn = document.getElementById('resetGame');
if (resetGameBtn) {
    resetGameBtn.addEventListener('click', () => {
        clickEffect();

        localStorage.setItem('score', 1000);
        localStorage.setItem('happyTigerSettings', JSON.stringify({ music: true, vibration: true }));

        // Показать уведомление
        const resetNotification = document.getElementById('resetNotification');
        resetNotification.classList.remove('hidden');

        setTimeout(() => {
            resetNotification.classList.add('hidden');
        }, 1500);
    });
}

const okSettingsBtn = document.getElementById('okSettings');
if (okSettingsBtn) {
    okSettingsBtn.addEventListener('click', () => {
        switchScreen('firstPage');
    });
}

const toggleMusicBtn = document.getElementById('toggle-music');
if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', () => {
        clickEffect();
    });
}

const toggleVibrationBtn = document.getElementById('toggle-vibration');
if (toggleVibrationBtn) {
    toggleVibrationBtn.addEventListener('click', () => {
        clickEffect();
    });
}

// reset game
const continueFailBtn = document.getElementById('continueFail');
if (continueFailBtn) {
    continueFailBtn.addEventListener('click', () => {
        clickEffect();
    });
}

// BACK button - closeSettingsBtn
const goBackBtn = document.getElementById('close_btn');
if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
        if (getCurrentPage() === 'gamesPage') {
            switchScreen('firstPage');
        } else {
            let page = localStorage.getItem('lastPage');
            switchScreen(page);
        }
    });
}

// BACK button - close_btn
const backSpinJackBtn = document.getElementById('backSpinJack');
if (backSpinJackBtn) {
    backSpinJackBtn.addEventListener('click', () => {
        switchScreen('gamesPage');
    });
}

// TAP to MENU
const firstPageTap = document.getElementById('playBtn');
if (firstPageTap) {
    firstPageTap.addEventListener("click", () => {
        switchScreen('gamesPage');
    });
}

// AGAIN_WIN or AGAIN_WIN
const againWinBtn = document.getElementById('againWin');
if (againWinBtn) {
    againWinBtn.addEventListener("click", () => {
        let page = localStorage.getItem('lastGame');
        switchScreen(page);
    });
}

// BACK_WIN or FAIL_WIN
const backFailBtn = document.getElementById('backFail');
if (backFailBtn) {
    backFailBtn.addEventListener("click", () => {
        switchScreen('gamesPage');
    });
}

// AGAIN_WIN or AGAIN_WIN
const againFailBtn = document.getElementById('againFail');
if (againFailBtn) {
    againFailBtn.addEventListener("click", () => {
        let page = localStorage.getItem('lastGame');
        switchScreen(page);
    });
}

// BACK_ROULETTE
const backRouletteBtn = document.getElementById('backRoulette');
if (backRouletteBtn) {
    backRouletteBtn.addEventListener("click", () => {
        switchScreen('gamesPage');
    });
}

// BACK_OLD_SALOON
const backChinaGiftBtn = document.getElementById('backChinaGift');
if (backChinaGiftBtn) {
    backChinaGiftBtn.addEventListener("click", () => {
        switchScreen('gamesPage');
    });
}

const settingsButton = document.getElementById('settingsButton');
if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        clickEffect();

        switchScreen('settingsPage'); // Переход к экрану основных вопросов
    });
}

function getCurrentPage() {
    const screens = document.querySelectorAll('.screen'); // Получаем все элементы с классом screen
    for (let screen of screens) {
        if (!screen.classList.contains('hidden') && screen.id.includes('Page')) {
            // Проверяем, что экран не скрыт и его id содержит "Page"
            return screen.id; // Возвращаем ID текущего экрана
        }
    }
    return null; // Если подходящий экран не найден
}

const startChinaGiftBtn = document.getElementById('startChinaGiftGame');
if (startChinaGiftBtn) {
    startChinaGiftBtn.addEventListener('click', startGame);
}

document.querySelector('.checkbox-container').addEventListener('change', (event) => {
    selectEffect();
});

const settingBtn = document.getElementById('settingBtn');
if (settingBtn) {
    settingBtn.addEventListener('click', () => {
        switchScreen('settingsPage'); // Переход к экрану основных вопросов
    });
}

function showPreloader() {
    return new Promise((resolve) => {
        $(`#preloaderPage`).fadeIn(500);
        setTimeout(() => {
            let percentageElement = document.getElementById('percentage');
            percentageElement.textContent = '0%'; // Сбрасываем текст
            let progress = 0;
            updatePercentage(percentageElement, progress);
        }, 200);

        setTimeout(() => {
            $(`#preloaderPage`).fadeOut(500, resolve); // Вызов resolve после завершения fadeOut
        }, 300);
    });
}

function showInfoBlock(mainBlock, showScore, showPolicyLink) {
    const infoBlock = document.getElementById('containerConfig');
    if (mainBlock) {
        infoBlock.classList.remove('hidden');
    } else {
        infoBlock.classList.add('hidden');
    }

    const score = document.getElementById('score');
    if (showScore) {
        score.classList.remove('hidden');
    } else {
        score.classList.add('hidden');
    }

    const privacy_link_config = document.getElementById('privacy_link_config');
    if (showPolicyLink) {
        privacy_link_config.classList.remove('hidden');
    } else {
        privacy_link_config.classList.add('hidden');
    }
}

function switchScreen(screenId, levelScore= 0, winBg = 'default') {
    clickEffect();

    localStorage.setItem('lastPage', getCurrentPage());

    const screens = document.querySelectorAll('.screen');

    // Скрываем все экраны
    screens.forEach(screen => screen.classList.add('hidden'));

    // Показываем прелоадер
    const targetScreen = document.getElementById(screenId);
    console.log('targetScreen: ');
    console.log(targetScreen);
    console.log(targetScreen.classList);
    console.log('-----------------------------');
    targetScreen.classList.remove('hidden');
    showInfoBlock(false, false, false);

    if (screenId === 'settingsPage' || screenId === 'gamesPage') {
        showInfoBlock(true, false, true);
    }

    if (screenId === 'winPage') {
        stopMusic();
        showWinPage(levelScore, winBg);
        showInfoBlock(true, false, false);
    }
    if (screenId === 'failPage') {
        stopMusic();
        if (settings.music) {
            failSound.volume = 0.5;
            failSound.play()
        }
        showInfoBlock(true, false, false);
        runMusic();
    }
    if (screenId === 'spinJackPage') {
        showInfoBlock(true, true, false);
        setupSpinJack();
    }
    if (screenId === 'chinaGiftPage') {
        showInfoBlock(true, true, false);
        setupRoulette();
    }
    if (screenId === 'oldSaloonPage') {
        showInfoBlock(true, true, false);
    }

    document.getElementById('scoreValue').innerText = localStorage.getItem('score');
}

function showWinPage(levelScore, bg) {
    let score = localStorage.getItem('score');
    document.getElementById('scoreValue').textContent = score;

    const valueElement = document.getElementById('winValue');
    const winPage = document.getElementById('winPage');

    winPage.style.background = bg;
    winPage.style.backgroundSize = 'cover';

    if (settings.music) {
        winSound.volume = 0.5;
        winSound.play();
    }

    valueElement.innerHTML = `+${levelScore}`;
    valueElement.classList.remove('hidden');

    runMusic();
}

const continueBtn = document.getElementById("continue");
if (continueBtn) {
    continueBtn.addEventListener("click", () => {
        const selectedCheckbox = document.querySelector('input[name="image-checkbox"]:checked');
        if (selectedCheckbox) {
            switchScreen(selectedCheckbox.value); // Переход к экрану игры
        }
    });
}

window.adjustImages = function(selectedCheckbox) {
    const allImages = document.querySelectorAll(".checkbox-item img");
    const allTexts = document.querySelectorAll(".checkbox-item .game_text");

    allImages.forEach(image => {
        image.style.transform = "scale(1) translateX(-50%)";
    });

    const selectedImage = selectedCheckbox.nextElementSibling;
    selectedImage.style.transform = "scale(1.1) translateX(-50%)";

    allTexts.forEach(text => {
        text.style.color = "white";
    });


    const selectedText = selectedCheckbox.nextElementSibling.nextElementSibling;
    selectedText.style.color = "#FFDA62";
}

function updatePercentage(percentageElement, progress) {
    if (progress <= 100) {
        percentageElement.textContent = `${progress}%`;
        setTimeout(() => updatePercentage(percentageElement, progress + 1), 50); // Увеличение каждые 50 мс
    }
}

export {
    switchScreen,
    showPreloader,
    isCurrentScreen
};
