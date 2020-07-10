import './movePin.scss';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const movePinModal = () => {
  let domString = `
        <div class="modal fade" id="movePinModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-body">
        Move This Pin To:
        <select id="selectBoard" class="custom-select">`;
  boardData.getBoards()
    .then((boards) => {
      boards.forEach((board) => {
        domString += `
          <option value="${board.title}" data-board="${board.id}">${board.title}</option>
  </div>`;
      });
      domString += `
        </select>
        <button class="btn btn-danger mt-2 selectTheBoard">Move!</button>
        </div>
        </div>
      `;
      utils.printToDom('#pinModal', domString);
    })
    .catch((err) => err);
};

const movePin = () => {
  const selectedBoard = $('#selectBoard').val();
  const selectedBoardData = $('#selectBoard').find(':selected').data('board');
  console.error('val', selectedBoard);
  console.error('data', selectedBoardData);
};

export default { movePinModal, movePin };
