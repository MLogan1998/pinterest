import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import './displayPins.scss';

const displayPins = (e) => {
  e.preventDefault();
  const selectedBoard = e.target.id;
  const currentUser = firebase.auth().currentUser.uid;
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
            <button class="btn btn-danger moreInfo" type="button" data-toggle="collapse" data-target="#${pin.id}" aria-expanded="false" aria-controls="${pin.id}">
            More Info
            </button>
            </p>
            <div class="collapse" id="${pin.id}">
            <div class="card card-body">
            <p class=pInfo>${pin.description}</p>
            </div>`;
          if (currentUser === pin.userId) {
            domString += `
            <div>
            <i class="fas fa-trash-alt fa-lg"></i>
            </div>`;
          }
          domString += `
            </div>
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
