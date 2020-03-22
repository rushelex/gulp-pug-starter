/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
class Header {
  constructor(element, dropdowns) {
    this.header = document.querySelector(element);
    this.dropdowns = dropdowns;
  }

  toScrollFixHeader(header) {
    window.addEventListener('scroll', () => {
      const scrolled = pageYOffset || document.body.scrollTop;
      if (scrolled > 0) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    });
  }

  init() {
    const $this = this;
    const { header } = $this;
    $this.toScrollFixHeader(header);
  }
}

new Header('.header', ['.header__contacts', '.header__buttons']).init();
