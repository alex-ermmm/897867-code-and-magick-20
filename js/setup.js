'use strict';
(function setup() {

  var COUNT_WIZARDS = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_FAMILYNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;


  window.setup = {
    COUNT_WIZARDS: COUNT_WIZARDS,
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_FAMILYNAME: WIZARD_FAMILYNAME,
    WIZARD_COAT_COLOR: WIZARD_COAT_COLOR,
    WIZARD_EYES_COLOR: WIZARD_EYES_COLOR,
    WIZARD_FIREBALL_COLOR: WIZARD_FIREBALL_COLOR,
    MIN_NAME_LENGTH: MIN_NAME_LENGTH,
    MAX_NAME_LENGTH: MAX_NAME_LENGTH
  };
}());
