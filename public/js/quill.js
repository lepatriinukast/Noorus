/* jshint esversion: 8 */

// JS code for displaying quill rich text editor instances on the admin pages.

  // Get an array of the DOM elements that will serve as containers for the quill editors.

  const containerArray = document.querySelectorAll('.editor');

    // Loop through the array of container elements.

    for (let i = 0; i < containerArray.length; i++) {

      // For each item in the container array, create an instance of quill text editor
      // (the code for this has been installed to the project from an outside source).
      // Specify the icons on the toolbar and the appearance theme.

      let quill = new Quill(containerArray[i], {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'link'],
        ]
      },
      theme: 'snow'  // or 'bubble'
      });
    }
