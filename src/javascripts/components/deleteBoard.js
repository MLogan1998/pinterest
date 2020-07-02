import boardData from '../helpers/data/boardData';
import pinData from '../helpers/data/pinData';

const deleteBoard = (e) => new Promise((resolve, reject) => {
  const boardId = e.target.parentNode.childNodes[1].id;
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.pinByBoardId(boardId).then((boardpins) => {
        boardpins.forEach((pin) => {
          pinData.deleteBoardPin(pin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

export default { deleteBoard };
