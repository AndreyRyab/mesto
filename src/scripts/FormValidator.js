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
    this._clearErrors();
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    //hide input-errors
    this._inputList.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    });
    //set listeners for checking validity while input
    this._setEventListeners();
  }

  _clearErrors() {
    Array.from(this._form.querySelectorAll(this._errorElement))
      .forEach((item) => { item.classList.remove(this._errorVisibility) });
  }


  _setEventListeners() {
    this._inputList.forEach((item) => {
      addEventListener('input', () => {
        this._checkInputValidity(item);
        this._setButtonState();
      });
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
    const formValid = this._form.checkValidity();
    if (formValid) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }
} 