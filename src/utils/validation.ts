export const isUsernameValid = (username: string): boolean => {
  const regex = /^[A-z]{2,}[A-z0-9]*$/;

  return regex.test(username);
};

export const isPasswordValid = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  return regex.test(password);
};

export const isEmailValid = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};
