/* eslint-disable max-len */
import './welcome.scss';
import utils from '../../helpers/utils';

const welcomeMessage = () => {
  const domString = `
    <div class="welcomeContainer">
    <h2 class="welcome">Hello!</h2>
    <div class="message">
    <p class="welcomeMessage">Thank you for visiting my project. The project is inspired by Pinterest, and created as part of my curriculum at Nashville Software School. Please log in and look around. You will need to create a board and pins to access CRUD features as users can only edit and delete their own entries. <a href="mailto:mlogan5212@gmail.com">Contact me</a> with any questions and checkout my <a href="https://logandevelopment.io" target="_new">portfolio</a>! Have a great day.</div>
    <div>
    </div>
  `;
  utils.printToDom('#welcome', domString);
};

export default { welcomeMessage };
