import * as popup from './../module/popup.js';
import * as openInfo from './../module/open-info.js';
import * as saveInfo from './../module/save-info.js';

const btnEdit = document.querySelector('.btn_type_edit');
const btnClose = document.querySelector('.btn_type_close');
const btnSave = document.querySelector('.btn_type_save');

btnEdit.addEventListener('click', function () {
  openInfo.default();
  popup.default();
});

btnClose.addEventListener('click', function () {
  popup.default()
})

btnSave.addEventListener('click', function () {
  saveInfo.default();
  popup.default();
})