import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseConfig.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/pins.json`)
    .then((response) => {
      const pinObjects = response.data;
      const pins = [];
      if (pinObjects) {
        Object.keys(pinObjects).forEach((pinId) => {
          pinObjects[pinId].id = pinId;
          pins.push(pinObjects[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseURL}/pins/${pinId}.json`);

const pinByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const pinObj = response.data;
      const pins = [];
      if (pinObj) {
        Object.keys(pinObj).forEach((pinId) => {
          pinObj[pinId].id = pinId;
          pins.push(pinObj[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deleteBoardPin = (pinId) => axios.delete(`${baseURL}/pins/${pinId}.json`);

const addNewPin = (newPinObj) => axios.post(`${baseURL}/pins.json`, newPinObj);

const updatePin = (pinId, updatedPin) => axios.put(`${baseURL}/pins/${pinId}.json`, updatedPin);

export default {
  getPins,
  deletePin,
  pinByBoardId,
  deleteBoardPin,
  addNewPin,
  updatePin,
};
