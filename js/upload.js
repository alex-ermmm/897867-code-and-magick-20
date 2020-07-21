'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/code-and-magick';

  function uploadData(data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    function onSuccessHandler() {
      onSuccess(xhr.response);
    }

    xhr.addEventListener('load', onSuccessHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.upload = {
    uploadData: uploadData
  };
})();
