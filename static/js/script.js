const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_confirmation = document.getElementById('password-confirmation');
const form_fields = [username, email, password, password_confirmation];

// Check required fields
function checkRequired(inputArr) {
  validated = true;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required.`);
      validated = false;
    }
  });
 return validated;
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function resetFormBorders(inputArr) {
  inputArr.forEach(function (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control';
    const small = formControl.querySelector('small');
    small.innerText = "";
  });
}


// Check email is valid
function checkEmail(input) {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!input.value.trim().match(pattern)) {
    return [false, "Email is invalid."];
  } else {
    return [true, input];
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
      return [false,
      `${getFieldName(input)} must be between ${min} and ${max} characters.`];
  } else {
      return [true, input];
  }
}

// Check passwords match in content and are proper length
function checkPasswords(input1, input2) {

  check_password_1 = checkLength(input1, 6, 25);
  check_password_2 = checkLength(input2, 6, 25);
  validated = true;
  validation_msg = "";
  if (input1.value !== input2.value)  {
    validation_msg += "Password fields do not match. ";
    validated = false;
  }

  if(!check_password_1[0] || !check_password_2[0]) {
    validation_msg += check_password_1[1];
    validated = false;
  }

  return [validated, validation_msg.trim()]

}


// Get fieldname
function getFieldName(input) {
  return (input.id.charAt(0).toUpperCase() + input.id.slice(1)).replace("-", " ");
}

// Event listeners
form.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log("Statement 1.")
  if(checkRequired(form_fields)){
    console.log("Inner statement 2.")
    passwords_check = checkPasswords(password, password_confirmation)
    if(!passwords_check[0]){
      showError(password, passwords_check[1])
      showError(password_confirmation, passwords_check[1])
    }
    else {
      showSuccess(password)
      showSuccess(password_confirmation)
    }

    username_check = checkLength(username, 3, 15)
    if(!username_check[0]) {
      showError(username, username_check[1])
    }
    else {
      showSuccess(username)
    }

    email_check = checkEmail(email)
    if(!email_check[0]) {
      showError(email, email_check[1])
    }
    else {
      showSuccess(email)
    }
    // console.log(checkEmail(email));

  }

});
