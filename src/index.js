import {loadSettings, runMusic, stopMusic} from './settings.js';
import {showPreloader, switchScreen} from "./ui";

import {App} from "@capacitor/app";

window.displayDefaultGames = displayDefaultGames;

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('firstRun', 'true');
    lockPortraitOrientation();
    loadSettings();

    if (window.NetworkStatusController.isConnectedToInternet()) {
        loadBanner();
    } else {
        showPreloader().then(() => {
            checkFirstRunAndLoadData();
        });
    }
});

function loadBanner() {
    if (window.BannerLoader && typeof window.BannerLoader.loadBanner === "function") {
        window.BannerLoader.loadBanner()
    }
    setTimeout(() => {
        showPreloader();
    }, 3200);
}

// Отображение игры
export async function displayDefaultGames() {
    checkFirstRunAndLoadData();
}

export function checkFirstRunAndLoadData() {
    let acceptPrivacy = localStorage.getItem('acceptPolicy');

    if (acceptPrivacy) {
        switchScreen('firstPage');
    } else {
        switchScreen('acceptPage');
    }
}

export function lockPortraitOrientation() {
    if (window.ScreenOrientationController && typeof window.ScreenOrientationController.lockOrientation === "function") {
        window.ScreenOrientationController.lockOrientation('portrait');
    }
}

export function lockLandOrientation() {
    if (window.ScreenOrientationController && typeof window.ScreenOrientationController.lockOrientation === "function") {
        window.ScreenOrientationController.lockOrientation('landscape');
    }
}

App.addListener('backButton', ({canGoBack}) => {
    stopMusic(); // Явно останавливаем музыку перед минимизацией приложения
    App.minimizeApp();
});

// Слушатель для восстановления/сворачивания приложения, включая кнопку "Домой"
App.addListener('appStateChange', ({isActive}) => {
    if (isActive) {
        runMusic(); // Включаем музыку при возвращении в активное состояние
    } else {
        stopMusic();  // Останавливаем музыку при сворачивании
    }
});
