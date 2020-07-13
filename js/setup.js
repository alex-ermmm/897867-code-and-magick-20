'use strict';

var COUNT_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_FAMILYNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

// var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

// куда будем вставлять магов
var similarListElement = document.querySelector('.setup-similar-list');

// шаблон элементов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// возвращаем случайны элемент массива
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// возвращаем склеенное, случаное имя и фамилию
function createFullName(names, family) {
  return getRandomValue(names) + ' ' + getRandomValue(family);
}

// отрисовываем элементы (карточки) магов
function createWizardElement(name, family, coatColor, eyesColor) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  // вставлем случайное имя
  wizardElement.querySelector('.setup-similar-label').textContent = createFullName(name, family);

  // заливаем плащ случайным цветом из массива
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomValue(coatColor);

  // заливаем глаза случайным цветом из массива
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomValue(eyesColor);

  return wizardElement;
}

function renderWizards(names, famyliNames, coatColor, eyesColor) {
  var fragment = document.createDocumentFragment();

  // записываем в фрагмент
  for (var i = 0; i < COUNT_WIZARDS; i++) {
    fragment.appendChild(createWizardElement(names, famyliNames, coatColor, eyesColor));
  }

  // выводим магов в блок похожих персонажей
  return similarListElement.appendChild(fragment);
}

renderWizards(WIZARD_NAMES, WIZARD_FAMILYNAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

document.querySelector('.setup-similar').classList.remove('hidden');

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
  } else if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
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
  var newColor = randomWizardStyle(WIZARD_COAT_COLOR);

  wizardsCoatColor.style.fill = newColor;
  wizardsCoatColorInputHidden.value = newColor;
}

wizardsCoatColor.addEventListener('click', clickChangeCoatColor);

// меняем цвет глаз и передем его в скрытый input
var wizardsEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
var wizardsCoatEyesInputHidden = document.querySelector('input[name="eyes-color"]');

function clickChangeColorEyes() {
  var newColor = randomWizardStyle(WIZARD_EYES_COLOR);

  wizardsEyesColor.style.fill = newColor;
  wizardsCoatEyesInputHidden.value = newColor;
}

wizardsEyesColor.addEventListener('click', clickChangeColorEyes);

// меняем цвет фаербола и передем его в скрытый input
var wizardsFireball = document.querySelector('.setup-fireball-wrap');
var wizardsFireballInputHidden = wizardsFireball.querySelector('input');

function clickChangeFireballColor() {
  var newBackground = randomWizardStyle(WIZARD_FIREBALL_COLOR);

  wizardsFireball.style.background = newBackground;
  wizardsFireballInputHidden.value = newBackground;
}

wizardsFireball.addEventListener('click', clickChangeFireballColor);
