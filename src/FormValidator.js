/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
export default class FormValidator {
  constructor(id) {
    id.forEach((item) => {
      this[`${item}Element`] = document.querySelector(`#${item}`);
    });
  }

  // Для каждого поля отдельно
  checkInputValidity(event) {
    this.validation(event.target);
    this.allValid(event.target);
  }

  // Функция проверяет валидны ли все элементы формы
  allValid(formElement) {
    const inputs = Array.from(formElement.form.elements);

    let isFormValid = true;

    inputs.forEach((elem) => {
      if (elem.id !== 'submit') {
        if (!this.validation(elem)) isFormValid = false;
      }
    });

    this.setSubmitButtonState(isFormValid);
  }

  // Проверяет введенные сообщения в элементы формы на соответствия требованиям валидации
  validation(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (!element.checkValidity()) {
      this.activateError(errorElement, element);
      return false;
    }
    if (element.value.length === 0) {
      this.activateError(errorElement, element);
      return false;
    }
    if (element.checkValidity()) {
      this.removeError(errorElement, element);
      return true;
    }
  }

  // Если checkValidity() возвращает fasle, то функция редактирует внешний вид блоков с сообщениями
  // об ошибке
  activateError(errorElement, element) {
    errorElement.textContent = this.errorMessage(element);
    element.classList.remove('popup__input_valid');
    element.classList.add('popup__input_invalid');
    errorElement.style = null;
  }

  // Если ошибка была исправлена или checkValidity() изначально возвращала true, то либо все
  // возвращается назад, либо просто ничего не происходит
  removeError(errorElement, element) {
    element.classList.remove('popup__input_invalid');
    element.classList.add('popup__input_valid');
    errorElement.style.display = 'none';
  }

  // Определяет в каком случае какое сообщение надо показать
  errorMessage(element) {
    switch (element.name) {
      case 'name':
      case 'authorName':
      case 'about':
        if (element.value.length === 0) return 'Это обязательное поле';
        if (element.value.length === 1) return 'Должно быть от 2 до 30 символов';
        break;
      case 'link':
      case 'avatarLink':
        if (element.value.length === 0) {
          return 'Это обязательное поле';
        }
        return 'Здесь должна быть ссылка';
    }
  }

  // Функция блокирует или разблокирует кнопку сохранения
  setSubmitButtonState(isFormValid) {
    if (isFormValid) {
      return event.target.form.submit.removeAttribute('disabled');
    }
    if (!(isFormValid && event.target.form.submit.hasAttribute('disabled'))) {
      return event.target.form.submit.setAttribute('disabled', true);
    }
  }

  // Определяет свой слушатель каждому элементу, переданному в конструктор
  setEventListeners() {
    const temp = Object.entries(this).sort((a, b) => { a[0] - b[0]; });
    temp.forEach((item) => {
      item[1].addEventListener('input', () => {
        this.checkInputValidity.call(this, event);
      });
    });
  }
}
