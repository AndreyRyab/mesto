export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }

  //check all the input nodelist, set listeners for switching an error text and underlining invalid input
  enableValidation(form) {
    const inputList = form.querySelectorAll(this._inputSelector);
    const submitButton = form.querySelector(this._submitButtonSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input);
        this._setButtonState(submitButton, form.checkValidity());
      });
    });
  };

  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideError(form, input);
    } else {
      this._showError(form, input);
    }
  };

  _showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };

  _hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };

  _setButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  };

}