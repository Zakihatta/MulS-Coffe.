const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

cards.forEach((card, index) => {
  card.addEventListener("mousedown", dragStart);
  card.addEventListener("mouseup", dragEnd);
  card.addEventListener("mouseleave", dragEnd);
  card.addEventListener("mousemove", drag);
});

function dragStart(event) {
  isDragging = true;
  startPosition = event.pageX - slider.offsetLeft;
  prevTranslate = currentTranslate;
  cancelAnimationFrame(animationID);
}

function drag(event) {
  if (isDragging) {
    const currentPosition = event.pageX - slider.offsetLeft;
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function dragEnd() {
  isDragging = false;
  currentIndex = Math.round(-currentTranslate / 310);
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > cards.length - 1) {
    currentIndex = cards.length - 1;
  }
  setPositionByIndex();
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -310;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}
