import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import clicks from './helpers/clickEvents';
import welcome from './components/welcome/welcome';

import '../styles/main.scss';
import 'bootstrap';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.authClicks();
  welcome.welcomeMessage();
  clicks.clickEvents();
};

init();
