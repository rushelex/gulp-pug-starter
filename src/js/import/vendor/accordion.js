/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import anime from 'animejs';

export default class Accordion {
    constructor() {}

    open(btn) {
        if (btn !== null && btn !== undefined) {
            const dropdownContent = btn.parentElement;
            this.closeSublings(dropdownContent);
            anime({
                targets: dropdownContent,
                height: `${dropdownContent.scrollHeight}px`,
                easing: 'easeInOutQuad',
                duration: 450,
                complete(anim) {
                    dropdownContent.style.height = 'auto';
                },
            });
            btn.classList.add('accordion__button--active');
            dropdownContent.classList.add('accordion--active');
        } else {
            return false;
        }
    }

    close(btn) {
        if (btn !== null && btn !== undefined) {
            const dropdownContent = btn.parentElement;
            btn.classList.remove('accordion__button--active');
            dropdownContent.classList.remove('accordion--active');
            dropdownContent.style.height = `${dropdownContent.scrollHeight}px`;
            anime({
                targets: dropdownContent,
                height: btn.clientHeight,
                easing: 'easeInOutQuad',
                duration: 450,
            });
        } else {
            return false;
        }
    }

    closeSublings(currentDropdown) {
        const $this = this;
        const allAccordions = currentDropdown.parentElement.querySelectorAll(
            '.accordion--active'
        );
        allAccordions.forEach(activeAccordion => {
            const btn = activeAccordion.querySelector('.accordion__button');
            $this.close(btn);
        });
    }

    init(btn) {
        const btnClicked = btn;
        const $this = this;
        const catalogLink = document.querySelector(
            '.search__catalog-menu-catalog-link'
        );
        catalogLink.removeAttribute('href');
        btnClicked.addEventListener('click', () => {
            // Берем классы кликнутой кнопки и проверяем - есть ли у нее аналог. Нужно, чтобы дублировать функционал
            const analogClass = btnClicked.className.replace(/[\n\t]/g, ' ');
            const analogAll = document.querySelectorAll(
                `.${btnClicked.classList.value.replace(/ /g, '.')}`
            );

            if (btnClicked.classList.contains('accordion__button--active')) {
                if (analogClass.indexOf('accordion-analog') > -1) {
                    analogAll.forEach(analog => {
                        $this.close(analog);
                    });
                } else {
                    $this.close(btnClicked);
                }
            } else if (analogClass.indexOf('accordion-analog') > -1) {
                analogAll.forEach(analog => {
                    $this.open(analog);
                });
            } else {
                $this.open(btnClicked);
            }
        });
    }
}

const DropDownAccordion = new Accordion();
const buttonsAccordion = document.querySelectorAll('.accordion__button');

buttonsAccordion.forEach(button => {
    DropDownAccordion.init(button);
});
