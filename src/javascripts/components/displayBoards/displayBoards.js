import './displayBoards.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';

const displayBoards = () => {
  const getUserName = firebase.auth().currentUser.displayName;
  boardData.getBoards()
    .then((boards) => {
      let domString = `
        <div class="headContainer">
        <h2 class=userHeader><span class="welcome">Welcome,</span> ${getUserName}!</h2>
        <h5>Browse Boards</h5>
        </div>
        <div class="boardContainer">
      `;
      boards.forEach((board) => {
        domString += `
          <div class="card mr-2">
          <h5 class="card-header boardName">${board.title}</h5>
          <div class="card-body">
          <div class="boardButton">
          <button type="button" id="${board.id}" class="btn btn-danger boardbtn mr-3">Show Pins</button>
          <i class="fas fa-trash"></i>
          </div>
          </div>
          </div>`;
      });
      domString += '</div>';
      utils.printToDom('#boards', domString);
    })
    .catch((err) => console.error('bork', err));
};

export default { displayBoards };
