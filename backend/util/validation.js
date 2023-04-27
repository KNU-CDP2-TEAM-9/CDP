const isValidText = (value, minLength = 1) => {
  return value && value.trim().length >= minLength;
};

const isValidDate = (value) => {
  const date = new Date(value);
  return value && date !== "Invalid Date";
};

const isValidEmail = (value) => {
  return value && value.includes("@");
};

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidEmail = isValidEmail;
