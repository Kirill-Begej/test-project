const html = document.querySelector('#html');
const body = document.querySelector('#body');

const checkBrowser = () => {
  return window.navigator.userAgent.indexOf('Firefox') >= 0;
};

export const enablingScrollbar = () => {
  if (checkBrowser()) {
    html.classList.add('scrollbar_gecko');
    body.classList.add('scrollbar_gecko');
  } else {
    body.classList.add('scrollbar__webkit');
  }
};
