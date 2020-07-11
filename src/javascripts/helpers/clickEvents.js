import pins from '../components/displayPins/displayPins';
import deletePin from '../components/deletePin';
import deleteBoard from '../components/deleteBoard';
import utils from './utils';
import displayBoards from '../components/displayBoards/displayBoards';
import boardModal from '../components/addBoard/addBoard';
import pinForm from '../components/addPin/addPin';
import pinModal from '../components/movePin/movePin';

const boardClick = (e) => {
  pins.displayPinsEvent(e);
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
  utils.clearDom('#pinButton');
};

const movePinClick = (e) => {
  $('.card-footer').removeClass('hide');
  $('.moreInfo').addClass('hide');
  $('.movePin').addClass('hide');
  $('.fa-trash-alt').addClass('hide');
  pinModal.movePinModal(e);
};

const movePin = (e) => {
  pinModal.movePin2(e);
};

const closeSelect = () => {
  $('.card-footer').addClass('hide');
  $('.moreInfo').removeClass('hide');
  $('.movePin').removeClass('hide');
  $('.fa-trash-alt').removeClass('hide');
};

const clickEvents = () => {
  $('body').on('click', '.boardbtn', boardClick);
  $('body').on('click', '.fa-home', homeClick);
  $('body').on('click', '.moreInfo', infoClick);
  $('body').on('click', '.fa-trash-alt', deletePinClick);
  $('body').on('click', '.fa-trash', deleteBoardClick);
  $('body').on('click', '.newBoardBtn', newBoardClick);
  $('body').on('click', '.add-brd-btn', addBoardClick);
  $('body').on('click', '.movePin', movePinClick);
  $('body').on('click', '.selectTheBoard', movePin);
  $('body').on('click', '.new-pin', newPinClick);
  $('body').on('click', '.fa-window-close', closeSelect);
};

export default { clickEvents };
