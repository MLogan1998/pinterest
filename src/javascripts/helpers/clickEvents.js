import pins from '../components/displayPins/displayPins';
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

const clickEvents = () => {
  $('body').on('click', '.boardbtn', boardClick);
  $('body').on('click', '.fa-home', homeClick);
};

export default { clickEvents };
