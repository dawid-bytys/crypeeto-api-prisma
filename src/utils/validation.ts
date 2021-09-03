/**
 * Checks an input provided by a user
 * @param {T} input A value of a generic input
 * @param {number} amount An amount of input fields
 * @returns {boolean} A boolean representing whether the input is valid or not
 */
export const isInputValid = <T>(input: T, amount: number): boolean => {
  if (Object.keys(input).length !== amount) return false;

  for (const [_, value] of Object.entries(input)) {
    if (typeof value === "undefined") return false;
  }

  return true;
};

/**
 * Checks a username provided by a user
 * @param {string} username A value of the username
 * @returns {boolean} A boolean representing whether the username is valid or not
 */
export const isUsernameValid = (username: string): boolean => {
  const regex = /^[A-z]{2,}[A-z0-9]*$/;

  return regex.test(username);
};

/**
 * Checks a password provided by a user
 * @param {string} password A value of the password
 * @returns {boolean} A boolean representing whether the password is valid or not
 */
export const isPasswordValid = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  return regex.test(password);
};

/**
 * Checks an e-mail provided by a user
 * @param {string} email A value of the e-mail
 * @returns {boolean} A boolean representing whether the e-mail is valid or not
 */
export const isEmailValid = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};
