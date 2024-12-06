import API from "../../api/api";
import { loginFailure, loginSuccess } from "../reducers/authReducer";
import { AppDispatch } from "../store/store";

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await API.post("/user/login", { email, password });
      const token = response.data.token;

      // Store token and dispatch success
      dispatch(loginSuccess(token));
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      dispatch(loginFailure(error.message));
    }
  };

export const registerUser =
  (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) =>
  async () => {
    try {
      await API.post("/user/register", data);
      alert("Registration successful!");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  };
