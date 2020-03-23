import { firestore, auth } from "firebase";

// sets up database for new account
// should be called upon login, and when user data does not exist
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

// sets up database for new event given event data
// it will then automatically add current user to the event
// by calling addParticipantToEvent() with status "joined"
// it will also automatically create event chat
// by calling setupFirestoreForNewEventChat()
export const setupFirestoreForNewEvent = async ({
  allowedPeople,
  eventName,
  eventType,
  isPublic,
  location,
  startingTime
}) => {
  if (
    auth().currentUser &&
    allowedPeople &&
    eventName &&
    eventType &&
    isPublic &&
    location &&
    startingTime
  ) {
    const { uid } = auth().currentUser;
    const eventRef = firestore().collection("event");
    const eventData = {
      allowedPeople,
      eventName,
      eventType,
      isPublic,
      location,
      startingTime,
      hostUid: uid
    };
    const eventDataRef = await eventRef.add(eventData);
    // automatically calls addParticipantToEvent() with status "joined"
    await addParticipantToEvent({
      eid: eventDataRef.id,
      uid,
      status: "joined"
    });
    // automatically calls setupFirestoreForNewEventChat()
    await setupFirestoreForNewEventChat({ eid: eventDataRef.id, eventName });
  }
};

// sets up database for new event chat given event data
// it will then automatically add current user to the event chat
// by calling addParticipantToChat()
export const setupFirestoreForNewEventChat = async ({ eid, eventName }) => {
  if (auth().currentUser && eid && eventName) {
    const { uid } = auth().currentUser;
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const userDataSnap = await userDataRef.get();
    if (userDataSnap.exists) {
      const chatData = {
        type: "event",
        icon: "fab fa-dev",
        title: eventName
      };
      const chatDataRef = await firestore()
        .collection("chat")
        .add(chatData);
      await chatDataRef.update({
        cid: chatDataRef.id
      });
      // automatically calls addParticipantToChat() to add current user
      await addParticipantToChat({ cid: chatDataRef.id, uid });
    }
  }
};

// adds participant to chat provided chat id and user id
// will check if chat and user data exists
export const addParticipantToChat = async ({ cid, uid }) => {
  if (auth().currentUser && cid && uid) {
    const chatDataRef = firestore()
      .collection("chat")
      .doc(cid);
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const chatDataSnap = await chatDataRef.get();
    const userDataSnap = await userDataRef.get();
    if (chatDataSnap.exists && userDataSnap.exists) {
      const { username, uid } = userDataSnap.data();
      await chatDataRef
        .collection("participants")
        .doc(uid)
        .set({ username, uid });
      await userDataRef
        .collection("chats")
        .doc(cid)
        .set({ cid });
    }
  }
};

// adds participant to event provided event id, user id
// and status ("joined" or "interested")
// will check if event and user data exists
export const addParticipantToEvent = async ({ eid, uid, status }) => {
  if (auth().currentUser && eid && uid && status) {
    const eventDataRef = firestore()
      .collection("event")
      .doc(eid);
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const eventDataSnap = await eventDataRef.get();
    const userDataSnap = await userDataRef.get();
    if (eventDataSnap.exists && userDataSnap.exists) {
      const { username, uid } = userDataSnap.data();
      await eventDataRef
        .collection("participants")
        .doc(uid)
        .set({ username, uid, status });
      await userDataRef
        .collection("events")
        .doc(eid)
        .set({ eid, status });
    }
  }
};
