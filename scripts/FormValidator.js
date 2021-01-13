export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
  }

  //check all the input nodelist, set listeners for switching an error text and underlining invalid input
  enableValidation() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._setButtonState(submitButton, this._form.checkValidity());
    const inputList = this._form.querySelectorAll(this._inputSelector);
    Array.from(inputList).forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState(submitButton, this._form.checkValidity());
      });
    });
  };

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  };

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };

  _setButtonState(button, valid) {
    if (valid) {
      button.classList.remove('popup__form-button_disabled');
      button.disabled = false;
    } else {
      button.classList.add('popup__form-button_disabled');
      button.disabled = true;
    }
  };

/*   _desableSubmitButton (form) {
    form.querySelector('.popup__form-button').classList.add('popup__form-button_disabled');
  } */

}