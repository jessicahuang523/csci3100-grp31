import { auth, firestore } from "firebase";

export const devSetupAccount = async () => {
  const { uid } = auth().currentUser;
  const accountData = {
    uid,
    username: `Anonymous ${uid.substr(0, 6)}`,
    university: "CUHK",
    interested_sports: "basketball, tennis, scuba diving, eating",
    description: "I farm code. Code is what I farm.\nbtw can we get an A please"
  };
  const userDataRef = firestore()
    .collection("user_profile")
    .doc(uid);
  await userDataRef.set(accountData);
  alert("Dev account data set!");
};

export const devSetupChat = async cid => {
  const chatRef = firestore()
    .collection("chat")
    .doc(cid);
  const chatData = {
    cid,
    type: "event", // "event", "private" or "group"
    icon: "fab fa-dev",
    title: "2020/02/02 20:20 at SC"
  };
  chatRef.set(chatData);
  await chatRef
    .collection("participants")
    .doc("dev")
    .set({ username: "dev", uid: "dev" });
  alert("Chat data set!");
};

export const devAddToChat = async (cid, uid) => {
  const chatRef = firestore()
    .collection("chat")
    .doc(cid);
  const userRef = firestore()
    .collection("user_profile")
    .doc(uid);
  const chatDataSnap = await chatRef.get();
  const userDataSnap = await userRef.get();
  if (chatDataSnap.exists && userDataSnap.exists) {
    const { username, uid } = userDataSnap.data();
    await chatRef
      .collection("participants")
      .doc(uid)
      .set({ username, uid });
    await userRef
      .collection("chats")
      .doc(cid)
      .set({ cid });
    alert(`Added account to chat ${cid}!`);
  }
};

export const devSetupEvent = async eid => {
  const eventRef = firestore()
    .collection("event")
    .doc(eid);
  const eventData = {
    allowedPeople: 3,
    eventName: "Come play basketball with us!",
    eventType: "basketball",
    isPublic: true,
    location: "NA Gym",
    startingTime: Date.now(),
    hostUid: "dev"
  };
  eventRef.set(eventData);
  await eventRef
    .collection("participants")
    .doc("dev")
    .set({ username: "dev", uid: "uid" });
  alert("Event data set!");
};

export const devAddToEvent = async (eid, uid) => {
  const eventRef = firestore()
    .collection("event")
    .doc(eid);
  const userRef = firestore()
    .collection("user_profile")
    .doc(uid);
  const eventDataSnap = await eventRef.get();
  const userDataSnap = await userRef.get();
  if (eventDataSnap.exists && userDataSnap.exists) {
    const { username, uid } = userDataSnap.data();
    await eventRef
      .collection("participants")
      .doc(uid)
      .set({ username, uid });
    await userRef
      .collection("events")
      .doc(eid)
      .set({ eid });
    alert(`Added account to event ${eid}!`);
  }
};
