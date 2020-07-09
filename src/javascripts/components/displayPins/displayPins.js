import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import './displayPins.scss';

const noPinData = (e) => {
  const board = e.target.id;
  const domString = `
    <div class ="home">
    <i class="fas fa-home fa-2x"></i>
    <h5 class="mt-2">Nothing to see here. Add a pin.</h5>
    <div id="pinButton">
    <button class="btn btn-danger mt-2 new-pin" data-board="${board}"><i class="fas fa-plus mr-1"></i>Create New Pin</button>
    </div>
    <div id="pinForm"></div>
    </div>
  `;
  utils.printToDom('#pins', domString);
};

const displayPins = (e) => {
  e.preventDefault();
  const selectedBoard = e.target.id;
  const currentUser = firebase.auth().currentUser.uid;
  let domString = '';
  pinData.pinByBoardId(selectedBoard)
    .then((pins) => {
      if (Array.isArray(pins) && pins.length > 0) {
        domString += `
        <div class ="home">
        <i class="fas fa-home fa-2x"></i>
        <div id="pinButton">
        <button class="btn btn-danger mt-2 new-pin" data-board="${selectedBoard}"><i class="fas fa-plus mr-1"></i>Create New Pin</button>
        </div>
        <div id="pinForm"></div>
        </div>
        <div class="pinContainer">`;
        pins.forEach((pin) => {
          domString += `
            <div class="card pinCard" style="width: 18rem;" id="${pin.id}">
            <img src="${pin.imgUrl}" class="card-img-top" alt="...">
            <h5 class="card-title">${pin.title}</h5>
            <div class="card-body pinBody">
            <button class="btn btn-danger moreInfo" type="button" data-toggle="collapse" data-target="#${pin.id}1" aria-expanded="false" aria-controls="${pin.id}1">More Info</button>
            `;
          if (currentUser === pin.userId) {
            domString += `
                <i id="${pin.boardId}" class="fas fa-trash-alt ml-3"></i>`;
          }
          domString += `
            </p>
            <div class="collapse" id="${pin.id}1">
            <div class="card card-body infoBody">
            <p class=pInfo>${pin.description}</p>
            </div>
            </div>
            </div>
            </div>`;
        });
        domString += '</div>';
        utils.printToDom('#pins', domString);
      } else {
        noPinData(e);
      }
    })
    .catch((err) => console.error('bork', err));
};

export default { displayPins };
