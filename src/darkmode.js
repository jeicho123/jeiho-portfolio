let lightmode = localStorage.getItem('light');
const themeSwitch = document.getElementById('theme-switch');

const enableLightmode = () => {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    localStorage.setItem('light', 'active');
}

const disableLightmode = () => {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('light', null);
}

if (lightmode === "active") {
    enableLightmode();
} else {
    disableLightmode();
}

themeSwitch.addEventListener('click', () => {
    lightmode = localStorage.getItem('light');
    if (lightmode !== 'active') {
        enableLightmode();
    } else {
        disableLightmode();
    }
});






