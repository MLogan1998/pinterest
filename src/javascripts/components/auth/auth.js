import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signMeOut = (e) => {
  e.preventDefault();
  utils.clearDom('#pins');
  firebase.auth().signOut();
};

const authClicks = () => {
  $('#loginButton').click(signMeIn);
  $('#logoutButton').click(signMeOut);
};

export default { authClicks };
