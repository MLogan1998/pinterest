// import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import './displayPins.scss';

const displayPins = (e) => {
  e.preventDefault();
  const selectedBoard = e.target.id;
  let domString = '';
  pinData.getPins()
    .then((pins) => {
      domString += `
        <div class ="home">
        <i class="fas fa-home fa-2x"></i>
        </div>
        <div class="pinContainer">`;
      pins.forEach((pin) => {
        if (pin.boardId === selectedBoard) {
          domString += `
            <div class="card" style="width: 18rem;">
            <img src="${pin.imgUrl}" class="card-img-top" alt="...">
            <h5 class="card-title">${pin.title}</h5>
            <div class="card-body">
            <p class="card-text">${pin.description}</p>
            </div>
            </div>`;
        }
      });
      domString += '</div>';
      utils.printToDom('#pins', domString);
    })
    .catch((err) => console.error('bork', err));
};

export default { displayPins };
