const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const errorMessage = document.getElementById("error-message");

// Handle success or error
function showError(input, message) {
  const formControl = input.parentElement; // Get the parent of the input field
  formControl.className = "form-control error"; // Add the error class to it
  const small = formControl.querySelector('small');
  small.innerText = message; // Set the text inside
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement; // Get the parent of the input
  formControl.className = "form-control success"; // Add the success class to it
}


// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

// Check email format
function isValidEmail(input) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}


// Submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, password2])) {
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordsMatch(password, password2);
  }
});