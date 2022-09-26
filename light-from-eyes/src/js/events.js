window.onload = () => {
  const inputPhone = document.querySelector('.form-send-phone--input-phone');
  const btnSubmit = document.querySelector('.form-send-phone--btn-submit');

  btnSubmit.addEventListener('click', () => {
    popupJoin.classList.remove('is-popup-show');
    document.body.classList.remove('is-nonscrollable');
  });

  inputPhone.addEventListener('input', () => {
    if (!inputPhone.checkValidity()) {
      btnSubmit.setAttribute('disabled', '');
    } else {
      btnSubmit.removeAttribute('disabled');
    }
  });

  const btnJoin = document.querySelector('.main-screen-left--btn-join');
  const popupJoin = document.querySelector('.popup-join');

  btnJoin.addEventListener('click', () => {
    popupJoin.classList.add('is-popup-show');
    document.body.classList.add('is-nonscrollable');
  });

  popupJoin.addEventListener('click', (e) => {
    if (e.target.classList.contains('is-popup-show')) {
      popupJoin.classList.remove('is-popup-show');
      document.body.classList.remove('is-nonscrollable');
    }
  });

  const burgerMenuBtn = document.querySelector('.burger-menu');
  const burgerMenu = document.querySelector('.burger-menu--items');

  burgerMenuBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('is-burger-menu-show');
    burgerMenuBtn.classList.toggle('is-open');
  });
};
