import pins from '../components/displayPins/displayPins';
import deletePin from '../components/deletePin';
// import boards from '../components/displayBoards/displayBoards';
import utils from './utils';

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

const deleteClick = (e) => {
  deletePin.deletePinEvent(e);
};

const clickEvents = () => {
  $('body').on('click', '.boardbtn', boardClick);
  $('body').on('click', '.fa-home', homeClick);
  $('body').on('click', '.moreInfo', infoClick);
  $('body').on('click', '.fa-trash-alt', deleteClick);
};

export default { clickEvents };
