const buttonSupport = document.querySelector('#buttonSupport');
const buttonDetails = document.querySelector('#buttonDetails');

export const pageScroll = () => {
  buttonSupport.addEventListener('click', () => {
    document.querySelector('.support').scrollIntoView({ behavior: 'smooth' });
  });
  buttonDetails.addEventListener('click', () => {
    document.querySelector('.members').scrollIntoView({ behavior: 'smooth' });
  });
};
