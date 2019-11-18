/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import disableScroll from 'disable-scroll';
import anime from 'animejs';

class Fade {
    constructor(el) {
        this.el = document.querySelector(el);
        this.flag = false;
    }

    fadeIn(delay, display) {
        disableScroll.on();
        let { flag } = this;
        flag = true;
        const { el } = this;
        if (flag !== false) {
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
        disableScroll.off();
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
                },
            });
        } else {
            return false;
        }
    }
}

const userPopupLogin = new Fade('.popup--user');
const userPopupRegister = new Fade('.popup--user-register');
const overlayFade = new Fade('.overlay');

const overlay = document.querySelector('.overlay');
const userButtonsLogin = document.querySelectorAll('.button-user');
const userButtonRegister = document.querySelector('.button-user-register');
const userButtonsClose = document.querySelectorAll('.popup__close-user');

if (userButtonsLogin) {
    for (const button of userButtonsLogin) {
        button.addEventListener('click', () => {
            overlayFade.fadeIn(350, 'block');
            userPopupRegister.fadeOut(250);
            userPopupLogin.fadeIn(350, 'flex');
        });
    }
}

if (userButtonRegister) {
    userButtonRegister.addEventListener('click', () => {
        userPopupLogin.fadeOut(250);
        userPopupRegister.fadeIn(350, 'flex');
    });
}
if (overlay) {
    overlay.addEventListener('click', () => {
        overlayFade.fadeOut(350);
        userPopupLogin.fadeOut(350);
        userPopupRegister.fadeOut(350);
    });
}

if (userButtonsClose) {
    for (const button of userButtonsClose) {
        button.addEventListener('click', () => {
            overlayFade.fadeOut(250);
            userPopupLogin.fadeOut(250);
            userPopupRegister.fadeOut(250);
        });
    }
}
