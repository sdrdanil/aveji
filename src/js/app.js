import Swiper from 'swiper';
import * as filesFunctions from './modules/functions.js';

filesFunctions.isWebp();
filesFunctions.initSmoothScroll({
  duration: 1000,
  offset: 56,
});

const body = document.getElementsByTagName('body')[0];
const menu = document.getElementById('menu');
const btnOpen = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const documentTabElements = [
  ...document.querySelectorAll('a, input, button')
].filter((elem) => !elem.closest('.menu'));

function isClosing(elem) {
  switch (true) {
    case elem.classList.contains('menu__link'):
    case elem.closest('button') == btnClose:
    case elem.classList.contains('menu__overlay'):
      documentTabElements.forEach((elem) => elem.setAttribute('tabindex', '0'));
      return true;
  }
  return false;
}

btnOpen.addEventListener('click', () => {
  menu.hidden = false;
  documentTabElements.forEach((elem) => elem.setAttribute('tabindex', '-1'));
  // animation fix
  setTimeout(() => {
    body.classList.add('menu-active');
    menu.classList.add('menu--active');
  });
});
document.addEventListener('click', (event) => {
  if (isClosing(event.target)) {
    menu.querySelector('.menu__content').addEventListener(
      'transitionend',
      () => {
        menu.hidden = true;
      },
      { once: true },
    );
    body.classList.remove('menu-active');
    menu.classList.remove('menu--active');
  }
});

const breakpoint = window.matchMedia('(min-width: 768px)');
let swiper;

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    if (swiper !== undefined) swiper.destroy(true, true);
    return;
  } else if (breakpoint.matches === false) {
    return enableSwiper();
  }
};

const enableSwiper = function () {
  swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
  });
};

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();

// body.before(window.screen.width, 'x', window.screen.height);
