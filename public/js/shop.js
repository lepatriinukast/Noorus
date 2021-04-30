/* jshint esversion: 8 */

// This module contains js code that runs on the shop page.


// Export a function that checks if an element is overflown.

export const checkOverflow = (element) => {

  return element.clientHeight < element.scrollHeight;
};


// Export a function that displays a link button on the shop page.

export const displayLinkBtn = (element) => {

  // Using the id of the provided container element, get the corresponding link button.

  const linkBtn = document.getElementById("linkBtn" + element.id.slice(7));

  // Display the link button by removing an utility class.

  linkBtn.classList.remove("delete");
};


// Export a function which deletes a link button from the shop page.

export const deleteLinkBtn = (element) => {

  // Using the id of the provided container element, get the corresponding link button.

  const linkBtn = document.getElementById("linkBtn" + element.id.slice(7));

  // Delete the link button from the page by adding a utility class.

  linkBtn.classList.add("delete");
};


// Export a function which display or hides content that has overflown the text-box on the shop page.

export const toggleContent = (event) => {

  // Using the id of the provided link button, get the corresponding text box element.

  const textBox = document.getElementById("textBox" + event.target.id.slice(7));

  // Depending on the inner HTML of the provided link button,
  // show or hide extra content and change the button text accordingly.

  var btnText;

  switch (event.target.innerHTML) {

    case "Loe edasi...":

      btnText = "Näita vähem";
      textBox.classList.remove("low-fixed-height");
      textBox.classList.add("high-fixed-height");

      break;
    case "Read more...":

      btnText = "Show less";
      textBox.classList.remove("low-fixed-height");
      textBox.classList.add("high-fixed-height");

      break;
    case "Näita vähem":

      btnText = "Loe edasi...";
      textBox.classList.remove("high-fixed-height");
      textBox.classList.add("low-fixed-height");

      break;
    case "Show less":

      btnText = "Read more...";
      textBox.classList.remove("high-fixed-height");
      textBox.classList.add("low-fixed-height");

      break;
    default:

      console.log(element.innerHTML);
  }

  // Display the changed button text.

  event.target.innerHTML = btnText;
};


// Export a function which redirects the user to the order page, with a proper query string in the url.

export const redirectToCustom = (event) => {

  // Prevent the default action from happening on the button click.

  event.preventDefault();

  // Get the index number of the selected shop item from its id.

  const index = event.target.id.slice(8);

  // Check the current url.
  // Redirect to the order page taking account the language of the page.
  // Include the index number in a query string.

  // The Estonian route.

  if (window.location.href.indexOf("pood") != -1) {
    window.location.href = "/telli?selected=" + index;

    // The English route.

  } else if (window.location.href.indexOf("shop") != -1) {
    window.location.href = "/en/order?selected=" + index;
  }
};
