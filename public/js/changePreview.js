/* jshint esversion: 8 */

// Export a function for changing the labels and picture samples.

export const changePreview = (event) => {

  // The handler will work only on file inputs.

  if (event.target.type === "file") {

    // Using the id of the event target, get the corresponding placeholder and display image from the DOM.

    const placeholder = document.getElementById(event.target.id + "Placeholder");
    const icon = document.getElementById(event.target.id + "Icon");

    // Change the label and preview image if a new file has been selected for upload.

    placeholder.innerHTML = event.target.files[0].name;
    icon.src = URL.createObjectURL(event.target.files[0]);
  }
};
