const printToDom = (selector, text) => {
  $(selector).html(text);
};

const clearDom = (selector) => {
  const domString = '';
  printToDom(selector, domString);
};

export default { printToDom, clearDom };
