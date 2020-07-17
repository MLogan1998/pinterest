import './displayBoards.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';

const noBoardData = () => {
  const getUserName = firebase.auth().currentUser.displayName;
  const domString = `
        <div class="headContainer">
        <h2 class=userHeader><span class="welcome">Welcome,</span> ${getUserName}!</h2>
        <h5>Nothing to see here. Add a board.</h5>
        </div>`;
  utils.printToDom('#boards', domString);
};

const displayBoards = () => {
  const admin = 'ghzu6oLncNReiCyFVjZVfBjIdbs1';
  const currentUser = firebase.auth().currentUser.uid;
  const getUserName = firebase.auth().currentUser.displayName;
  boardData.getBoards()
    .then((boards) => {
      if (Array.isArray(boards) && boards.length > 0) {
        let domString = `
        <div class="headContainer">
        <h2 class=userHeader><span class="welcome">Welcome,</span> ${getUserName}!</h2>
        <h5>Browse Boards</h5>
        </div>
        <div class="boardContainer">
      `;
        boards.forEach((board) => {
          domString += `
          <div class="card m-1">
          <h5 class="card-header boardName">${board.title}</h5>
          <div class="card-body">
          <div class="boardButton">
          <button type="button" id="${board.id}" class="btn btn-danger boardbtn mr-3" data-boardName="${board.title}">Show Pins</button>`;
          if (currentUser === board.uid || currentUser === admin) {
            domString += '<i class="fas fa-trash"></i>';
          }
          domString += `
          </div>
          </div>
          </div>`;
        });
        domString += `
          <div class="card m-1">
          <h5 class="card-header boardName">New Board</h5>
          <div class="card-body">
          <div class="boardButton">
          <i class="far fa-plus-square fa-2x newBoardBtn" data-toggle="modal" data-target="#addBoardModal"></i>
          </div>
          </div>
          </div>
        </div>`;
        utils.printToDom('#boards', domString);
      } else {
        noBoardData();
      }
    })
    .catch((err) => console.error('bork', err));
};

export default { displayBoards };
