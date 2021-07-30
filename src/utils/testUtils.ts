import axios from "axios";

export const testRegister = async (port: string) => {
  try {
    await axios.post(`http://localhost:${port}/api/register`, {
      username: "testusername",
      password: "TestPassword123!",
      email: "test@test.com",
    });
  } catch (err) {
    console.log(err);
  }
};

export const testLogin = async (port: string): Promise<string> => {
  const { data } = await axios.post(`http://localhost:${port}/api/login`, {
    username: "testusername",
    password: "TestPassword123!",
  });

  return data.access_token;
};