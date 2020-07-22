'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  // возвращаем случайны элемент массива
  function getMeRandomElements(sourceArray, neededElements) {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
      result.push(sourceArray[Math.floor(Math.random() * sourceArray.length)]);
    }
    return result;
  }

  function onError(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function onSuccess(data) {
    var wizzardsElements = getMeRandomElements(data, MAX_SIMILAR_WIZARD_COUNT);
    window.dialog.renderWizards(wizzardsElements);
  }

  window.backend = {
    onError: onError,
    onSuccess: onSuccess
  };

})();
