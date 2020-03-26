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
      eventName: eventName.trim(),
      eventType: eventType.trim(),
      isPublic,
      location: location.trim(),
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
    const { cid } = await setupFirestoreForNewEventChat({
      eid: eventDataRef.id,
      eventName
    });
    eventDataRef.update({ cid, eid: eventDataRef.id });
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
        title: eventName,
        eid
      };
      const chatDataRef = await firestore()
        .collection("chat")
        .add(chatData);
      await chatDataRef.update({
        cid: chatDataRef.id
      });
      // automatically calls addParticipantToChat() to add current user
      await addParticipantToChat({ cid: chatDataRef.id, uid });
      return { cid: chatDataRef.id };
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
        .set({ cid, ...chatDataSnap.data() });
    }
  }
};

// adds participant to event provided event id, user id
// and status ("joined" or "interested")
// will check if event and user data exists
// automatically participant to chat (for now)
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
      const { cid } = eventDataSnap.data();
      await eventDataRef
        .collection("participants")
        .doc(uid)
        .set({ username, uid, status });
      await userDataRef
        .collection("events")
        .doc(eid)
        .set({ eid, status, ...eventDataSnap.data() });
      await addParticipantToChat({ cid, uid });
    }
  }
};

// sends friend request and writes friend data in sent_friend_request of user,
// writes user data in received_friend_request of target
// this now makes sure request is sent only once
export const sendFriendRequest = async ({ targetUid }) => {
  if (auth().currentUser && targetUid) {
    const { uid } = auth().currentUser;
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const targetDataRef = firestore()
      .collection("user_profile")
      .doc(targetUid);
    const userDataSnap = await userDataRef.get();
    const targetDataSnap = await targetDataRef.get();
    if (userDataSnap.exists && targetDataSnap.exists) {
      const friendRequestSnap = await userDataRef
        .collection("sent_friend_requests")
        .doc(targetUid)
        .get();
      if (!friendRequestSnap.exists) {
        const time = Date.now();
        {
          const { username, uid } = targetDataSnap.data();
          await userDataRef
            .collection("sent_friend_requests")
            .doc(targetUid)
            .set({ username, uid, time });
        }
        {
          const { username, uid } = userDataSnap.data();
          await targetDataRef
            .collection("received_friend_requests")
            .doc(uid)
            .set({ username, uid, time });
        }
      }
    }
  }
};

// accepts friend request and moves user data from request to friend_list
export const acceptFriendRequest = async ({ targetUid }) => {
  if (auth().currentUser && targetUid) {
    const { uid } = auth().currentUser;
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const targetDataRef = firestore()
      .collection("user_profile")
      .doc(targetUid);
    const userDataSnap = await userDataRef.get();
    const targetDataSnap = await targetDataRef.get();
    if (userDataSnap.exists && targetDataSnap.exists) {
      const time = Date.now();
      {
        const { username, uid } = targetDataSnap.data();
        const friendRequestRef = userDataRef
          .collection("received_friend_requests")
          .doc(targetUid);
        const friendRequestSnap = await friendRequestRef.get();
        if (friendRequestSnap.exists) {
          await friendRequestRef.delete();
          await userDataRef
            .collection("friend_list")
            .doc(targetUid)
            .set({ username, uid, time });
        }
      }
      {
        const { username, uid } = userDataSnap.data();
        const friendRequestRef = targetDataRef
          .collection("sent_friend_requests")
          .doc(uid);
        const friendRequestSnap = await friendRequestRef.get();
        if (friendRequestSnap.exists) {
          await friendRequestRef.delete();
          await targetDataRef
            .collection("friend_list")
            .doc(uid)
            .set({ username, uid, time });
        }
      }
    }
  }
};

// updates profile data given profileData
// only updates if profileData belongs to current user
// no verification on data types yet
export const updateProfileData = async ({ profileData }) => {
  if (
    auth().currentUser &&
    profileData &&
    profileData.uid === auth().currentUser.uid
  ) {
    const { uid } = auth().currentUser;
    const userDataRef = firestore()
      .collection("user_profile")
      .doc(uid);
    const userDataSnap = await userDataRef.get();
    if (userDataSnap.exists) {
      await userDataRef.update(profileData);
    }
  }
};
