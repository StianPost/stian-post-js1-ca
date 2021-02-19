const firstNameError = document.querySelector('.firstNameError');
const subjectError = document.querySelector('.subjectError');
const emailError = document.querySelector('.emailError');
const addressError = document.querySelector('.addressError');

const submit = document.querySelector('#submitBtn');

submit.onclick = function (event) {
  event.preventDefault();

  const firstName = document.querySelector('#firstName').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const email = document.querySelector('#email').value.trim();
  const address = document.querySelector('#address').value.trim();

  if (testLength(firstName, 3)) {
    firstNameError.classList.add('hide');
  } else {
    firstNameError.classList.remove('hide');
  }
  if (testLength(subject, 5)) {
    subjectError.classList.add('hide');
  } else {
    subjectError.classList.remove('hide');
  }
  if (validateEmail(email)) {
    emailError.classList.add('hide');
  } else {
    emailError.classList.remove('hide');
  }
  if (testLength(address, 5)) {
    addressError.classList.add('hide');
  } else {
    addressError.classList.remove('hide');
  }
};

function validateEmail(emailAddress) {
  const emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isEmailValid = emailExpression.test(emailAddress);
  return isEmailValid;
}

function testLength(elm, len) {
  if (elm.length > len) {
    return true;
  } else {
    return false;
  }
}
