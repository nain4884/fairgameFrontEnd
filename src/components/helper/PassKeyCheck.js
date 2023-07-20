export const onChangeKeyCheck = (textValue) => {
    let errorText = "Password must contain atleast "
    let errorPush = []

    var lowerCaseLetters = /[a-z]/g;

    if (textValue.match(lowerCaseLetters) === null) {
        errorPush.push("one lowercase letter ")
    }

    var upperCaseLetters = /[A-Z]/g;
    if (textValue.match(upperCaseLetters) === null) {
        errorPush.push("one uppercase letter ")
    }


    var specialLetters = /[!@#$%^&*]/g;
    if (textValue.match(specialLetters) === null) {
        errorPush.push("one special letter ")
    }

    var numbers = /[0-9]/g;
    if (textValue.match(numbers) === null) {
        errorPush.push("one numeric value ")
    }

    if (textValue.length < 6) {
        errorPush.push("six characters ")
    }

    if (errorPush.length === 1) {
        errorText += errorPush[0]
    } else {
        if (errorPush.length === 2) {
            errorText += errorPush[0] + "& " + errorPush[1]
        } else {
            errorPush.forEach((err, i) => {
                if (i + 2 === errorPush.length) {
                    errorText += err + "& "
                } else if (i + 1 === errorPush.length) {
                    errorText += err
                } else {
                    errorText += err + ", "
                }
            });
        }
    }

    if (errorText.length < 31) {
        return false
    } else {
        return errorText
    }

}
export const onChangeKeyCheckNumber = (textValue) => {
    let errorText = "Password must contain at least ";
    let errorPush = [];

    var numbers = /^\d+$/;
    if (!textValue.match(numbers)) {
        errorPush.push("only numeric digits");
    }

    if (textValue.length < 4) {
        errorPush.push("minimum 5 digits");
    }

    if (errorPush.length === 1) {
        errorText += errorPush[0];
    } else if (errorPush.length === 2) {
        errorText += errorPush.join(" & ");
    } else if (errorPush.length > 2) {
        errorText +=
            errorPush.slice(0, -1).join(", ") + " & " + errorPush.slice(-1);
    }

    if (errorPush.length === 0) {
        return null; // Return null when there are no errors
    } else {
        return errorText;
    }
};