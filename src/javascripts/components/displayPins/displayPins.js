import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import './displayPins.scss';
import boardData from '../../helpers/data/boardData';

const noPinData = (board) => {
  const boardId = board;
  let domString = '';
  boardData.getBoards()
    .then((boards) => {
      boards.forEach((oneboard) => {
        if (oneboard.id === boardId) {
          domString += `
          <div class ="home">
          <i class="fas fa-home fa-2x"></i>
          <h2 class="welcome mt-1 mb-3">${oneboard.title}</h2>
          <h5 class="mt-2">Nothing to see here. Add a pin.</h5>
          <div id="pinButton">
          <button class="btn btn-danger mt-2 new-pin" data-board="${board}"><i class="fas fa-plus mr-1"></i>Create New Pin</button>
          </div>
          <div id="pinForm"></div>
          </div>
        `;
        }
      });
      utils.printToDom('#pins', domString);
    })
    .catch((err) => err);
};

const displayPins = (selectedBoard) => {
  const admin = 'ghzu6oLncNReiCyFVjZVfBjIdbs1';
  const currentUser = firebase.auth().currentUser.uid;
  let domString = '';
  boardData.getBoards()
    .then((boards) => {
      boards.forEach((oneboard) => {
        if (oneboard.id === selectedBoard) {
          console.error(`selectedBoard: ${selectedBoard} $ oneboard.id: ${oneboard.id}`);
          domString += `
        <div class ="home">
        <i class="fas fa-home fa-2x"></i>
        <h2 class="welcome mt-1 mb-3">${oneboard.title}</h2>
        <div id="pinButton">
        <button class="btn btn-danger mt-2 new-pin" data-board="${selectedBoard}"><i class="fas fa-plus mr-1"></i>Create New Pin</button>
        </div>
        <div id="pinForm"></div>
        </div>
      `;
        }
      });
    });
  pinData.pinByBoardId(selectedBoard)
    .then((pins) => {
      if (Array.isArray(pins) && pins.length > 0) {
        domString += `
        <div class="pinContainer">`;
        pins.forEach((pin) => {
          domString += `
            <div class="card pinCard" style="width: 18rem;" id="${pin.id}">
            <img src="${pin.imgUrl}" class="card-img-top" alt="${pin.title}">
            <h5 class="card-title">${pin.title}</h5>
            <div class="card-footer bg-transparent" id="${pin.id}dropDown"></div>
            <div class="card-body pinBody">
            <button class="btn btn-danger moreInfo" type="button" data-toggle="collapse" data-target="#${pin.id}1" aria-expanded="false" aria-controls="${pin.id}1">More Info</button>
            `;
          if (currentUser === pin.userId || currentUser === admin) {
            domString += `
              <i class="fas fa-arrow-circle-right ml-3 movePin" data-board="${pin.boardId}"></i>
              <i id="${pin.boardId}" class="fas fa-trash-alt ml-3"></i>`;
          }
          domString += `
            </p>
            <div class="collapse" id="${pin.id}1">
            <div class="card card-body infoBody">
            <p class=pInfo>${pin.description}</p>
            </div>
            </div>
            </div>
            </div>`;
        });
        domString += '</div>';
        utils.printToDom('#pins', domString);
      } else {
        noPinData(selectedBoard);
      }
    })
    .catch((err) => console.error('bork', err));
};

const displayPinsEvent = (e) => {
  const selectedBoard = e.target.id;
  displayPins(selectedBoard);
};

export default { displayPins, displayPinsEvent };
