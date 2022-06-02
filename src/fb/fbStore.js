import { app } from "fb/fbConfig";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);
const collectionRef = collection(db, "nweet");
export const onAddDoc = async (data) => {
  await addDoc(collectionRef, data);
};

export const onGetNweets = async () => {
  const q = query(collectionRef, orderBy("createAt", "desc"));
  const querySnapshot = await getDocs(q);

  let data = [];
  querySnapshot.forEach((doc) => {
    data = [...data, { ...doc.data(), id: doc.id }];
  });
  return data;
};

export const onGetNweet = async (userObj) => {
  const q = query(
    collectionRef,
    where("createId", "==", userObj.uid),
    orderBy("createAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data = [...data, { ...doc.data(), id: doc.id }];
  });
  return data;
};

export const onDeleteDocs = async (docId) => {
  const ref = doc(db, "nweet", docId);
  await deleteDoc(ref);
};

export const onUpdateDocs = async (docId, text) => {
  const ref = doc(db, "nweet", docId);

  await updateDoc(ref, { text });
};

export const unsub = (cb) => {
  const q = query(collectionRef, orderBy("createAt", "desc"));
  onSnapshot(q, (querySnapshot) => {
    let data = [];
    querySnapshot.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }];
    });
    cb(data);
  });
};
