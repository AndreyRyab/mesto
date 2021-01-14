export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorElement = config.errorElement;
    this._errorVisibility = config.errorVisibility;
    this._form = form;
  }

  //check all the input nodelist, set listeners for switching an error text and underlining invalid input
  enableValidation() {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._setButtonState();
    //hide error-texts
    Array.from(this._form.querySelectorAll(this._errorElement))
      .forEach((item) => { item.classList.remove(this._errorVisibility) });

    //hide input-errors & set listeners for checking validity while input
    Array.from(this._form.querySelectorAll(this._inputSelector))
      .forEach((item) => {
        item.classList.remove(this._inputErrorClass);
        this._setEventListeners(item);
      });
  }

  _setEventListeners(input) {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._setButtonState();
    });
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorVisibility);
    input.classList.add(this._inputErrorClass);
  }

  _setButtonState() {
    const formValidity = this._form.checkValidity();
    if (formValidity === true) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

}