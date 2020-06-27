import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/displayBoards/displayBoards';

const loginButton = $('#loginButton');
const logoutButton = $('#logoutButton');
const boardsDiv = $('#boards');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      boardsDiv.removeClass('hide');
      boards.displayBoards();
    } else {
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      boardsDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
