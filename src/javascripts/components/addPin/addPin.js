import firebase from 'firebase/app';
import 'firebase/auth';
import './addPin.scss';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import displayPins from '../displayPins/displayPins';

const addPin = (e) => {
  const newPinObj = {
    userId: firebase.auth().currentUser.uid,
    title: $('#pinTitle').val(),
    description: $('#pinDescription').val(),
    imgUrl: $('#pinImage').val(),
    boardId: e.target.childNodes[7].children[0].dataset.boardid,
  };
  pinData.addNewPin(newPinObj)
    .then(() => displayPins.displayPins(newPinObj.boardId))
    .catch((err) => err);
  utils.clearDom('#pinForm');
};

const pinForm = (e) => {
  e.preventDefault();
  const boardid = e.target.dataset.board;
  const domString = `
  <div class="formContainer">
  <form id="pinSubmit">
  <div class="form-group mb-1">
    <label for="pinTitle" class="mb-0 mt-2">Pin Title:</label>
    <input type="text" class="form-control" id="pinTitle" placeholder="Name Your Pin" required>
  </div>
  <div class="form-group mb-1">
    <label for="pinImage" class="mb-0 mt-1">Image Address:</label>
    <input type="text" class="form-control" id="pinImage" placeholder="Pin Image URL" required>
  </div>
  <div class="form-group">
    <label for="pinDescription" class="mb-0 mt-1">Pin Description:</label>
    <textarea class="form-control" id="pinDescription" rows="3" required></textarea>
  </div>
  <div class="addbtn">
  <button type="submit" class="btn btn-danger add-pin-btn mt-0" data-boardId=${boardid}>Create!</button>
  </div>
</form>
</div>
  `;
  utils.printToDom('#pinForm', domString);
  $('#pinSubmit').on('submit', addPin);
};

export default { pinForm };
