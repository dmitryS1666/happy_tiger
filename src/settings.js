let failSound = new Audio('res/audio/fail.mp3');
let winSound = new Audio('res/audio/win.mp3');
let rouletteSound = new Audio('res/audio/wheel_spin.mp3');
let clickSound = new Audio('res/audio/click.mp3');
let selectSound = new Audio('res/audio/select.mp3');
let slotSound = new Audio('res/audio/slot_sound.mp3');

let menuMusic;
let settings = { music: true, vibration: true };

function getSettings() {
    return { ...settings }; // Возвращаем копию, чтобы избежать изменений извне
}

// Загрузка настроек из LocalStorage
function loadSettings() {
    menuMusic = document.getElementById('menuMusic');
    const storedSettings = JSON.parse(localStorage.getItem('happyTigerSettings'));

    if (!storedSettings) {
        localStorage.setItem('happyTigerSettings', JSON.stringify(settings));
    } else {
        settings = storedSettings;
    }

    document.getElementById('toggle-music').checked = settings.music;
    document.getElementById('toggle-vibration').checked = settings.vibration;
}

function saveSettings() {
    localStorage.setItem('happyTigerSettings', JSON.stringify(settings));
}

document.getElementById('toggle-music').addEventListener('change', (event) => {
    settings.music = event.target.checked;
    saveSettings();

    if (settings.music) {
        clickSound.play();
    }

    if (!settings.music) {
        stopMusic();
    } else {
        runMusic();
    }
});

document.getElementById('toggle-vibration').addEventListener('change', (event) => {
    settings.vibration = event.target.checked;
    saveSettings();

    if (settings.vibration) {
        vibrate(100);
    }
});

function stopMusic() {
    if (!menuMusic.paused && menuMusic.currentTime > 0) {
        menuMusic.pause();
        menuMusic.currentTime = 0;
    }
}

function runMusic() {
    if (settings.music && (menuMusic.paused || menuMusic.currentTime === 0)) {
        menuMusic.volume = 0.3;
        menuMusic.play();
    }
}

function vibrate(duration) {
    if (settings.vibration && navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

function playSound(sound) {
    if (settings.music) {
        if (sound.currentTime > 0) {
            sound.currentTime = 0;
        }
        sound.play();
    }
}

function clickEffect() {
    playSound(clickSound);
    vibrate(100);
}

function selectEffect() {
    playSound(selectSound);
}

function rouletteEffect() {
    playSound(rouletteSound);
}

function winEffect() {
    playSound(winSound);
}

function failEffect() {
    playSound(failSound);
}

function slotEffect() {
    playSound(slotSound);
}

export {
    slotEffect,
    rouletteEffect,
    selectEffect,
    clickEffect,
    loadSettings,
    saveSettings,
    failEffect,
    winEffect,
    stopMusic,
    runMusic,
    getSettings
};
