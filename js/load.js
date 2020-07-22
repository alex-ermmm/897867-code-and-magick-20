'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/code-and-magick/data';

  // URL для теста ошибок
  // var URL = 'https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/unknownfile.json';
  // var URL = 'https://api.github.com/user';


  function load(url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    function loadHendler() {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }

    xhr.addEventListener('load', loadHendler);

    function errorHandler() {
      onError('Произошла ошибка соединения');
    }

    xhr.addEventListener('error', errorHandler);

    function timeoutHandler() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    }

    xhr.addEventListener('timeout', timeoutHandler);

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  }

  window.loadData = {
    URL: URL,
    load: load
  };

})();
