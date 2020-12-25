const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
};

function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
  }
};

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
};

//check all the input nodelist, set listeners for switching an error text and underlining invalid input
function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
};

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
    setEventListener(form, config);
  });
};

enableValidation(validationConfig);