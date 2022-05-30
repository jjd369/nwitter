import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "fb/fbConfig";

export const authService = getAuth(app);

export const callOnSubmit = async (newAccount, email, password) => {
  const data = newAccount
    ? await createUserWithEmailAndPassword(authService, email, password)
    : await signInWithEmailAndPassword(authService, email, password);
  return data;
};

export const onAuthState = (cb) => {
  onAuthStateChanged(authService, (user) => cb(user));
};

export const callSignInWithPopup = async (name) => {
  const provider =
    name === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();

  const result = await signInWithPopup(authService, provider);
  console.log(result);

  return result;
};
