import axios from "axios";

export const testRegister = async (port: number) => {
  try {
    await axios.post(`http://localhost:${port}/api/auth/register`, {
      first_name: "John",
      last_name: "Smith",
      username: "testusername",
      password: "TestPassword123!",
      confirm_password: "TestPassword123!",
      email: "test@test.com",
    });
  } catch (err) {
    console.log(err);
  }
};

export const testLogin = async (port: number): Promise<string> => {
  const { data } = await axios.post(`http://localhost:${port}/api/auth/login`, {
    username: "testusername",
    password: "TestPassword123!",
  });

  return data.access_token;
};
