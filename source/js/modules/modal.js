import { render } from "./render";

export default class {
  constructor(selector, data) {
    this.conteiner = document.querySelector(selector);

    this.renderModal(data);
  }

  renderModal(data) {
    if (data) {
      this.conteiner.innerHTML = render("modal-menu", { menu: data });
      setTimeout(() => {
        this.conteiner.classList.add(`modal-active`);
      }, 0);
      this.conteiner.querySelector(".modal-menu__close").addEventListener(
        "click",
        event => {
          this.conteiner.classList.remove(`modal-active`);
        },
        { once: true }
      );
    }
  }
}
