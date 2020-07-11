import firebase from 'firebase/app';
import 'firebase/auth';

import './movePin.scss';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';
import displayPins from '../displayPins/displayPins';

const movePinModal = (e) => {
  const currentUser = firebase.auth().currentUser.uid;
  const admin = 'ghzu6oLncNReiCyFVjZVfBjIdbs1';
  const pinId = e.target.closest('.card').id;
  let domString = `
    <div class="moveIt">
    <div class="closeSelect">
    <i class="fas fa-window-close closeDropdown mb-1"></i>
    </div>
    <h6>Move Pin To:</h6>
    <select id="selectBoard" class="custom-select">`;
  boardData.getBoards()
    .then((boards) => {
      boards.forEach((board) => {
        if (currentUser === board.uid || currentUser === admin) {
          domString += `<option value="${board.title}" data-board="${board.id}">${board.title}</option>`;
        }
      });
      domString += `
        </select>
        <button class="btn btn-danger mt-2 selectTheBoard">Move!</button>
      `;
      utils.printToDom(`#${pinId}dropDown`, domString);
    })
    .catch((err) => err);
};

const movePin2 = (e) => {
  const selectedBoard = $('.new-pin').data('board');
  const pinId = e.target.closest('.card').id;
  pinData.getPins()
    .then((pins) => {
      const pinById = pins.find((singlePin) => singlePin.id === pinId);
      const editedShroom = {
        title: pinById.title,
        userId: pinById.userId,
        description: pinById.description,
        imgUrl: pinById.imgUrl,
        boardId: $('#selectBoard').find(':selected').data('board'),
      };
      pinData.updatePin(pinId, editedShroom)
        .then(() => displayPins.displayPins(selectedBoard));
    })
    .catch((err) => (err));
};

export default { movePinModal, movePin2 };
