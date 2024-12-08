import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "./../slices/authSlice";

export const loginUser = (email, password) => async (dispatch) => {
  const auth = getAuth();
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();

    // Save token and user data in AsyncStorage
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      })
    );

    dispatch(
      loginSuccess({
        user: {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        },
        token,
      })
    );
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
export const registerUser =
  (email, password, navigation) => async (dispatch) => {
    const auth = getAuth();
    dispatch(loginStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // Navigate to success screen
      navigation.navigate("AccountCreated");

      // Optional: You can store the user or token in Redux state if needed
      dispatch(
        loginSuccess({
          user: {
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          },
          token,
        })
      );
    } catch (error) {
      console.log("🚀 ~ error:", error);
      // Map Firebase error codes to custom messages
      let errorMessage = "Registration failed! Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      // Pass the custom error message to Redux
      dispatch(loginFailure(errorMessage));
    }
  };
export const logoutUser = () => async (dispatch) => {
  try {
    // Clear AsyncStorage data
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
