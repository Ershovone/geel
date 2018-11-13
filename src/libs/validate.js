export function validatePhone(phone) {
  let result = false;

  if (phone && typeof phone === 'string' && phone.match(/\d+/g).join('').length === 11) {
    result = true;
  }
  return result;
}

export function validateEmail(email) {
  let result = false;
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email && emailRegExp.test(email)) {
    result = true;
  }
  return result;
}

export function validateName(name) {
  let result = false;
  const nameRegExp = /^[a-zA-Zа-яА-Я][^#&<>\"~_\d;=$^%{}?]{1,20}$/g;

  if (name && nameRegExp.test(name)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function validateExtraFeatures(data) {
  let result = false;
  const featureRegExp = /^$|^[a-zA-Zа-яА-Я][^#&<>\"~\d;$=^%{}?]{0,100}$/g;

  if (featureRegExp.test(data)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function validatePassword(password) {
  let result = false;

  if (password && password.length > 5) {
    result = true;
  }
  return result;
}

export function validateRepeatPassword(password, repeatePassword) {
  let result = false;

  if (password && repeatePassword && password === repeatePassword) {
    result = true;
  }
  return result;
}

export function validateBirtday(birthday) {
  let result = false;

  if (
    birthday &&
    typeof birthday === 'string' &&
    birthday.split('.').length === 3
  ) {
    const birtDayArray = birthday.split('.');

    if (
      (Number.parseInt(birtDayArray[0], 10) > 0 && Number.parseInt(birtDayArray[0], 10) < 32) &&
      (Number.parseInt(birtDayArray[1], 10) > 0 && Number.parseInt(birtDayArray[1], 10) < 13) &&
      (Number.parseInt(birtDayArray[2], 10) > 1900 && Number.parseInt(birtDayArray[2], 10) < 2020)
    ) {
      result = true;
    }
  }
  return result;
}
