// import { db, firebaseAuth } from '../config/constants';

// export function auth(email, pw) {
//   return firebaseAuth()
//     .createUserWithEmailAndPassword(email, pw)
//     .then(saveUser);
// }

// export function logout() {
//   return firebaseAuth().signOut();
// }

// export function login(email, pw) {
//   return firebaseAuth().signInWithEmailAndPassword(email, pw);
// }

// export function resetPassword(email) {
//   return firebaseAuth().sendPasswordResetEmail(email);
// }

// export function saveUser(user) {
//   return db
//     .collection(`users`)
//     .add({
//       email: user.email,
//       uid: user.uid
//     })
//     .then(docRef => docRef)
//     .catch(function(error) {
//       console.error('Error adding document: ', error);
//     });
// }

function tip() {
  // alert("To fill out the form/s online, in Google Drive - click 'Open with' and selected 'DocHub' at the top middle of the page. Thank you!")
}

export default tip;
