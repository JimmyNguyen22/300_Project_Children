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
const input = document.querySelector(".input-search");

function changeWeatherUI(weather) {
  const city = document.querySelector(".name .city");
  const country = document.querySelector(".name .country");
  const time = document.querySelector(".time");
  const temperature = document.querySelector(".temperature .value");
  const shortDesc = document.querySelector(".short-desc");

  const visibility = document.querySelector(".visibility span");
  const wind = document.querySelector(".wind span");
  const cloud = document.querySelector(".cloud span");

  city.innerHTML = weather.name;
  country.innerHTML = weather.sys.country;
  time.innerHTML = new Date().toLocaleString();
  shortDesc.innerHTML = weather.weather[0].main;

  const temp = Math.round(weather.main.temp);
  temperature.innerHTML = temp;

  temp >= 18
    ? (document.body.className = "hot")
    : (document.body.className = "cold");

  visibility.innerHTML = weather.visibility + " (m)";
  wind.innerHTML = weather.wind.speed + " (m/s)";
  cloud.innerHTML = weather.clouds.all + " (%)";
}

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getWeather(e.target.value);
  }
});

async function getWeather(input) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`;

  const res = await fetch(url);
  const weather = await res.json();

  changeWeatherUI(weather);
}

getWeather("ha noi");
