/* jshint esversion: 8 */

// This module exports a function, which runs whatever code needs to be executed when a shop page is loaded.

// Import dependencies.

// checkIfOverFlown!!!
// showContents!!!
// redirectToCustom!!!


// Export the function.

export const onShopLoad = () => {

  // Get the DOM elements necessary for the code to run.

  const textBoxArray = document.querySelectorAll(".textBox");
  const linkBtnArray = document.querySelectorAll(".linkBtn");
  const orderBtnArray = document.querySelectorAll(".orderBtn");

  // When the shop page loads, loop through the array of text box elements to check if any are overflown.

    for (let i = 0; i < textBoxArray.length; i++) {
      checkIfOverflown(textBoxArray[i]);
    }

  // Do the same thing whenever the browser viewport size changes.

  window.addEventListener("resize", function(event) {
    for (let i = 0; i < textBoxArray.length; i++) {
      checkIfOverflown(textBoxArray[i]);
    }
  });

  // Listen for clicks and touches on all the "show more" buttons.

  for (let i = 0; i < linkBtnArray.length; i++) {
    linkBtnArray[i].addEventListener("click", showContents);
    linkBtnArray[i].addEventListener("touchend", showContents);
  }

  // Listen for clicks and touches on all the "order" buttons.

  for (let i = 0; i < orderBtnArray.length; i++) {
    orderBtnArray[i].addEventListener("click", redirectToCustom);
    orderBtnArray[i].addEventListener("touchend", redirectToCustom);
  }
};
