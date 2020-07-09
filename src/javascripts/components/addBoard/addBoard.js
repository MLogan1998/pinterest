import './addBoard.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../helpers/data/boardData';
import displayBoards from '../displayBoards/displayBoards';
import utils from '../../helpers/utils';

const addBoardModal = () => {
  const domString = `<div class="modal fade" id="addBoardModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close mb-1" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
          <label for="form-control form-control-sm class="newBoardLabel">Enter New Board Name:</label>
          <input class="form-control form-control-sm newBoardName" type="text" value="Board Name" required>
          <button type="button" class="btn btn-danger add-brd-btn mt-2" data-dismiss="modal">Create!</button>
        </div>
      </div>
    </div>`;
  utils.printToDom('#modal', domString);
};

const createNewBoard = () => {
  const newBoardObj = {
    title: $('.newBoardName').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boards.addNewBoard(newBoardObj)
    .then(() => displayBoards.displayBoards())
    .catch((err) => err);
};

export default { addBoardModal, createNewBoard };
