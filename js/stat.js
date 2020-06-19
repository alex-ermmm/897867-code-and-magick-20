'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 260;
var TEXT_HEIGTH = 50;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - CLOUD_GAP - TEXT_HEIGTH - CLOUD_GAP;
var HEADER_TEXT_X = 150;
var HEADER_TEXT_Y = 50;
var HEADER_TEXT_GAP = 20;

// отрисвока облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// получаем максимальный элементы
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function getRandomColorHex(min, max) {
  return Math.random() * (max - min) + min;
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '15px PT Mono';
  ctx.fillText('Ура вы победили!', HEADER_TEXT_X, HEADER_TEXT_Y);
  ctx.fillText('Список результатов:', HEADER_TEXT_X, HEADER_TEXT_Y + HEADER_TEXT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    // проверяем на "вы"
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(253, 96%, ' + getRandomColorHex(0, 100) + '%)';
    }
    // описание слолбцов гистрограммы
    ctx.fillText(players[i], GAP + CLOUD_X + (GAP * i * 2), FONT_GAP);

    // элемент гистрограммы
    ctx.fillRect(GAP + CLOUD_X + (GAP * i * 2), CLOUD_HEIGHT - (GAP / 2), BAR_WIDTH, -(barHeight * times[i]) / maxTime + HEADER_TEXT_Y);
  }
};
