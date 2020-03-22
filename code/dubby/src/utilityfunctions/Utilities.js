import { firestore } from "firebase";

export const setupFirestoreForNewAccount = async ({ uid }) => {
  const accountData = {
    uid,
    username: "Lil Potato",
    university: "",
    interested_sports: "",
    description: ""
  };
  const userDataRef = firestore()
    .collection("user_profile")
    .doc(uid);
  await userDataRef.set(accountData);
};
