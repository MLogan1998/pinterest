const displayPins = (e) => {
  e.preventDefault();
  console.error(e.target.id);
};

const boardClicks = () => {
  $('.boardbtn').click(displayPins);
};

export default { boardClicks };
