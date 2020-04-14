const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.userRenameUpdater = functions.firestore
  .document("user_profile/{uid}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    const { uid, username } = newValue;
    if (username == previousValue.username) return null;

    const userDataRef = db.collection("user_profile").doc(uid);

    userDataRef
      .collection("chats")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          const { cid } = doc.data();
          const chatParticipantDataRef = db
            .collection("chat")
            .doc(cid)
            .collection("participants")
            .doc(uid);
          chatParticipantDataRef.update({ username });
        });
      });

    userDataRef
      .collection("events")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          const { eid } = doc.data();
          const eventParticipantDataRef = db
            .collection("event")
            .doc(eid)
            .collection("participants")
            .doc(uid);
          eventParticipantDataRef.update({ username });
        });
      });

    userDataRef
      .collection("friend_list")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          const targetUid = doc.data().uid;
          const targetUserDataRef = db
            .collection("user_profile")
            .doc(targetUid)
            .collection("friend_list")
            .doc(uid);
          targetUserDataRef.update({ username });
        });
      });

    userDataRef
      .collection("sent_friend_requests")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          const targetUid = doc.data().uid;
          const targetUserDataRef = db
            .collection("user_profile")
            .doc(targetUid)
            .collection("received_friend_requests")
            .doc(uid);
          targetUserDataRef.update({ username });
        });
      });

    userDataRef
      .collection("received_friend_requests")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          const targetUid = doc.data().uid;
          const targetUserDataRef = db
            .collection("user_profile")
            .doc(targetUid)
            .collection("sent_friend_requests")
            .doc(uid);
          targetUserDataRef.update({ username });
        });
      });
  });

exports.userSignupSetup = functions.auth.user().onCreate((user) => {
  if (user) {
    db.collection("user_profile").doc(uid).set({
      uid: user.uid,
      username: "Lil Potato",
      university: "",
      interested_sports: [],
      description: "",
    });
  }
});
