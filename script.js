let userEditButton = document.querySelector('.profile__user-button'); /* set variable for edit-button */
let popupCloseButton = document.querySelector('.popup__close-button'); /* set variable for x-button */
let popupSubmitButton = document.querySelector('.popup__form-button'); /* set variable for submit-button */
let popup = document.querySelector('.popup');

userEditButton.addEventListener('click', togglePopup); /* set listener for edit-button */
popupCloseButton.addEventListener('click', togglePopup); /* set listener for x-button */

/* set func for popup - toggle close-open by adding the '.popup_opened'-class*/
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

let popupForm = document.querySelector('.popup__form'); /* set variable for the form */
let profileUserName = document.querySelector('.profile__username'); /* set variable for username */
let profileUserJob = document.querySelector('.profile__about'); /* set variable for user job */

popupForm.addEventListener('submit', handleForm); /* set listener for the form */

/* set func for editing user info */
function handleForm(evt) {
  evt.preventDefault(); /* prevent auto reload */
  let popupInputName = document.querySelector('.popup__form-input_name'); /* set variable for username-input */
  profileUserName.textContent = popupInputName.value; /* change the username value */
  let popupInputJob = document.querySelector('.popup__form-input_job'); /* set variable for job-input */
  profileUserJob.textContent = popupInputJob.value; /* change the job value */
}

popupSubmitButton.addEventListener('click', togglePopup); /* closing the popup when submit */