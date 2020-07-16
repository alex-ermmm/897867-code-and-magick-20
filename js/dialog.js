'use strict';

(function () {
  // работа с открытием и закрытием окна
  var onSetupOpenKeydown = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var onSetupCloseKeydown = document.querySelector('.setup-close');


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

  onSetupOpenKeydown.addEventListener('click', openPopup);

  function keydownEnterOpenPopup(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openPopup();
    }
  }

  onSetupOpenKeydown.addEventListener('keydown', keydownEnterOpenPopup);

  onSetupCloseKeydown.addEventListener('click', closePopup);

  function keydownEnterClosePopup(evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  }

  onSetupCloseKeydown.addEventListener('keydown', keydownEnterClosePopup);

  // валидация форм
  var onUsertNameChange = document.querySelector('.setup-user-name');

  function checkInputLengthUser() {
    var valueLength = onUsertNameChange.value.length;

    if (onUsertNameChange.validity.valueMissing) {
      onUsertNameChange.setCustomValidity('Обязательное поле');
    } else if (valueLength < window.setup.MIN_NAME_LENGTH) {
      onUsertNameChange.setCustomValidity('Ещё ' + (window.setup.MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.setup.MAX_NAME_LENGTH) {
      onUsertNameChange.setCustomValidity('Удалите лишние ' + (valueLength - window.setup.MAX_NAME_LENGTH) + ' симв.');
    } else {
      onUsertNameChange.setCustomValidity('');
    }
  }

  onUsertNameChange.addEventListener('input', checkInputLengthUser);

  // функция генерирует случайным образом элемнты мага
  function randomWizardStyle(style) {
    return style[Math.floor(Math.random() * style.length)];
  }

  // меняем цвет мантии и передем его в скрытый input
  var onWizardCoatClick = document.querySelector('.setup-wizard .wizard-coat');
  var wizardsCoatColorInputHidden = document.querySelector('input[name="coat-color"]');

  function clickChangeCoatColor() {
    var newColor = randomWizardStyle(window.setup.WIZARD_COAT_COLOR);

    onWizardCoatClick.style.fill = newColor;
    wizardsCoatColorInputHidden.value = newColor;
  }

  onWizardCoatClick.addEventListener('click', clickChangeCoatColor);

  // меняем цвет глаз и передем его в скрытый input
  var onWizardEyesClick = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardsCoatEyesInputHidden = document.querySelector('input[name="eyes-color"]');

  function clickChangeColorEyes() {
    var newColor = randomWizardStyle(window.setup.WIZARD_EYES_COLOR);

    onWizardEyesClick.style.fill = newColor;
    wizardsCoatEyesInputHidden.value = newColor;
  }

  onWizardEyesClick.addEventListener('click', clickChangeColorEyes);

  // меняем цвет фаербола и передем его в скрытый input
  var onFireballClick = document.querySelector('.setup-fireball-wrap');
  var wizardsFireballInputHidden = onFireballClick.querySelector('input');

  function clickChangeFireballColor() {
    var newBackground = randomWizardStyle(window.setup.WIZARD_FIREBALL_COLOR);

    onFireballClick.style.background = newBackground;
    wizardsFireballInputHidden.value = newBackground;
  }

  onFireballClick.addEventListener('click', clickChangeFireballColor);

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
