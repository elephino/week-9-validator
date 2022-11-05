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

// Check email is valid
function checkEmail(input) {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!input.value.trim().match(pattern)) {
    return {"result": false, "result_msg": "Email is invalid."};
  } else {
    return {"result": true, "result_msg": input};
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
      return {"result": false, "result_msg": `${getFieldName(input)} must be between ${min} and ${max} characters.`};
  } else {
      return {"result": true, "result_msg": ""};
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

  if((!check_password_1["result"] && !check_password_2["result"]) || !check_password_1["result"]) {
    validation_msg += check_password_1["result_msg"];
    validated = false
  }
  else if (!check_password_2["result"]) {
    validation_msg += check_password_2["result_msg"]
    validated = false
  }

  return {"result": validated, "result_msg": validation_msg.trim()}

}

// Get fieldname
function getFieldName(input) {
  return (input.id.charAt(0).toUpperCase() + input.id.slice(1)).replace("-", " ");
}

// Event listeners
form.addEventListener('submit', function(event) {
  event.preventDefault();

  reset_form = true;

  if(checkRequired(form_fields)){
    passwords_check = checkPasswords(password, password_confirmation);
    if(!passwords_check["result"]){
      showError(password, passwords_check["result_msg"]);
      showError(password_confirmation, passwords_check["result_msg"]);
      reset_form = false;
    }
    else {
      showSuccess(password);
      showSuccess(password_confirmation);
    }

    // console.log(checkPasswords(password, password_confirmation))

    username_check = checkLength(username, 3, 15);
    if(!username_check["result"]) {
      showError(username, username_check["result_msg"]);
      reset_form = false;
    }
    else {
      showSuccess(username);
    }

    // console.log(checkLength(username, 3, 15));

    email_check = checkEmail(email);
    if(!email_check["result"]) {
      showError(email, email_check["result_msg"]);
      reset_form = false;
    }
    else {
      showSuccess(email);
    }

    // console.log(checkEmail(email));
  }
  else {
    reset_form = false;
  }

  if(reset_form) {
      form_fields.forEach(function (input) {
      field.reset();
    }
  }

});
