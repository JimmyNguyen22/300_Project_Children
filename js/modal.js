let btnOpen = document.querySelector(".open-modal-btn");
let modal = document.querySelector(".modal-item");
let iconClose = document.querySelector(".modal-header i");
let btnClose = document.querySelector(".modal-footer button");

function toggleModal() {
  modal.classList.toggle("hide");
}

btnOpen.addEventListener("click", toggleModal);
btnClose.addEventListener("click", toggleModal);
iconClose.addEventListener("click", toggleModal);
modal.addEventListener("click", (event) => {
  if (event.target == event.currentTarget) {
    toggleModal();
  }
});

// img show
let img = document.querySelectorAll(".image img");
let prev = document.querySelector(".prev");
let right = document.querySelector(".right");
let close = document.querySelector(".close");
let galleryInner = document.querySelector(".gallery-inner img");
let gallery = document.querySelector(".gallery");

let currentIndex = 0;

function showGallery() {
  if (currentIndex == 0) {
    prev.classList.add("hide-prev");
  } else {
    prev.classList.remove("hide-prev");
  }

  if (currentIndex == img.length - 1) {
    right.classList.add("hide-prev");
  } else {
    right.classList.remove("hide-prev");
  }
  // display
  galleryInner.src = img[currentIndex].src;
  gallery.classList.add("show");
}

img.forEach((item, index) => {
  item.addEventListener("click", function () {
    currentIndex = index;
    showGallery();
  });
});

close.addEventListener("click", function () {
  gallery.classList.remove("show");
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 27) {
    gallery.classList.remove("show");
  }
});

prev.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    showGallery();
  }
});

right.addEventListener("click", function () {
  if (currentIndex < img.length - 1) {
    currentIndex++;
    showGallery();
  }
});

// Search box

let btnSearch = document.querySelector(".search-box-btn");

btnSearch.addEventListener("click", function () {
  this.parentElement.classList.toggle("open");
  this.previousElementSibling.focus();
});

// keycode

let key = document.querySelector(".keycode-card.key p:last-child");
let keyLocation = document.querySelector(".keycode-card.location p:last-child");
let keyWhich = document.querySelector(".keycode-card.which p:last-child");
let code = document.querySelector(".keycode-card.code p:last-child");
let keyAlert = document.querySelector(".keycode-alert");
let keyBox = document.querySelector(".keycode-box");
let info = document.querySelector(".keycode-info");

document.addEventListener("keydown", (event) => {
  let keyName = event.keyCode === 32 ? "Space" : event.key;

  key.innerText = keyName;
  keyLocation.innerText = event.location;
  keyWhich.innerText = event.which;
  code.innerText = event.code;
  info.innerText = event.which;

  keyAlert.classList.add("hide-key");
  keyBox.classList.remove("hide-key");
});

// search-tag
let content = document.querySelector(".search-content");
let input = document.querySelector(".search-input");
let btnRemove = document.querySelector(".search-btn-remove");
let arr = ["Front-end", "Back-end"];

function renderTag() {
  content.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let arrSearch = arr[i];
    content.innerHTML += ` <li class="search-list">
       ${arrSearch}
        <i class="fa fa-times" onClick="removeTag(${i})">
    </i>
</li>`;
  }
  content.appendChild(input);
  input.focus();
}

renderTag();

// create
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    arr.push(input.value.trim());
    input.value = "";
    renderTag();
  }
});

// delete

function removeTag(index) {
  arr.splice(index, 1);
  renderTag();
}

btnRemove.addEventListener("click", () => {
  arr = [];
  renderTag();
});

// Curve background efffects
const menuItem = document.querySelectorAll(".menu-item");
menuItem.forEach((item) =>
  item.addEventListener("click", () => {
    menuItem.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  })
);

// form validation
let user = document.querySelector("#user");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPass = document.querySelector("#confirmPass");
let form = document.querySelector("#form");
function formError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function formSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function checkError(listInput) {
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      formError(input, "ko duoc trong");
    } else {
      formSuccess(input);
    }
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkError([user, email, password, confirmPass]);
});

// api
let weather = document.querySelector(".weather");
let city = document.querySelector(".city");
let country = document.querySelector(".country");
let value = document.querySelector(".weather-value");

let weatherBot = document.querySelector(".weather-bot");
let eye = document.querySelector(".eye span");
let wind = document.querySelector(".wind span");
let sun = document.querySelector(".sun span");

function changeWeatherUI() {
  weather.value.trim();
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=430fa03fff96eccb022c5230ec54916c";
}

// todolist
let todoList = document.querySelector("#todoList");
let btnTodoList = document.querySelector("#btnTodoList");
let formTodo = document.querySelector("#formTodo");
let todos = document.querySelector(".list-todo");

formTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  let val = todoList.value.trim();
  if (val) {
    addTodoElement({
      text: val,
    });
    luuLocalStorage();
  }
  todoList.value = "";
});

function addTodoElement(todo) {
  let li = document.createElement("li");
  li.innerHTML = `
  <span>${todo.text}</span>
                    <i class="fa fa-trash"></i>
  `;
  if (todo.status === "todo-done") {
    li.setAttribute("class", "todo-done");
  }

  li.addEventListener("click", function () {
    this.classList.toggle("todo-done");
    luuLocalStorage();
  });

  li.querySelector("i").addEventListener("click", function () {
    this.parentElement.remove();
    luuLocalStorage();
  });

  todos.appendChild(li);
}

function luuLocalStorage() {
  let todoList = document.querySelectorAll("li");
  let todoStorage = [];
  todoList.forEach(function (item) {
    let text = item.querySelector("span").innerText;
    let status = item.getAttribute("class");
    todoStorage.push({
      text,
      status,
    });
  });
  localStorage.setItem("todolist", JSON.stringify(todoStorage));
}

function layLocalStorage() {
  let data = JSON.parse(localStorage.getItem("todolist"));
  data.forEach(function (item) {
    addTodoElement(item);
  });
}
layLocalStorage();

//   Toast Notification Animation

function toast({ message = "", type = "", duration = 3000 }) {
  const main = document.querySelector("#toast");
  if (main) {
    const toast = document.createElement("div");
    const icons = {
      success: "far fa-check-circle",
      warning: "fa fa-exclamation-circle",
      error: "fa fa-exclamation-triangle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toastt", `${type}`);

    toast.style.animation = `slideInLeft 3s ease, fadeOut 1s ${delay}s linear forwards`;

    toast.innerHTML = ` <i class="${icon}"></i>
    <span class="message">${message}</span>
    <span class="border-box ${type} "></span> `;
    main.appendChild(toast);

    setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);
  }
}

function showSuccess() {
  toast({
    message: "This is a success message.",
    type: "success",
    duration: 3000,
  });
}

function showWarning() {
  toast({
    message: "This is a warning message!",
    type: "warning",
    duration: 3000,
  });
}

function showError() {
  toast({
    message: "This is a error message!",
    type: "error",
    duration: 3000,
  });
}

// slide

const imgFeature = document.querySelector(".img_feature");
const listImg = document.querySelectorAll(".list_img img");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector(".next");

let currentImg = 0;

function getImgByIndex(index) {
  // remove active class
  listImg.forEach((item) => {
    item.classList.remove("active");
  });

  currentImg = index;
  imgFeature.src = listImg[index].getAttribute("src");
  listImg[index].classList.add("active");
}

listImg.forEach((imgElement, index) => {
  imgElement.addEventListener("click", () => {
    getImgByIndex(index);
  });
});

prevBtn.addEventListener("click", () => {
  currentImg === 0 ? (currentImg = listImg.length - 1) : currentImg--;

  getImgByIndex(currentImg);
});

nextBtn.addEventListener("click", (e) => {
  currentImg === listImg.length - 1 ? (currentImg = 0) : currentImg++;

  getImgByIndex(currentImg);
});

getImgByIndex(currentImg);

// tab-ui
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

// SonDN fixed - Active size wrong size on first load.
// Original post: https://www.facebook.com/groups/649972919142215/?multi_permalinks=1175881616551340
requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
  };
});
