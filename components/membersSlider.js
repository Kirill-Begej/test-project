const sliderWrapper = document.querySelector('.members__container');
const sliderContainer = document.querySelector('.members__list');
const sliderItems = document.querySelectorAll('.members__item');
const sliderTemplate = document.querySelector('#membersSliderTemplate');
const slideTemplate = document.querySelector('#membersSlideTemplate');
const buttonLeft = document.querySelector('#buttonMembersLeft');
const buttonRight = document.querySelector('#buttonMembersRight');
const slideNumberContainer = document.querySelector('#slideNumber');
let sliderWidth = sliderWrapper.offsetWidth;
const sliderContent = [];
let slideNumber = 0;
let step = 0;
let resizeTimeout = null;
let leftShiftTimeout = null;
let rightShiftTimeout = null;
let moveInterval = null;

const initialStep = () => {
  if (window.innerWidth > 768) {
    step = 3;
  } else if (window.innerWidth <= 768 && window.innerWidth > 375) {
    step = 2;
  } else {
    step = 1;
  }
};

const initialState = () => {
  sliderItems.forEach((item, i) => {
    sliderContent[i] = {
      image: item.querySelector('.members__image').src,
      title: item.querySelector('.members__subtitle').textContent,
      text: item.querySelector('.members__text').textContent,
      link: item.querySelector('.members__link').href,
      target: '_blank',
    };
    sliderContainer.remove();
  });
};

const getSliderContainer = () => {
  return sliderTemplate.content.querySelector('.members__list').cloneNode(true);
};

const getSlideElement = () => {
  return slideTemplate.content.querySelector('.members__item').cloneNode(true);
};

const setSliderContent = (item, index) => {
  item.querySelector('.members__image').src = sliderContent[index].image;
  item.querySelector('.members__subtitle').textContent = sliderContent[index].title;
  item.querySelector('.members__text').textContent = sliderContent[index].text;
  item.querySelector('.members__image').href = sliderContent[index].link;
  item.querySelector('.members__image').target = sliderContent[index].target;
  return item;
};

const renderSlider = () => {
  const sliderContainer = getSliderContainer();
  for (let i = slideNumber; i < step; i++) {
    const currentItem = getSlideElement();
    sliderContainer.append(setSliderContent(currentItem, i));
  }
  sliderContainer.style.width = `${sliderWidth}px`;
  sliderContainer.style.left = '0px';
  slideNumber += step;
  return sliderContainer;
};

const renderDirectSlider = () => {
  const sliderContainer = getSliderContainer();
  slideNumber += step;
  if (slideNumber > sliderContent.length) {
    slideNumber = step;
  }
  for (let i = 0; i < step; i++) {
    const currentItem = getSlideElement();
    sliderContainer.prepend(setSliderContent(currentItem, slideNumber - 1 - i));
  }
  sliderContainer.style.width = `${sliderWidth}px`;
  return sliderContainer;
};

const renderReverseSlider = () => {
  const sliderContainer = getSliderContainer();
  slideNumber -= step;
  if (slideNumber === 0) {
    slideNumber = sliderContent.length;
  }
  for (let i = 0; i < step; i++) {
    const currentItem = getSlideElement();
    sliderContainer.prepend(setSliderContent(currentItem, slideNumber - 1 - i));
  }
  sliderContainer.style.width = `${sliderWidth}px`;
  return sliderContainer;
};

const setSlideNumber = () => {
  slideNumberContainer.textContent = slideNumber;
};

const leftShiftSlider = () => {
  clearInterval(moveInterval);
  clearTimeout(leftShiftTimeout);
  const rightSlider = renderReverseSlider();
  rightSlider.style.left = `${sliderWidth}px`;
  sliderWrapper.append(rightSlider);
  let currentSliders = document.querySelectorAll('.members__list');
  buttonLeft.disabled = true;
  buttonRight.disabled = true;
  currentSliders[0].animate({left:['0px', `-${sliderWidth}px`]}, 300);
  currentSliders[1].animate({left:[`${sliderWidth}px`, '0px']}, 300);
  leftShiftTimeout = setTimeout(() => {
    currentSliders[0].style.left = `-${sliderWidth}px`;
    currentSliders[1].style.left = '0px';
    currentSliders[0].remove();
    buttonLeft.disabled = false;
    buttonRight.disabled = false;
    moveByInterval();
  }, 300);
};

const rightShiftSlider = () => {
  clearInterval(moveInterval);
  clearTimeout(rightShiftTimeout);
  const leftSlider = renderDirectSlider();
  leftSlider.style.left = `-${sliderWidth}px`;
  sliderWrapper.prepend(leftSlider);
  let currentSliders = document.querySelectorAll('.members__list');
  buttonLeft.disabled = true;
  buttonRight.disabled = true;
  currentSliders[0].animate({left:[`-${sliderWidth}px`, '0px']}, 300);
  currentSliders[1].animate({left:['0px', `${sliderWidth}px`]}, 300);
  rightShiftTimeout = setTimeout(() => {
    currentSliders[0].style.left = '0px';
    currentSliders[1].style.left = `${sliderWidth}px`;
    currentSliders[1].remove();
    buttonLeft.disabled = false;
    buttonRight.disabled = false;
    moveByInterval();
  }, 300);
};

const clickLeftButtonHandler = () => {
  buttonLeft.addEventListener('click', () => {
    leftShiftSlider();
    setSlideNumber();
  });
};

const clickRightButtonHandler = () => {
  buttonRight.addEventListener('click', () => {
    rightShiftSlider();
    setSlideNumber();
  });
};

const windowResizeHandler = () => {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      location.reload();
    }, 500);
  });
};

const moveByInterval = () => {
  moveInterval = setInterval(() => {
    leftShiftSlider();
    setSlideNumber();
  }, 4000);
};

export const membersSlider = () => {
  initialStep();
  initialState();
  sliderWrapper.append(renderSlider());
  setSlideNumber();
  clickLeftButtonHandler();
  clickRightButtonHandler();
  windowResizeHandler();
  moveByInterval();
};
