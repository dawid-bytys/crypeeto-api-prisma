// An input validation function
export const isInputValid = <T>(input: T, amount: number) => {
  if (Object.keys(input).length !== amount) return false;

  for (const [value] of Object.entries(input)) {
    if (!value) return false;
  }

  return true;
};

// A username validation function
export const isUsernameValid = (username: string) => {
  const regex = /^[A-z]{2,}[A-z0-9]*$/;

  return regex.test(username);
};

// A password validation function
export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  return regex.test(password);
};

// An e-mail validation function
export const isEmailValid = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};
