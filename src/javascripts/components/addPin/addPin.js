import './addPin.scss';
import utils from '../../helpers/utils';

const pinForm = (e) => {
  e.preventDefault();
  const boardid = e.target.dataset.board;
  const domString = `
  <div class="formContainer">
  <form>
  <div class="form-group mb-1">
    <label for="pinTitle" class="mb-0 mt-2">Pin Title:</label>
    <input type="text" class="form-control" id="pinTitle" placeholder="Name Your Pin">
  </div>
  <div class="form-group mb-1">
    <label for="pinImage" class="mb-0 mt-1">Image Address:</label>
    <input type="text" class="form-control" id="pinImage" placeholder="Pin Image URL">
  </div>
  <div class="form-group">
    <label for="pinDescription" class="mb-0 mt-1">Pin Description:</label>
    <textarea class="form-control" id="pinDescription" rows="3"></textarea>
  </div>
  <button type="button" class="btn btn-danger add-pin-btn mt-0" data-boardId=${boardid}>Create!</button>
</form>
</div>
  `;
  utils.printToDom('#pinForm', domString);
};

export default { pinForm };
