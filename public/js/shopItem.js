/* jshint esversion: 8 */

// This module contains js code for the functionality of the shop items on the shop page.

//Export a function that checks whether a text box element is vertically overflown.

export const checkIfOverflown = (element) => {

  // Check if the provided element is overflown.

  if (element.scrollHeight > element.clientHeight) {

    // Get the index number from the end of its id attribute.

    const index = element.id.slice(7);

    // Use this id number to get a corresponding link button on the page.

    const linkBtn = document.getElementById("linkBtn" + index);

    // display this link button by removing the "delete" class from its classlist

    linkBtn.classList.remove("delete");
  }
};


// Export a function for showing the overflown contents of an item on the shop page.


export const showContents = () => {

  // Get the index number from the end of the id attribute of the event target.

  const index = event.target.id.slice(7);

  // Get the corresponding text box element using this obtained number.

  const textBox = document.getElementById("textBox" + index);

  // Check if this text-box has a class of "low-fixed-height" (Then some of the text is hidden).

  if (textBox.classList.contains("low-fixed-height")) {

    // Remove this class.

    textBox.classList.remove("low-fixed-height");

    // Add the class "high-fixed-height".

    textBox.classList.add("high-fixed-height");

    // Check if the url of the has the string "pood" in it (which means that the current page is in Estonian).

    if (window.location.href.indexOf("pood") !== -1) {

      // Change the innerHTML of the button that triggered the event (so that it says "Näita vähem").

      event.target.innerHTML = "Näita vähem...";

      // Else the page is in English:

    } else {

      // Change the innerHTML of the button that triggered the event (so that it says "Show less").

      event.target.innerHTML = "Show less...";
    }

    // Check if the text box element has a class of "high-fixed-height" (Then the text box element is enlarged).

  } else if (textBox.classList.contains("high-fixed-height")) {

    // Remove this class.

    textBox.classList.remove("high-fixed-height");

    // Add the class "low-fixed-height".

    textBox.classList.add("low-fixed-height");

    // Again check if the current page is in Estonian.

    if (window.location.href.indexOf("pood")) {

      // Change the innerHTML of the button that triggered the event back to what it originally was.

      event.target.innerHTML = "Loe edasi...";

      // Else the page is in English.

    } else {

      // Change the innerHTML of the button that triggered the event back to what it originally was.

      event.target.innerHTML = "Read more...";
    }

  }
};
