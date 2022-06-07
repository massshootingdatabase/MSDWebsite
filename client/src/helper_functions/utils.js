//utility functions

exports.generateText = (url, title) => {
    // Returns output text
    return `${title}, ${url}`;
  };
  
  exports.createElement = (type, text, className) => {
    // Creates a new HTML element and returns it
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.textContent = text;
    return newElement;
  };
  
  exports.validateInput = (text, notEmpty, isNumber) => {
    // Validate user input with two pre-defined rules
    if (!text) {
      return false;
    }
    if (notEmpty && text.trim().length === 0) {
      return false;
    }
    if (isNumber && +text === NaN) {
      return false;
    }
    return true;
  };