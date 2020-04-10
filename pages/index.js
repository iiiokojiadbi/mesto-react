/* Функции поделены на модули, которые импортируются целиком с присвоением
   им уникального имени.
   Создана коллекция элементов btn, где через цикл прохода каждому элементу
   колекции присвоин обработчик событий по клику.
*/

import * as popup from './../module/popup.js';
import * as openInfo from './../module/open-info.js';
import * as saveInfo from './../module/save-info.js';

const btn = document.querySelectorAll('.btn');

btn.forEach.call(btn, function (element) {
  element.addEventListener('click', function () {
    if (this.classList.contains('btn_type_edit')) {
      openInfo.default();
      popup.default();
    } else if (this.classList.contains('btn_type_close')) {
      popup.default();
    } else if (this.classList.contains('btn_type_save')) {
      saveInfo.default();
      popup.default();
    } else {
      console.log('Функционал кнопки не реализован!');
    }
  });
});