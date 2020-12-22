const formUser = document.querySelector('.popup__form_user');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
};

//показывает ошибку
function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

//скрывает ошибку
function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

//проверяет инпуты на валидность
function checkInputValidity(form, input) {
  if (input.validity.valid) {
    hideError(form, input);
  } else {
    showError(form, input);
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

//перебираем нодлист из инпутов и расставляем лиснеры, которые включают текст ошибки и подсвечивают поля


function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      setButtonState(submitButton, form.checkValidity());
    });
  });
}

setEventListener(formUser, config)

/* function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListener(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //!!!! вот тут не работает:
    const submitButton = form.querySelector(config.submitButtonSelector);
    console.log(submitButton);

    setButtonState(submitButton, form.checkValidity());
  });
};

enableValidation(); */