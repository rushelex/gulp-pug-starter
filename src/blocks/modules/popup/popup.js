/* eslint-disable consistent-return */
import anime from 'animejs';

export default class Fade {
    constructor(el) {
        this.el = document.querySelector(el);
        this.flag = false;
    }

    fadeIn(delay, display) {
        let { flag } = this;

        const { el } = this;
        const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

        flag = true;
        document.body.style.margin = `0px ${scrollBarWidth}px 0px 0px`;
        document.body.style.overflow = 'hidden';

        if (flag !== false) {
            const popups = document.querySelectorAll('.popup');

            popups.forEach(e => {
                e.style.display = 'none';
            });

            anime({
                targets: el,
                opacity: 1,
                easing: 'linear',
                duration: delay,
                begin() {
                    el.style.display = display;
                },
                complete() {
                    flag = false;
                },
            });
        } else {
            return false;
        }
    }

    fadeOut(delay) {
        let { flag } = this;
        flag = true;
        const { el } = this;
        if (flag !== false) {
            anime({
                targets: el,
                opacity: 0,
                easing: 'linear',
                duration: delay,
                complete() {
                    flag = false;
                    el.style.display = 'none';
                    document.body.style.margin = '';
                    document.body.style.overflow = '';
                },
            });
        } else {
            return false;
        }
    }
}

const overlay = document.querySelector('.overlay');
const overlayFade = new Fade('.overlay');

const registerButtons = document.querySelectorAll('.button-register');
const registerButtonsClose = document.querySelectorAll('.popup__close--login');
const registerPopup = new Fade('.popup--register');

if (registerButtons) {
    registerButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            overlayFade.fadeIn(350, 'block');
            registerPopup.fadeIn(350, 'flex');
        });
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        overlayFade.fadeOut(350);
        registerPopup.fadeOut(350);
    });

    for (let i = 0; i < overlay.childNodes.length; i++) {
        overlay.childNodes[i].addEventListener('click', event => {
            event.stopPropagation();
        });
    }
}

if (registerButtonsClose) {
    registerButtonsClose.forEach(button => {
        button.addEventListener('click', () => {
            overlayFade.fadeOut(250);
            registerPopup.fadeOut(250);
        });
    });
}

const successButtons = document.querySelectorAll('.button-success');
const successButtonsClose = document.querySelectorAll('.popup__close--success');
const successPopup = new Fade('.popup--success');

if (successButtons) {
    successButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            overlayFade.fadeIn(350, 'block');
            successPopup.fadeIn(350, 'flex');
        });
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        overlayFade.fadeOut(350);
        successPopup.fadeOut(350);
    });

    for (let i = 0; i < overlay.childNodes.length; i++) {
        overlay.childNodes[i].addEventListener('click', event => {
            event.stopPropagation();
        });
    }
}

if (successButtonsClose) {
    successButtonsClose.forEach(button => {
        button.addEventListener('click', () => {
            overlayFade.fadeOut(250);
            successPopup.fadeOut(250);
        });
    });
}
