export const onChangeKeyCheck = (textValue) => {
  let errorText = "Password must contain atleast ";
  let errorPush = [];

  var lowerCaseLetters = /[a-z]/g;

  if (textValue.match(lowerCaseLetters) === null) {
    errorPush.push("one lowercase letter ");
  }

  var upperCaseLetters = /[A-Z]/g;
  if (textValue.match(upperCaseLetters) === null) {
    errorPush.push("one uppercase letter ");
  }

  var specialLetters = /[!@#$%^&*]/g;
  if (textValue.match(specialLetters) === null) {
    errorPush.push("one special letter ");
  }

  var numbers = /[0-9]/g;
  if (textValue.match(numbers) === null) {
    errorPush.push("one numeric value ");
  }

  if (textValue.length < 6) {
    errorPush.push("six characters ");
  }

  if (errorPush.length === 1) {
    errorText += errorPush[0];
  } else {
    if (errorPush.length === 2) {
      errorText += errorPush[0] + "& " + errorPush[1];
    } else {
      errorPush.forEach((err, i) => {
        if (i + 2 === errorPush.length) {
          errorText += err + "& ";
        } else if (i + 1 === errorPush.length) {
          errorText += err;
        } else {
          errorText += err + ", ";
        }
      });
    }
  }

  if (errorText.length < 31) {
    return false;
  } else {
    return errorText;
  }
};
export const onChangeKeyCheckNumber = (textValue) => {
  let errorText = "Transaction password only 5 numeric digit";

  var numbers = "^[0-9]+$";
  if (!textValue.match(numbers) && textValue.length <=5) {
    return errorText;
  }
  if ( textValue.length <= 4) {
    return errorText;
  }
  if ( textValue.length > 5) {
    return errorText;
  }

  return "";
};
