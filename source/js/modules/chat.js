import "babel-polyfill";
import Modal from "./modal";
import { render } from "./render";

export default class {
  constructor() {
    this.usersContainer = document.querySelector("#users");
    this.messagesContainer = document.querySelector("#messages-list");
    this.chatForm = document.querySelector("#chat-form");
    this.messages = JSON.parse(localStorage.getItem("messages")) || [];

    this.renderUsers();
    this.renderMessages();
    this.initEvents();
  }

  initEvents() {
    this.chatForm.addEventListener("submit", event => {
      event.preventDefault();

      const field = event.target.querySelector("input");
      const message = field.value;

      this.addMessage(message);
      field.value = "";
    });

    this.messagesContainer.addEventListener("click", event => {
      const r = this.randomNumber(255);
      const g = this.randomNumber(255);
      const b = this.randomNumber(255);

      if (event.target.classList.contains("message")) {
        event.target.style.backgroundColor = `rgb(${r},${g},${b})`;

        if (g < 128) {
          event.target.style.color = "#fff";
        } else {
          event.target.style.color = "#000";
        }
      }
    });

    this.messagesContainer.addEventListener("contextmenu", event => {
      event.preventDefault();

      if (event.target.classList.contains("message")) {
        new Modal("#users-menu", [
          { link: "#", text: "item 1" },
          { link: "#", text: "item 2" },
          { link: "#", text: "item 3" }
        ]);
        new Modal("#messages-menu", [
          { link: "#", text: "item 4" },
          { link: "#", text: "item 5" }
        ]);
      }
    });
  }

  addMessage(message) {
    if (message) {
      this.messages.push({ message });
      localStorage.setItem("messages", JSON.stringify(this.messages));
      this.messagesContainer.innerHTML += render("messages", {
        messages: [{ message }]
      });
    }
  }

  async renderUsers() {
    const users = await this.getUsers();

    if (users) {
      this.usersContainer.innerHTML = render("users", users);
    }
  }

  renderMessages() {
    if (this.messages) {
      this.messagesContainer.innerHTML = render("messages", {
        messages: this.messages
      });
    }
  }

  getUsers() {
    return fetch("/test-task/dist/users.json")
      .then(response => response.json())
      .then(data => data);
  }

  randomNumber(size = 100) {
    return (size / 100) * (Math.random() * 100);
  }
}
