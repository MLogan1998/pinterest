import firebase from 'firebase/app';
import 'firebase/auth';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signMeOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
};

const authClicks = () => {
  $('#loginButton').click(signMeIn);
  $('#logoutButton').click(signMeOut);
};

export default { authClicks };
