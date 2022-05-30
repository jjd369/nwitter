import { app } from "fb/fbConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export const onAddDoc = async (data) => {
  await addDoc(collection(db, "nweet"), data);
};

export const onGetDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "nweet"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data = [...data, { ...doc.data(), id: doc.id }];
  });
  return data;
};
