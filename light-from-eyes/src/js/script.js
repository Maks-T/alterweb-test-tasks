window.onload = async () => {
  class MainScreenCarousel {
    curSelected = 0;
    data = [];

    constructor(
      MS_CLASS = '.main-screen',
      MS_TITLE_CLASS = '.main-screen-left--title',
      MS_DESCRIPTION_CLASS = '.main-screen-left--description',
      MS_IMG_CLASS = '.main-screen-right--img',
      MS_ITEMS_CLASS = '.ctrl-panel--items',
      MS_BTN_LEFT_CLASS = '.ctrl-panel--btn-left',
      MS_BTN_RIGHT_CLASS = '.ctrl-panel--btn-right',
      MS_DATA = './data/main-screen.json'
    ) {
      this.init(
        MS_CLASS,
        MS_TITLE_CLASS,
        MS_DESCRIPTION_CLASS,
        MS_IMG_CLASS,
        MS_ITEMS_CLASS,
        MS_BTN_LEFT_CLASS,
        MS_BTN_RIGHT_CLASS,
        MS_DATA
      );
    }

    init = async (
      MS_CLASS,
      MS_TITLE_CLASS,
      MS_DESCRIPTION_CLASS,
      MS_IMG_CLASS,
      MS_ITEMS_CLASS,
      MS_BTN_LEFT_CLASS,
      MS_BTN_RIGHT_CLASS,
      MS_DATA
    ) => {
      await this.loadData(MS_DATA);

      const MS_ELEM = document.querySelector(MS_CLASS);
      this.msTitleElem = MS_ELEM.querySelector(MS_TITLE_CLASS);
      this.msDescriptionElem = MS_ELEM.querySelector(MS_DESCRIPTION_CLASS);
      this.msImgElem = MS_ELEM.querySelector(MS_IMG_CLASS);
      this.msItemsElem = MS_ELEM.querySelector(MS_ITEMS_CLASS);
      this.msBtnLeftElem = MS_ELEM.querySelector(MS_BTN_LEFT_CLASS);
      this.msBtnRightElem = MS_ELEM.querySelector(MS_BTN_RIGHT_CLASS);

      this.msItemsElem.addEventListener('click', this.clickItemsElemHandle);
      this.msBtnLeftElem.addEventListener('click', this.clickBtnLeftHandle);
      this.msBtnRightElem.addEventListener('click', this.clickBtnRightHandle);

      this.renderHtml();
      setInterval(this.clickBtnRightHandle, 4000);
    };

    loadData = async (MS_DATA) => {
      const responseMS = await fetch(MS_DATA);
      this.data = await responseMS.json(MS_DATA);
    };

    renderHtml = () => {
      this.msTitleElem.innerHTML = this.data[this.curSelected].title;
      this.msDescriptionElem.innerHTML =
        this.data[this.curSelected].description;
      this.msImgElem.src = this.data[this.curSelected].imageSrc;

      this.renderItemsElem();
    };

    renderItemsElem = () => {
      this.msItemsElem.innerHTML = '';

      this.data.forEach((dataItem, index) => {
        const itemElem = document.createElement('li');
        itemElem.innerHTML = index + 1;
        itemElem.classList.add('ctrl-panel--item');

        if (index === this.curSelected) {
          itemElem.classList.add('is-item-active');
        }

        this.msItemsElem.appendChild(itemElem);
      });
    };

    clickItemsElemHandle = (event) => {
      this.curSelected = +event.target.innerHTML - 1;

      this.msItemsElem.childNodes.forEach((item) => {
        item.removeEventListener('click', this.clickItemHandle);
      });

      this.renderHtml();
    };

    clickBtnLeftHandle = () => {
      this.curSelected--;
      if (this.curSelected < 0) {
        this.curSelected = this.data.length - 1;
      }
      this.renderHtml();
    };

    clickBtnRightHandle = () => {
      this.curSelected++;
      if (this.curSelected > this.data.length - 1) {
        this.curSelected = 0;
      }
      this.renderHtml();
    };
  }

  const mainScreenCarousel = new MainScreenCarousel();

  class Slider {
    constructor(
      SL_CLASS,
      SL_CONTAINER_CLASS,
      SL_SLIDE_CLASS,
      SL_PREV_CLASS,
      SL_NEXT_CLASS
    ) {
      this.init(
        SL_CLASS,
        SL_CONTAINER_CLASS,
        SL_SLIDE_CLASS,
        SL_PREV_CLASS,
        SL_NEXT_CLASS
      );
    }

    init = async (
      SL_CLASS,
      SL_CONTAINER_CLASS,
      SL_SLIDE_CLASS,
      SL_PREV_CLASS,
      SL_NEXT_CLASS
    ) => {
      this.slider = document.querySelector(SL_CLASS);
      this.slidesContainerElem = this.slider.querySelector(SL_CONTAINER_CLASS);
      this.slideElem = this.slider.querySelector(SL_SLIDE_CLASS);
      this.prevBtnElem = this.slider.querySelector(SL_PREV_CLASS);
      this.nextBtnElem = this.slider.querySelector(SL_NEXT_CLASS);

      this.prevBtnElem.addEventListener('click', this.clickPrevBtnHandle);
      this.nextBtnElem.addEventListener('click', this.clickNextBtnHandle);
    };

    clickPrevBtnHandle = () => {
      const slideWidth = this.slideElem.clientWidth;
      this.slidesContainerElem.scrollLeft += slideWidth;
    };

    clickNextBtnHandle = () => {
      const slideWidth = this.slideElem.clientWidth;
      this.slidesContainerElem.scrollLeft -= slideWidth;
    };
  }

  class InstagramSlider extends Slider {
    constructor(
      SL_CLASS = '.instagram-slider',
      SL_CONTAINER_CLASS = '.slides-container',
      SL_SLIDE_CLASS = '.slide',
      SL_PREV_CLASS = '.slide-arrow-prev',
      SL_NEXT_CLASS = '.slide-arrow-next',
      INSTA_DATA = './data/instagram.json'
    ) {
      super(
        SL_CLASS,
        SL_CONTAINER_CLASS,
        SL_SLIDE_CLASS,
        SL_PREV_CLASS,
        SL_NEXT_CLASS
      );
      this.renderItemsElem(INSTA_DATA);
    }

    renderItemsElem = async (INSTA_DATA) => {
      await this.loadData(INSTA_DATA);

      this.slidesContainerElem.innerHTML = '';

      this.renderSubslides();

      this.slideElem = this.slidesContainerElem.firstElementChild;
    };

    renderSubslides = () => {
      for (let i = 0; i < this.data.length; i += 3) {
        const slideElem = document.createElement('li');
        slideElem.classList.add('slide');

        if (i < this.data.length) {
          const subSlide = this.createSubslide(this.data[i]);
          slideElem.appendChild(subSlide);
        }
        if (i + 1 < this.data.length) {
          const subSlide = this.createSubslide(this.data[i + 1]);
          slideElem.appendChild(subSlide);
        }
        if (i + 2 < this.data.length) {
          const subSlide = this.createSubslide(this.data[i + 2]);
          slideElem.appendChild(subSlide);
        }
        this.slidesContainerElem.appendChild(slideElem);
      }
    };

    createSubslide = (imageSrc) => {
      const subSlide = document.createElement('a');
      subSlide.href = 'https://www.instagram.com/knigi_svetoch_shkola/';
      subSlide.target = '_blank';
      subSlide.classList.add('subslide');
      const img = document.createElement('img');
      img.classList.add('subslide--img');
      img.src = imageSrc;
      const icon = document.createElement('div');
      icon.classList.add('subslide--icon');
      subSlide.append(img, icon);

      return subSlide;
    };

    loadData = async (INSTA_DATA) => {
      const responseInsta = await fetch(INSTA_DATA);
      this.data = await responseInsta.json(INSTA_DATA);
    };
  }

  const instagramSlider = new InstagramSlider();

  class PartnersCarousel {
    curSelected = 0;
    partnersIndexes = [];
    data = [];

    constructor(
      PR_CLASS = '.partners',
      PR_SLIDER_CLASS = '.partners--slider',
      PR_ITEMS_CLASS = '.ctrl-panel--items',
      PR_BTN_LEFT_CLASS = '.ctrl-panel--btn-left',
      PR_BTN_RIGHT_CLASS = '.ctrl-panel--btn-right',
      PR_DATA = './data/partners.json'
    ) {
      this.init(
        PR_CLASS,
        PR_SLIDER_CLASS,
        PR_ITEMS_CLASS,
        PR_BTN_LEFT_CLASS,
        PR_BTN_RIGHT_CLASS,
        PR_DATA
      );
    }

    init = async (
      PR_CLASS,
      PR_SLIDER_CLASS,
      PR_ITEMS_CLASS,
      PR_BTN_LEFT_CLASS,
      PR_BTN_RIGHT_CLASS,
      PR_DATA
    ) => {
      await this.loadData(PR_DATA);
      this.createPartnersIndexes();

      const PR_ELEM = document.querySelector(PR_CLASS);
      this.prSliderElem = PR_ELEM.querySelector(PR_SLIDER_CLASS);

      this.prItemsElem = PR_ELEM.querySelector(PR_ITEMS_CLASS);
      this.prBtnLeftElem = PR_ELEM.querySelector(PR_BTN_LEFT_CLASS);
      this.prBtnRightElem = PR_ELEM.querySelector(PR_BTN_RIGHT_CLASS);

      this.prItemsElem.addEventListener('click', this.clickItemsElemHandle);
      this.prBtnLeftElem.addEventListener('click', this.clickBtnLeftHandle);
      this.prBtnRightElem.addEventListener('click', this.clickBtnRightHandle);

      this.renderHtml();
      setInterval(this.clickBtnRightHandle, 5000);
    };

    loadData = async (PR_DATA) => {
      const responseMS = await fetch(PR_DATA);
      this.data = await responseMS.json(PR_DATA);
    };

    renderHtml = () => {
      this.prSliderElem.innerHTML = '';

      this.partnersIndexes[this.curSelected].forEach((indexPartner) => {
        const img = document.createElement('img');
        img.src = this.data[indexPartner];
        img.classList.add('partners--slider-img');
        this.prSliderElem.appendChild(img);
      });

      this.renderItemsElem();
    };

    createPartnersIndexes = () => {
      for (let i = 0; i < this.data.length; i += 3) {
        const partner = [];
        if (i < this.data.length) partner.push(i);
        if (i + 1 < this.data.length) partner.push(i + 1);
        if (i + 2 < this.data.length) partner.push(i + 2);

        this.partnersIndexes.push(partner);
      }
    };

    renderItemsElem = () => {
      this.prItemsElem.innerHTML = '';

      this.partnersIndexes.forEach((dataItem, index) => {
        const itemElem = document.createElement('li');
        itemElem.innerHTML = index + 1;
        itemElem.classList.add('ctrl-panel--item');

        if (index === this.curSelected) {
          itemElem.classList.add('is-item-active');
        }

        this.prItemsElem.appendChild(itemElem);
      });
    };

    clickItemsElemHandle = (event) => {
      this.curSelected = +event.target.innerHTML - 1;

      this.prItemsElem.childNodes.forEach((item) => {
        item.removeEventListener('click', this.clickItemHandle);
      });

      this.renderHtml();
    };

    clickBtnLeftHandle = () => {
      this.curSelected--;
      if (this.curSelected < 0) {
        this.curSelected = this.partnersIndexes.length - 1;
      }
      this.renderHtml();
    };

    clickBtnRightHandle = () => {
      this.curSelected++;

      if (this.curSelected > this.partnersIndexes.length - 1) {
        this.curSelected = 0;
      }
      this.renderHtml();
    };
  }

  const partnersCarousel = new PartnersCarousel();

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
  });
};
