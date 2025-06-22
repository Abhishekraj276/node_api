const errorMessages = require('./errors.json');

const getError = (code) => {
  return errorMessages[code] || "An unexpected error occurred.";
};

module.exports = { getError };
