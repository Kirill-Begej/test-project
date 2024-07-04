const buttonLeft = document.querySelector('#buttonLeft');
const buttonRight = document.querySelector('#buttonRight');
const sliderContainer = document.querySelector('.stages__list');
const points = document.querySelectorAll('.pagination__item');
let slideItemWidth = document.querySelector('.stages__item').offsetWidth;
let sliderPosition = 0;
let slideNumber = 0;

const checkButtonActive = () => {
  if (slideNumber === 0) {
    buttonLeft.classList.add('button_not-active');
    buttonLeft.disabled = true;
  } else if (slideNumber === 4) {
    buttonRight.classList.add('button_not-active');
    buttonRight.disabled = true;
  } else {
    buttonLeft.classList.remove('button_not-active');
    buttonRight.classList.remove('button_not-active');
    buttonLeft.disabled = false;
    buttonRight.disabled = false;
  }
};

const checkPointActive = () => {
  points.forEach((point) => {
    point.classList.remove('pagination__item_active');
  });

  points[slideNumber].classList.add('pagination__item_active');
};

const clickLeftButtonHandler = () => {
  buttonLeft.addEventListener('click', () => {
    sliderPosition -= slideItemWidth;
    slideNumber -= 1;
    checkButtonActive();
    checkPointActive();
    sliderContainer.style.transform = `translateX(-${sliderPosition}px)`;
  });
};

const clickRightButtonHandler = () => {
  buttonRight.addEventListener('click', () => {
    sliderPosition += slideItemWidth;
    slideNumber += 1;
    checkButtonActive();
    checkPointActive();
    sliderContainer.style.transform = `translateX(-${sliderPosition}px)`;
  });
};

const windowResizeHandler = () => {
  window.addEventListener('resize', () => {
    slideItemWidth = document.querySelector('.stages__item').offsetWidth;
    sliderPosition = slideItemWidth * slideNumber;
    sliderContainer.style.transform = `translateX(-${sliderPosition}px)`;

    if (window.innerWidth > 768) {
      sliderContainer.style.transform = `translateX(${0}px)`;
    }
  });
};

export const stagesSlider = () => {
  checkButtonActive();
  checkPointActive();
  clickLeftButtonHandler();
  clickRightButtonHandler();
  windowResizeHandler();
};
