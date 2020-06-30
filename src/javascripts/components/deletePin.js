import pinData from '../helpers/data/pinData';
import displayPins from './displayPins/displayPins';

const deletePinEvent = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.card').id;
  pinData.deletePin(pinId)
    .then(() => {
      displayPins.displayPins(e);
    })
    .catch((err) => console.error('could not delete mushroom', err));
};

export default { deletePinEvent };
