"use strict";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

// listens for username change and updates database accordingly
export const userRenameUpdater = functions.firestore
  .document("user_profile/{uid}")
  .onUpdate(async (change) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    if (newValue === undefined || previousValue === undefined) return;
    const { uid, username } = newValue;
    if (username === previousValue.username) return;

    const userDataRef = db.collection("user_profile").doc(uid);

    const userChatSnap = await userDataRef.collection("chats").get();
    userChatSnap.forEach(async (doc) => {
      const { cid } = doc.data();
      await db
        .collection("chat")
        .doc(cid)
        .collection("participants")
        .doc(uid)
        .update({ username });
    });

    const userEventsSnap = await userDataRef.collection("events").get();
    userEventsSnap.forEach(async (doc) => {
      const { eid } = doc.data();
      await db
        .collection("event")
        .doc(eid)
        .collection("participants")
        .doc(uid)
        .update({ username });
    });

    const userFriendSnap = await userDataRef.collection("friend_list").get();
    userFriendSnap.forEach(async (doc) => {
      const targetUid = doc.data().uid;
      await db
        .collection("user_profile")
        .doc(targetUid)
        .collection("friend_list")
        .doc(uid)
        .update({ username });
    });

    const userSentSnap = await userDataRef
      .collection("sent_friend_requests")
      .get();
    userSentSnap.forEach(async (doc) => {
      const targetUid = doc.data().uid;
      await db
        .collection("user_profile")
        .doc(targetUid)
        .collection("received_friend_requests")
        .doc(uid)
        .update({ username });
    });

    const userReceivedSnap = await userDataRef
      .collection("received_friend_requests")
      .get();
    userReceivedSnap.forEach(async (doc) => {
      const targetUid = doc.data().uid;
      await db
        .collection("user_profile")
        .doc(targetUid)
        .collection("sent_friend_requests")
        .doc(uid)
        .update({ username });
    });
  });

// sets up database for new user upon signup
export const userSignupSetup = functions.auth.user().onCreate(async (user) => {
  if (user) {
    const { uid } = user;
    await db.collection("user_profile").doc(uid).set({
      uid,
      username: "Lil Potato",
      university: "",
      interested_sports: [],
      description: "",
    });
  }
});

// deletes event. Takes care of event participants and chat dependencies
// calls deleteEventChat()
const deleteEvent = async (
  eventData: FirebaseFirestore.DocumentData | undefined
) => {
  if (eventData === undefined) return;
  const { eid } = eventData;
  // deletes event chat and all its messages/participants if type === event
  const deleteEventChat = async (
    chatData: FirebaseFirestore.DocumentData | undefined
  ) => {
    if (chatData === undefined) return;
    const { cid } = chatData;
    if (cid) {
      const chatDataRef = db.collection("chat").doc(cid);
      const chatDataSnap = (await chatDataRef.get()).data();
      if (chatDataSnap === undefined) return;
      if (chatDataSnap.type === "event") {
        // participants
        const chatParticipantRef = chatDataRef.collection("participants");
        const chatParticipantSnap = await chatParticipantRef.get();
        // delete participant docs and save data
        const participants: FirebaseFirestore.DocumentData[] = [];
        chatParticipantSnap.forEach(async (doc) => {
          participants.push(doc.data());
          await doc.ref.delete();
        });
        // delete chat data from participant profiles
        participants.forEach(async ({ uid }) => {
          const participantDataRef = db.collection("user_profile").doc(uid);
          await participantDataRef.collection("chats").doc(cid).delete();
        });
        // messages
        const chatMessageRef = chatDataRef.collection("messages");
        const chatMessageSnap = await chatMessageRef.get();
        // delete messages
        chatMessageSnap.forEach(async (doc) => {
          await doc.ref.delete();
        });
        // delete chat data
        await chatDataRef.delete();
      }
    }
  };

  if (eid) {
    const eventDataRef = db.collection("event").doc(eid);
    const eventDataSnap = await eventDataRef.get();
    // participants
    const eventParticipantRef = eventDataRef.collection("participants");
    const eventParticipantSnap = await eventParticipantRef.get();
    // delete participant docs and save data
    const participants: FirebaseFirestore.DocumentData[] = [];
    eventParticipantSnap.forEach(async (doc) => {
      participants.push(doc.data());
      await doc.ref.delete();
    });
    // delete event data from participant profiles
    participants.forEach(async ({ uid }) => {
      const participantDataRef = db.collection("user_profile").doc(uid);
      await participantDataRef.collection("events").doc(eid).delete();
    });
    // chat
    await deleteEventChat(eventDataSnap.data());
    // delete event data
    await eventDataRef.delete();
  }
};

// deletes event when triggered by updating eventData.deleted=true
export const onEventDelete = functions.firestore
  .document("event/{eid}")
  .onUpdate(async (change) => {
    const newValue = change.after.data();
    if (newValue === undefined) return;
    if (newValue.deleted === true) {
      await deleteEvent(newValue);
    }
  });
