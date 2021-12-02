const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const isValidDate = (dateString) => {
  // First check for the pattern
  if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = dateString.split('-');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || parseInt(month, 10) === 0 || parseInt(month, 10) > 12) {
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

export default function validateLogin(props) {
  const errors = {};
  if (!props.userName) {
    errors.userName = 'User Name is required.';
  }
  if (!props.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

function compareDates(from, to) {
  const [fromD, fromM, fromY] = from.split('-');
  const [toD, toM, toY] = to.split('-');
  const isYearEqual = parseInt(fromY, 10) === parseInt(toY, 10);
  const isMonthEqual = parseInt(fromM, 10) === parseInt(toM, 10);
  if (parseInt(fromY, 10) > parseInt(toY, 10)
   || (isYearEqual && parseInt(fromM, 10) > parseInt(toM, 10))
   || (isYearEqual && isMonthEqual && parseInt(fromD, 10) > parseInt(toD, 10))) {
    return false; // From is after To Date
  }
  return true; // To is After From Date
}

export function validateMeeting(props) {
  const errors = {};
  if (!props.name) {
    errors.name = 'Name is required.';
  }

  if (!props.from || !props.to) {
    errors.from = 'From and To fields are required.';
  } else {
    const date = new Date().toISOString().split('T')[0].split('-');

    if (!isValidDate(props.from) || !isValidDate(props.to)) {
      errors.dates = 'Valid From and To are required.';
    } else if (!compareDates(`${date[2]}-${date[1]}-${date[0]}`, props.from)) {
      errors.dates = 'Meeting date can not be in past.';
    } else if (!compareDates(props.from, props.to)) {
      errors.dates = 'From must be less then To date.';
    }
  }

  if (!props.attendees) {
    errors.attendees = 'Attendees are required.';
  } else {
    const emails = props.attendees.split(',');
    const inValidEmails = emails.reduce((acc, email) => {
      if (!validateEmail(email)) {
        acc.push(email);
      }
      return acc;
    }, []);

    if (inValidEmails.length) {
      errors.attendees = 'Valid Attendees email is required.';
    }
  }

  return errors;
}
