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
