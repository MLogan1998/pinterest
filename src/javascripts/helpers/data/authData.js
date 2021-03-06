import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/displayBoards/displayBoards';

const loginButton = $('#loginButton');
const logoutButton = $('#logoutButton');
const boardsDiv = $('#boards');
const pinsDiv = $('#pins');
const welcomeDiv = $('#welcome');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      welcomeDiv.addClass('hide');
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      boardsDiv.removeClass('hide');
      pinsDiv.removeClass('hide');
      boards.displayBoards();
    } else {
      welcomeDiv.removeClass('hide');
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      boardsDiv.addClass('hide');
      pinsDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
