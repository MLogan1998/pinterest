import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import './addPin.scss';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import displayPins from '../displayPins/displayPins';

const addPin = (e) => {
  e.preventDefault();
  const file = $('#pin-image')[0].files[0];
  const image = file.name;
  const ref = firebase.storage().ref(`pins/${image}`);
  const newPinObj = {
    userId: firebase.auth().currentUser.uid,
    title: $('#pinTitle').val(),
    description: $('#pinDescription').val(),
    imgUrl: '',
    boardId: e.target.childNodes[7].children[0].dataset.boardid,
  };
  ref.put(file).then(() => {
    ref.getDownloadURL().then((url) => {
      newPinObj.imgUrl = url;
      pinData.addNewPin(newPinObj)
        .then(() => displayPins.displayPins(newPinObj.boardId));
    });
  })
    .catch((err) => err);
  utils.clearDom('#pinForm');
};

function imageInputWatcher() {
  $('#pin-image-label').html(this.files[0].name);
}

$('body').on('change', '#pin-image', imageInputWatcher);

const pinForm = (e) => {
  e.preventDefault();
  const boardid = e.target.dataset.board;
  const domString = `
  <div class="formContainer">
  <div class="closeForm">
  <i class="fas fa-window-close closeForm mb-1"></i>
  </div>
  <form id="pinSubmit">
  <div class="form-group mb-1">
    <label for="pinTitle" class="mb-2 mt-2">Pin Title:</label>
    <input type="text" class="form-control" id="pinTitle" placeholder="Name Your Pin" required>
  </div>
  <div class="custom-file">
  <input type="file" class="custom-file-input" id="pin-image">
  <label class="custom-file-label" for="pin-image" id="pin-image-label">Choose file</label>
</div>
  <div class="form-group">
    <label for="pinDescription" class="mb-0 mt-2">Pin Description:</label>
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

export default { pinForm, imageInputWatcher };
