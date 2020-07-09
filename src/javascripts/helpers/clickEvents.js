import pins from '../components/displayPins/displayPins';
import deletePin from '../components/deletePin';
import deleteBoard from '../components/deleteBoard';
import utils from './utils';
import displayBoards from '../components/displayBoards/displayBoards';
import boardModal from '../components/addBoard/addBoard';
import pinForm from '../components/addPin/addPin';

const boardClick = (e) => {
  pins.displayPins(e);
  $('#pins').removeClass('hide');
  $('#boards').addClass('hide');
};

const homeClick = () => {
  utils.clearDom('#pins');
  $('#pins').addClass('hide');
  $('#boards').removeClass('hide');
};

const infoClick = (e) => {
  const btn = e.target;
  if (btn.innerHTML === 'More Info') {
    btn.innerHTML = 'Show Less';
  } else {
    btn.innerHTML = 'More Info';
  }
};

const deletePinClick = (e) => {
  deletePin.deletePinEvent(e);
};

const deleteBoardClick = (e) => {
  deleteBoard.deleteBoard(e)
    .then(() => {
      displayBoards.displayBoards();
    })
    .catch((err) => err);
};

const newBoardClick = () => {
  boardModal.addBoardModal();
};

const addBoardClick = () => {
  boardModal.createNewBoard();
};

const newPinClick = (e) => {
  pinForm.pinForm(e);
};

const clickEvents = () => {
  $('body').on('click', '.boardbtn', boardClick);
  $('body').on('click', '.fa-home', homeClick);
  $('body').on('click', '.moreInfo', infoClick);
  $('body').on('click', '.fa-trash-alt', deletePinClick);
  $('body').on('click', '.fa-trash', deleteBoardClick);
  $('body').on('click', '.newBoardBtn', newBoardClick);
  $('body').on('click', '.add-brd-btn', addBoardClick);
  $('body').on('click', '.new-pin', newPinClick);
};

export default { clickEvents };
