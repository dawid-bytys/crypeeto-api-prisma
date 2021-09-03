import axios, { AxiosResponse } from "axios";

/**
 * Registers a user
 * @param {number} port The value of a port
 *
 */
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

/**
 * Registers a user
 * @param {number} port A port value
 * @returns {promise} An axios type promise
 */
export const testLogin = async (
  port: number
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.post(
      `http://localhost:${port}/api/auth/login`,
      {
        username: "testusername",
        password: "TestPassword123!",
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};
