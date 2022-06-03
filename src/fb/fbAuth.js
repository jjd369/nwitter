import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { app } from "fb/fbConfig";

export const authService = getAuth(app);

export const onAuthSubmit = async (newAccount, email, password) => {
  const data = newAccount
    ? await createUserWithEmailAndPassword(authService, email, password)
    : await signInWithEmailAndPassword(authService, email, password);
  return data;
};

export const onAuthStateChangedLisenter = (cb) => {
  onAuthStateChanged(authService, (user) => cb(user));
};

export const onSignInWithPopup = async (name) => {
  const provider =
    name === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();

  const result = await signInWithPopup(authService, provider);

  return result;
};

export const onUpdateProfile = async (displayName, photoURL) => {
  await updateProfile(authService.currentUser, { displayName, photoURL });
};
