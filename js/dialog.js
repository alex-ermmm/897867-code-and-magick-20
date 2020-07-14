'use strict';

(function () {
  // работа с открытием и закрытием окна
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = document.querySelector('.setup-close');


  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  }

  function openPopup() {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    setDefaultPositionPopup();
  }

  setupOpen.addEventListener('click', openPopup);

  function keydownEnterOpenPopup(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openPopup();
    }
  }

  setupOpen.addEventListener('keydown', keydownEnterOpenPopup);

  setupClose.addEventListener('click', closePopup);

  function keydownEnterClosePopup(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  }

  setupClose.addEventListener('keydown', keydownEnterClosePopup);

  // валидация форм
  var userNameInput = document.querySelector('.setup-user-name');

  function checkInputLengthUser() {
    var valueLength = userNameInput.value.length;

    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else if (valueLength < window.MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (window.MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - window.MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  }

  userNameInput.addEventListener('input', checkInputLengthUser);

  // функция генерирует случайным образом элемнты мага
  function randomWizardStyle(style) {
    return style[Math.floor(Math.random() * style.length)];
  }

  // меняем цвет мантии и передем его в скрытый input
  var wizardsCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  var wizardsCoatColorInputHidden = document.querySelector('input[name="coat-color"]');

  function clickChangeCoatColor() {
    var newColor = randomWizardStyle(window.setup.WIZARD_COAT_COLOR);

    wizardsCoatColor.style.fill = newColor;
    wizardsCoatColorInputHidden.value = newColor;
  }

  wizardsCoatColor.addEventListener('click', clickChangeCoatColor);

  // меняем цвет глаз и передем его в скрытый input
  var wizardsEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardsCoatEyesInputHidden = document.querySelector('input[name="eyes-color"]');

  function clickChangeColorEyes() {
    var newColor = randomWizardStyle(window.setup.WIZARD_EYES_COLOR);

    wizardsEyesColor.style.fill = newColor;
    wizardsCoatEyesInputHidden.value = newColor;
  }

  wizardsEyesColor.addEventListener('click', clickChangeColorEyes);

  // меняем цвет фаербола и передем его в скрытый input
  var wizardsFireball = document.querySelector('.setup-fireball-wrap');
  var wizardsFireballInputHidden = wizardsFireball.querySelector('input');

  function clickChangeFireballColor() {
    var newBackground = randomWizardStyle(window.WIZARD_FIREBALL_COLOR);

    wizardsFireball.style.background = newBackground;
    wizardsFireballInputHidden.value = newBackground;
  }

  wizardsFireball.addEventListener('click', clickChangeFireballColor);

  // перемещение окна
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  function setDefaultPositionPopup() {
    setupDialogElement.style.top = '';
    setupDialogElement.style.left = '';
  }

  function movePopup(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  dialogHandler.addEventListener('mousedown', movePopup);
})();
