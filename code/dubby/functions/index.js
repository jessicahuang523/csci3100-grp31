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

exports.chatParticipantRename = functions.firestore
  .document("user_profile/{uid}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    const { uid, username } = newValue;
    if (username == previousValue.username) return null;
    const userChatCollectionRef = db
      .collection("user_profile")
      .doc(uid)
      .collection("chats");
    userChatCollectionRef.get().then(function (snap) {
      snap.forEach(function (doc) {
        const { cid } = doc.data();
        const chatParticipantDataRef = db
          .collection("chat")
          .doc(cid)
          .collection("participants")
          .doc(uid);
        chatParticipantDataRef.update({ uid, username });
      });
    });
  });
