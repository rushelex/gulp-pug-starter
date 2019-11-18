/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty-function */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-constructor */
import anime from 'animejs';

class Accordion {
    constructor() {}

    open(btn) {
        if (btn != null && btn != undefined) {
            const dropdownContent = btn.parentElement;
            this.closeSublings(dropdownContent);
            btn.classList.add('accordion__button--active');
            dropdownContent.classList.add('accordion--active');
            anime({
                targets: dropdownContent,
                height: `${dropdownContent.scrollHeight}px`,
                easing: 'easeInOutQuad',
                duration: 450,
                complete(anim) {
                    dropdownContent.style.height = 'auto';
                },
            });
        } else {
            return false;
        }
    }

    close(btn) {
        if (btn != null && btn != undefined) {
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
        for (const activeAccordion of allAccordions) {
            const btn = activeAccordion.querySelector('.accordion__button');
            console.log(btn);
            $this.close(btn);
        }
    }

    init(btn) {
        const btnClicked = btn;
        const $this = this;
        btnClicked.addEventListener('click', function(e) {
            // Берем классы кликнутой кнопки и проверяем - есть ли у нее аналог. Нужно, чтобы дублировать функционал
            const analogClass = btnClicked.className.replace(/[\n\t]/g, ' ');
            const analogAll = document.querySelectorAll(
                `.${btnClicked.classList.value.replace(/ /g, '.')}`
            );

            if (btnClicked.classList.contains('accordion__button--active')) {
                if (analogClass.indexOf('accordion-analog') > -1) {
                    for (const analog of analogAll) {
                        $this.close(analog);
                    }
                } else {
                    $this.close(btnClicked);
                }
            } else if (analogClass.indexOf('accordion-analog') > -1) {
                for (const analog of analogAll) {
                    $this.open(analog);
                }
            } else {
                $this.open(btnClicked);
            }
        });
    }
}

const DropDownAccordion = new Accordion();
const buttonsAccordion = document.querySelectorAll('.accordion__button');

for (const button of buttonsAccordion) {
    DropDownAccordion.init(button);
}
