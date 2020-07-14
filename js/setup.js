'use strict';
(function setup() {
  var COUNT_WIZARDS = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_FAMILYNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.setup = {
    WIZARD_COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };

  window.WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.MIN_NAME_LENGTH = 2;
  window.MAX_NAME_LENGTH = 25;

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

  renderWizards(WIZARD_NAMES, WIZARD_FAMILYNAME, window.setup.WIZARD_COAT_COLOR, window.setup.WIZARD_EYES_COLOR);

  document.querySelector('.setup-similar').classList.remove('hidden');

}());
