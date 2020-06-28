'use strict';

var COUNT_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_FAMILYNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
