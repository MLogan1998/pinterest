import './displayBoards.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardClicks from '../displayPins/displayPins';

const displayBoards = () => {
  const getUserName = firebase.auth().currentUser.displayName;
  boardData.getBoards()
    .then((boards) => {
      let domString = `
        <h2 class=userHeader><span class="welcome">Welcome,</span> ${getUserName}!</h2>
        <div class="boardContainer">
      `;
      boards.forEach((board) => {
        domString += `
          <div class="boardButton">
          <button type="button" id="${board.title}" class="btn btn-danger boardbtn">${board.title}</button>
          </div>`;
      });
      domString += '</div>';
      utils.printToDom('#boards', domString);
      boardClicks.boardClicks();
    })
    .catch((err) => console.error('bork', err));
};

export default { displayBoards };
