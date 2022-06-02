import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();

export const onUplodAttachment = async (userObj, url) => {
  const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
  const respone = await uploadString(storageRef, url, "data_url");

  const downloadUrl = await getDownloadURL(respone.ref);
  return downloadUrl;
};
export const onDeleteAttachement = async (url) => {
  const desertRef = ref(storage, url);
  const res = await deleteObject(desertRef);
  console.log("------------------------------------");
  console.log(res);
  console.log("------------------------------------");
};
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"
