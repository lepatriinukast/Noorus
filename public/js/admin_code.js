// J S  E X E C U T I O N  C O D E  F O R  T H E  A D M I N   P A G E S




// DISPLAY A MESSAGE WHEN AN UPDATE IS SUBMITTED ON AN ADMIN PAGE




// listen for clicks and keypresses on the different popup buttons and display or remove messages accordingly


if (successBtn !== null) {
  successBtn.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      removeMessage(successPopup);
    }
  });
  successBtn.addEventListener("click", function(event) {
    removeMessage(successPopup);
  });
}

if (failureBtn !== null) {
  failureBtn.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      removeMessage(failurePopup);
    }
  });
  failureBtn.addEventListener("click", function(event) {
    removeMessage(failurePopup);
  });
}

if (deleteNoBtn !== null) {
  deleteNoBtn.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      removeMessage(deletePopup);
    }
  });
  deleteNoBtn.addEventListener("click", function(event) {
    removeMessage(deletePopup);
  });
}


// function for displaying a success message


function createSuccessMessage() {

  // make the success popup visible on the screen using utility classes

  successPopup.classList.remove("hide");
  successPopup.classList.add("show");

  // focus the "OK" button

  successBtn.focus();
}


// function for displaying a failure message


function createFailureMessage() {

  // make the failure popup visible on the screen using utility classes

  failurePopup.classList.remove("hide");
  failurePopup.classList.add("show");

  // focus the "OK" button

  failureBtn.focus();
}


//function for displaying the message "Are you sure you want to delete this?"


function createDeleteMessage(event, destination, subform) {

  // make the popup visible using utility classes

  deletePopup.classList.remove("hide");
  deletePopup.classList.add("show");

  // focus the "NO" button

  deleteNoBtn.focus();

  // register the event target

  var element = event.target;

  // get the parent node of the event target

  var parent = getParent(element);

  // add an event listener to the "Yes" button on the delete popup and pass in the parent subform as an argument

  deleteYesBtn.addEventListener("click", function(event) {

      // when the button is clicked, call the commenceDelete function (this will start an ajax call and is defined further down this file)

      commenceDelete(event, parent, destination, subform);
    },

    // below is the options object of the event handler, which removes the event listener after it has run once,
    // otherwise the event listeners would just pile up when the containing function is run multiple times

    {
      once: true
    });
}


// function for removing a popup message


function removeMessage(popupType) {

  // remove a popup using utility classes

  popupType.classList.remove("show");
  popupType.classList.add("hide");
}




// LOGIN AND LOGOUT FROM THE ADMIN PAGE




// listen to the submit event on the login form and call the login function


if (loginBtn !== null) {

  login.addEventListener("submit", function(event) {

    // prevent the default event from happening

    event.preventDefault();

    // call the logout function

    sessionLogin();
  });
}


// listen to clicks on the logout button and call the logout function


if (logoutBtn !== null) {

  logoutBtn.addEventListener("click", function(event) {

    // prevent the default event from happening

    event.preventDefault();

    // call the logout function

    sessionLogout();
  });
}


// function for logging into the admin page


function sessionLogin() {

  // create a new XMLHttpRequest object

  var xhr = new XMLHttpRequest();

  // create the necessary data to be sent to the server with a data creation function

  var data = createLoginData();

  // turn this data into JSON

  var jsonData = JSON.stringify(data);

  // open the XMLHttpRequest and specify the method (POST), destination route on the server (upload/login), and whether the call takes place asynchronously (true);

  xhr.open("POST", "/upload/login", true);

  // manually set a request header, so that the server knows what type of data to expect

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // if everything works, check the action type

    if (this.readyState == 4 && this.status == 200) {

      // if the server response is "logged in", allow the user to login

      if (this.response === "logged in") {

        // redirect to the admin page

        window.location.href = "/admin";

        // if the server response is "wrong credentials", display an error message

      } else if (this.response === "wrong credentials") {

        // display the error message by removing the "delete" class from its classlist

        document.getElementById("wrongText").classList.remove("delete");
      }

      // if there is another problem with the login, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send("data=" + jsonData);
}


// function for logging out from the admin page


function sessionLogout() {

  // create a new XMLHttpRequest object

  var xhr = new XMLHttpRequest();

  // we don't actually need to send any data to the server,
  // but since the AJAX request needs something, create a JSON file out of a random string

  var jsonData = JSON.stringify("Not data");

  // open the XMLHttpRequest and specify the method (POST), destination route on the server (upload/logout), and whether the call takes place asynchronously (true);

  xhr.open("POST", "/upload/logout", true);

  // manually set a request header, so that the server knows what type of data to expect

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  // check if the request is ready

  xhr.onreadystatechange = function() {


    // if everything works, check the action type

    if (this.readyState == 4 && this.status == 200) {

      // redirect to the login route

      window.location.href = "/login";


      // if there is a problem, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send("data=" + jsonData);
}




// CHANGE THE LABELS AND PREVIEWS UNDER PICTURE UPLOAD BUTTONS




// loop through the images array and call the changePreview function once for each input in the array


for (var i = 0; i < images.length; i++) {
  changePreview(images[i]);
}


// for images in a different array, call the function in separate for loops


for (let i = 0; i < dirigendidPortreeArray.length; i++) {
  changePreview(dirigendidPortreeArray[i]);
}


for (let i = 0; i < toetajadLoikFileArray.length; i++) {
  changePreview(toetajadLoikFileArray[i], i);
}


for (let i = 0; i < sundmusedPlakatArray.length; i++) {
  changePreview(sundmusedPlakatArray[i]);
}


for (let i = 0; i < moodunudPlakatArray.length; i++) {
  changePreview(moodunudPlakatArray[i]);
}

for (let i = 0; i < poodPiltArray.length; i++) {
  changePreview(poodPiltArray[i]);
}


// function for changing the labels and picture samples


function changePreview(imgInput, iterator) {

  // check if the relevant image upload input exists on the page

  if (imgInput !== null && imgInput !== undefined) {

    // listen for clicks on the choose file button

    imgInput.addEventListener("input", function() {

      // check if an iterator is provided (this means we have a "loik" element)

      if (iterator !== undefined) {

        // get the parent node of the DOM file input element

        var parent = imgInput.parentNode;

        // get the classlist of that parent node

        var classList = parent.classList;

        // get the last element from the classlist, which will serve as a selectorname

        var selectorName = getLastElement(classList);

        // add 1 to the iterator, because normal people start counting from 1 not 0

        var idNumber = iterator + 1;

        // using the selectorname and id number, construct the id for the corresponding placeholder element

        var placeholderId = selectorName + "Placeholder" + idNumber;

        // using the selectorname and id number, construct the id for the corresponding img element (image preview)

        var imgId = selectorName + "Img" + idNumber;

        // get the relevant placeholder using the id constructed above

        var currentPlaceholder = document.getElementById(placeholderId);

        // get the relevant img element using the id constructed above

        var currentImg = document.getElementById(imgId);

        // change the label and preview image when a new file has been selected for upload

        currentPlaceholder.innerHTML = imgInput.files[0].name;
        currentImg.src = URL.createObjectURL(imgInput.files[0]);

      } else {

        // if it is not a "loik" element, we get the placeholder and image preview element a bit differently

        var placeholder = document.getElementById(imgInput.id + "Placeholder");

        var img = document.getElementById(imgInput.id + "Img");

        // change the label and preview image if a new file has been selected for upload

        placeholder.innerHTML = imgInput.files[0].name;
        img.src = URL.createObjectURL(imgInput.files[0]);
      }
    });
  }
}




// REGISTER TEXT UPDATES ON ALL THE ADMIN PAGES




// text inputs on the admin pages have two versions-
// one is the real input, the content of which will be sent to the server,
// the second one is a corresponding editable div, which will be displayed on the page
// the values of both versions of a particular input must be identical


//get all the editable text inputs on the page as an array

var inputArray = document.querySelectorAll(".input");

// check if there are any relevant inputs on the page

if (inputArray !== null) {

  // loop through all the inputs and have them listen to value updates and innerHTML modification

  for (var i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("DOMSubtreeModified", updateInputValue);
    inputArray[i].addEventListener("input", updateInputValue);
  }
}

// listen to "paste" events on the editable inputs and make sure only plain text is used (on editable divs this is not default)

if (editableInputArray.length !== 0) {

  for (var i = 0; i < editableInputArray.length; i++) {
    editableInputArray[i].addEventListener("paste", function(event) {

      // prevent the default pasting event

      event.preventDefault();

      // instead paste the plain text version of the copied text

      document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
    });
  }
}


// function for manually updating the value property of the fake text inputs that have been changed by the admin
// and also for carrying it over to the corresponding hidden input


function updateInputValue(event) {

  // get the id of the current editable input

  var inputId = event.target.id;

  // the text nodes are also counted as event targets, but they do not have id-s and need to be ignored

  if (inputId !== undefined) {

    // get what is currently written into the input

    var changedInputValue = getChangedInputValue(event.target);

    // set the value attribute of the edited input to what is currently written into the input

    this.setAttribute("value", changedInputValue);

    // get the two last characters of the input id

    var idEnding = inputId.slice(-2);

    // check if these characters are "Ed"

    if (idEnding === "Ed") {

      // if yes, the input is actually an editable div and we need to manually update a corresponding hidden input as well
      // the id attribute of this hidden input will be the id of the editable div minus its two last characters

      var realInputId = inputId.slice(0, -2);

      // get this hidden input

      var realInput = document.getElementById(realInputId);

      // update its value attribute as well

      realInput.setAttribute("value", changedInputValue);
    }
  }
}


//function for getting what is currently being written into an input


function getChangedInputValue(input) {

  // check if the edited input is an actual HTML input

  if (input.tagName === "INPUT") {

    // if yes, return its value attribute

    var innerValue = input.value

    return innerValue;

  } else {

    // if not return its innerHTML attribute

    var innerText = input.innerHTML

    return innerText;
  }
}



// BOLDING/UNBOLDING




// loop through the array of "fake" inputs and listen to focus events


for (var i = 0; i < editableInputArray.length; i++) {

  editableInputArray[i].addEventListener("focus", function(event) {

    // when a "fake" input is focused, display the bold btn using utility classes

    boldBtn.classList.remove("hide");
    boldBtn.classList.add("show");
  });


  // loop through the array of "fake" inputs and listen to blur events


  editableInputArray[i].addEventListener("blur", function(event) {

    // if a "fake" input loses focus, remove the bold button from the page using utility classes

    boldBtn.classList.remove("show");
    boldBtn.classList.add("hide");
  });
}


// listen for clicks on the bold text button


if (boldBtn !== null) {

  boldBtn.addEventListener("click", getMarkupText);

  // also listen specifically for the mousedown effect, because that is where the blur effect happens

  boldBtn.addEventListener("mousedown", function(event) {

    // stop the blur effect from happening

    event.preventDefault();
  });
}


// function for bolding/unbolding text on inputs, both on the admin page and the page that we want to update


function getMarkupText() {

  // prevent the href attribute from working on the button

  event.preventDefault();

  // get the selected text as a js object

  var selection = window.getSelection();

  // the bold/unbold button has two different methods-  it bolds/unbolds already written selected input text
  // or in case no suitable text is selected, the button stays down and allows to type bold text

  // firstly we will go through the first scenario- check if any text is selected at all

  if (selection.isCollapsed === false) {

    // get the selected text as a string

    var selectionString = selection.toString();

    // get the anchor node of the selection object (the node, where the selection starts)

    var anchor = selection.anchorNode;

    // get the focus node of the selection object (the node, where the selection ends)

    var focus = selection.focusNode;

    // get the closest parent of the anchor node with a class of "input"

    var anchorParent = anchor.parentNode;

    // get the closest parent of the focus node with a class of "input"

    var focusParent = focus.parentNode;

    // both the anchorParent and focusParent nodes should either have a class of "input" in their classlist
    // or if not, their own parent element should have it- whatever the case, by finding this class, we should get the editable input

    var mainInput = anchorParent.closest(".editable-input");

    // the bolding/unbolding of selected text should only work if the mainInput exists,
    // otherwise the selected text is not valid for bolding/unbolding and the button will call for its second method

    if (mainInput !== null) {

      // convert the innerHTML of the mainInput into a string

      var innerHTMLString = mainInput.innerHTML.toString();

      // create an array of the childnodes of the editable input
      // (these are text nodes and possible "b" elements with text nodes of their own as children)

      var childNodes = Array.from(mainInput.childNodes);

      // map out the child nodes of the mainInput (we have a function for that)

      var childNodesData = getChildNodesData(childNodes);

      // map out the selected text in relation to the mainInput (we have a function for that)

      var selectionData = getSelectionData(selection, anchor, focus, childNodes);

      // check if we need to bold or unbold the selected text
      // unbolding happens only when both the beginning and end of the selection are on the same text node
      // and located between "b" tags

      // UNBOLDING WILL HAPPEN HERE:

      if (selectionData.beginningIndex === selectionData.endIndex && selectionData.beginningBold === true) {

        // everything here only happens on one node, so we only need one of either beginningIndex or endIndex

        var indexUnbold = selectionData.beginningIndex;

        // use the selection offsets to slice the node text into beforeSelection and afterSelection strings

        var beforeSelectionUnbold = selectionData.beginningNodeText.slice(0, selectionData.beginningOffset);
        var afterSelectionUnbold = selectionData.endNodeText.slice(selectionData.endOffset);

        // use a function to check if the there is any text at all before and after the selection
        // and if yes, return the text inside bold tags

        var beforeSelectionTagged = getOptionalBoldTags(beforeSelectionUnbold);
        var afterSelectionTagged = getOptionalBoldTags(afterSelectionUnbold);

        // now construct the full node text from these building blocks we created above

        var newTextUnbold = beforeSelectionTagged + selectionString + afterSelectionTagged;

        // now we have changed the node where the selection was located,
        // but we have to create the whole new innerHTML for the mainInput
        // we will populate an empty array for this purpose

        var textArrayUnbold = [];

        // loop through the childNodesData array to replace all the text that it contains

        for (var i = 0; i < childNodesData.length; i++) {

          // check if the current item's index is the one we obtained earlier from the selectionData

          if (i === indexUnbold) {

            // if yes, replace the current item's text content with the string we created above
            // and push the new text to the array created above

            textArrayUnbold.push(newTextUnbold);

          } else {

            // if not, we will keep the original text, unless the item is bold

            if (childNodesData[i].bold === true) {

              // in this case we add bold tags to the original text

              var boldTextUnbold = childNodesData[i].text.bold();

              // push the altered text to the new array

              textArrayUnbold.push(boldTextUnbold);

              // if the item is not bold either, use the original text

            } else if (childNodesData[i].bold === false) {

              // get the original text

              var textUnbold = childNodesData[i].text;

              // and push it to the new array

              textArrayUnbold.push(textUnbold);
            }
          }
        }

        // construct a long string from the newly created array

        var newInnerHTMLUnbold = textArrayUnbold.join("");

        // this string will be the new innerHTML for the mainInput

        mainInput.innerHTML = newInnerHTMLUnbold;

        // in all other cases we make the selected text bold


        // BOLDING WILL HAPPEN HERE:

      } else {

        // check if the selection begins and ends on the same node

        if (selectionData.beginningIndex === selectionData.endIndex) {

          // if yes, we will change only one node and need the text and index for only this one node

          var indexBoldSimple = selectionData.beginningIndex;

          // use the selection offsets to slice the node text into beforeSelection and afterSelection strings

          var beforeSelectionBoldSimple = selectionData.beginningNodeText.slice(0, selectionData.beginningOffset);
          var afterSelectionBoldSimple = selectionData.endNodeText.slice(selectionData.endOffset);

          // construct new node text from these slices and a selection string between bold tags

          var newTextBoldSimple = beforeSelectionBoldSimple + selectionString.bold() + afterSelectionBoldSimple;

          // now we have changed the node where the selection was located,
          // but we have to create the whole new innerHTML for the mainInput
          // we will populate an empty array for this purpose

          var textArrayBoldSimple = [];

          // also create an empty object, which will later contain the index number of the changed node

          var nodeIndexBoldSimple = {};

          // loop through the childNodesData array to replace all the text that it contains

          for (var a = 0; a < childNodesData.length; a++) {

            // check if the current item's index is the one we obtained earlier from the selectionData

            if (a === indexBoldSimple) {

              // if yes, replace the current item's text content with the string we created above
              // and push the new text to the array created above

              textArrayBoldSimple.push(newTextBoldSimple);

              // check if the newly bolded text is in the beginning of the text node

              if (newTextBoldSimple.indexOf("<b>") !== 0) {

                // if not, populate the nodeIndexBoldSimple object with a number that is the iterator plus 1

                nodeIndexBoldSimple.index = a + 1;

              } else if (newTextBoldSimple.indexOf("<b>") === 0) {

                // if the newly bolded text is in the beginning of the text node, don't add 1 to the iterator

                nodeIndexBoldSimple.index = a;
              }

            } else {

              // if not, we will keep the original text, unless the item is bold

              if (childNodesData[a].bold === true) {

                // in this case we add bold tags to the original text

                var boldTextBoldSimple = childNodesData[a].text.bold();

                // push the altered text to the new array

                textArrayBoldSimple.push(boldTextBoldSimple);

                // if the item is not bold either, use the original text

              } else if (childNodesData[a].bold === false) {

                // get the original text

                var textBoldSimple = childNodesData[a].text;

                // and push it to the new array

                textArrayBoldSimple.push(textBoldSimple);
              }
            }
          }

          // construct a long string from the newly created array, while also merging adjacent bold nodes into one longer bold node

          var newInnerHTMLBoldSimple = textArrayBoldSimple.join("").replaceAll("</b><b>", "");

          // this string will be the new innerHTML for the mainInput

          mainInput.innerHTML = newInnerHTMLBoldSimple;

          // if the selection does not begin and end on the same node,
          // it means some of the selected text is bold and some of it not

        } else {

          // get the indices of the node where the selection starts and for the one where it ends

          var beginningIndexBold = selectionData.beginningIndex;
          var endIndexBold = selectionData.endIndex;

          // use the selection offsets to slice the node text into beforeSelection and afterSelection strings

          var beforeSelectionBold = selectionData.beginningNodeText.slice(0, selectionData.beginningOffset);


          var afterSelectionBold = selectionData.endNodeText.slice(selectionData.endOffset);

          // create an empty array which will eventually be populated by all the text of the mainInput

          var textArrayBold = [];

          // loop through the childNodesData array to replace all the text that it contains

          for (var b = 0; b < childNodesData.length; b++) {

            // first let's deal with the nodes that are not part of the selection
            // (which means their index is either smaller than beginningIndexBold, or bigger than endIndexBold)
            // (if there are any nodes that lie fully inside the selection, we will ignore them completely)

            if (b < beginningIndexBold || b > endIndexBold) {

              // check if this particular node is bold

              if (childNodesData[b].bold === true) {

                // if yes, put the original text between "b" tags

                var boldOutsideSelectionText = childNodesData[b].text.bold();

                // push this text into the array created above

                textArrayBold.push(boldOutsideSelectionText);

                // if the current node is not bold, we will obviously not need the "b" tags

              } else if (childNodesData[b].bold === false) {

                // use unchanged original text from the current node

                var outsideSelectionText = childNodesData[b].text;

                // push this text into the array created above

                textArrayBold.push(outsideSelectionText);
              }

              // check if the current node is the one where the selection starts on
              // the text content of this node needs to be replaced by whatever text comes on this node
              // before the selection plus then the entirety of the selected text

            } else if (b === beginningIndexBold) {

              // if yes, check if it is bold

              if (childNodesData[b].bold === true) {

                // if yes, we need to add a "b" to the beginning of the newly constructed string

                var newTextBoldBeginning = "<b>" + beforeSelectionBold + selectionString;

                // push the new text into the array created above

                textArrayBold.push(newTextBoldBeginning);

                // if this node is not bold, then the "b" tag comes right before the selected text

              } else if (childNodesData[b].bold === false) {

                // create this string

                var newTextRegularBeginning = beforeSelectionBold + "<b>" + selectionString;

                textArrayBold.push(newTextRegularBeginning);

              }

              // check if the current iterator corresponds to the index of the node where the selection ends

            } else if (b === endIndexBold) {

              // if yes, check if this node is bold

              if (childNodesData[b].bold === true) {

                // if yes, we need to add a "b" to the end of the text that comes on this node after the selection ends

                var newTextBoldEnd = afterSelectionBold + "</b>";

                // push the new text into the array created above

                textArrayBold.push(newTextBoldEnd);

                // if this node is not bold, then the "b" tag comes right before the text that comes on this node after the selection ends

              } else if (childNodesData[b].bold === false) {

                // create this string

                var newTextRegularEnd = "</b>" + afterSelectionBold;

                // push the new text into the array created above

                textArrayBold.push(newTextRegularEnd);
              }
            }
          }

          // construct a long string from the newly created array

          var newInnerHTMLBold = textArrayBold.join("");

          // merge adjacent bold nodes into one using a simple string replacement

          var adjustedInnerHTMLBold = newInnerHTMLBold.replaceAll("</b><b>", "");

          // this string will be the new innerHTML for the mainInput

          mainInput.innerHTML = newInnerHTMLBold;
        }
      }
    }
  }
}


// function for checking if there is any content in a string
// and if yes, adding bold tags to it


function getOptionalBoldTags(string) {

  // check if the provided string is an empty one

  if (string === "") {

    // if yes, return the empty string

    return string;

  } else {

    // if the string is not empty, return it with bold tags

    return string.bold();
  }
}


// function for getting data about the inner structure of the editable input elements
// (what is the text content and whether there is any bold text)


function getChildNodesData(array) {

  // create an empty array, which will later be populated by js objects
  // containing data about the child nodes of the editable input

  var dataArray = [];

  // loop through the given array of nodes

  for (var i = 0; i < array.length; i++) {

    // check if the current node has a data attribute

    if (array[i].data !== undefined) {

      // if yes, it is a regular text node and not bold
      // get its text content as well and create a js object out of the obtained data

      var regularNode = {
        text: array[i].data,
        bold: false
      };

      // push the object into the array created above

      dataArray.push(regularNode);

    } else {

      // if the data attribute is undefined, we have an element node
      // (which in our case can only be a "b" node)
      // get its text content as well and create a js object out of the obtained data

      var boldNode = {
        text: array[i].innerHTML,
        bold: true
      };

      // push the object into the array created above

      dataArray.push(boldNode);
    }
  }

  // return the now populated array

  return dataArray;
}


// function for getting data about the selected text
// (its beginning and end points and whether anything is bold)


function getSelectionData(selection, anchor, focus, array) {

  // firstly find out what the indices are for the anchor and focus nodes
  // in relation to the given array and whether they are bold or not

  var anchorData = compareIndices(anchor, array);

  var focusData = compareIndices(focus, array);

  // anchor and focus are not the same as the beginning and end points of the selection,
  // but we can use them to check if the selection has been made backwards (in which case the anchor comes after the focus)

  var backwards = checkIfBackwards(selection, anchorData, focusData);

  // now use a function to create a javascript object with all the obtained data about the selected text

  var selectionData = createSelectionData(selection, anchorData, focusData, backwards);

  // return the retrieved object

  return selectionData;
}

// function for returning the text content of a node

function getTextContent(node) {

  // check the nodetype

  if (node.nodeType === 3) {

    // if it is a text node, its content is provided in the data attribute

    return node.data;

  } else {

    // if not, the content can be found in the textContent property

    return node.textContent;
  }
}

// function for determining the location of the selection's beginning and end
// in relation to its parent element and whether either of them is located between bold tags


function compareIndices(node, array) {

  // find out, where is the given node located in the given array

  var index = array.indexOf(node);

  // check if there is any such node in the given array at all

  if (index === -1) {

    // if not, it means that the given node is inside "b" tags, and we will find its parent node in the given array instead

    var parent = node.parentNode;

    // get the index of the parent node inside the given array

    var parentIndex = array.indexOf(parent);

    // return an object with the obtained index and the bold attribute set as "true"

    var indexObject1 = {
      index: parentIndex,
      bold: true
    };

    return indexObject1;

  } else if (node.nodeType !== 3) {

    var indexObject2 = {
      index: index,
      bold: true
    };

    return indexObject2;

  } else {

    // return an object with the obtained index and the bold attribute set as "false"

    var indexObject3 = {
      index: index,
      bold: false
    };

    return indexObject3;
  }
}


// function for checking if the selection has been made backwards (focus comes before anchor)


function checkIfBackwards(selection, anchorData, focusData) {

  // if the anchorNode comes before the focusNode, the selection is not backwards

  if (anchorData.index < focusData.index) {

    return false;

    // if it's the other way around, the selection is backwards

  } else if (anchorData.index > focusData.index) {

    return true;

    // if the selection ends and starts on the same node, compare the corresponding offsets instead

  } else if (anchorData.index === focusData.index) {

    // if the anchorOffset comes before focusOffset, the selection is not backwards

    if (selection.anchorOffset < selection.focusOffset) {

      return false;

      // if it is the other way around, the selection is backwards

    } else if (selection.anchorOffset > selection.focusOffset) {

      return true;
    }
  }
}


// function for creating a javascript object with necessary information about the selected text


function createSelectionData(selection, anchorData, focusData, backwards) {

  // this function can return one of the two following javascript objects,
  // depending if the selection has been made backwards or not

  if (backwards === false) {

    var selectionData1 = {
      beginningIndex: anchorData.index,
      beginningOffset: selection.anchorOffset,
      beginningBold: anchorData.bold,
      beginningNodeText: getTextContent(selection.anchorNode),
      endIndex: focusData.index,
      endOffset: selection.focusOffset,
      endBold: focusData.bold,
      endNodeText: getTextContent(selection.focusNode)
    };

    return selectionData1;

  } else if (backwards === true) {

    var selectionData2 = {
      beginningIndex: focusData.index,
      beginningOffset: selection.focusOffset,
      beginningBold: focusData.bold,
      beginningNodeText: getTextContent(selection.focusNode),
      endIndex: anchorData.index,
      endOffset: selection.anchorOffset,
      endBold: anchorData.bold,
      endNodeText: getTextContent(selection.anchorNode)
    };

    return selectionData2;
  }
}




// FUNCTIONS FOR GETTING NECESSARY DATA FOR DELETING ELEMENTS FROM THE PAGE ASYNCHRONOUSLY




// function for getting relevant DOM element arrays using the name of the subform


function getArrays(elementName) {

  // construct an object out of the arrays

  var arrays = {
    array: Array.from(document.querySelectorAll("." + elementName)),
    yearArray: Array.from(document.querySelectorAll("." + elementName + "Year")),
    linkArray: Array.from(document.querySelectorAll("." + elementName + "Link")),
    iconArray: Array.from(document.querySelectorAll("." + elementName + "Icon")),
    numberArray: Array.from(document.querySelectorAll("." + elementName + "Number")),
    estArray: Array.from(document.querySelectorAll("." + elementName + "Est")),
    enArray: Array.from(document.querySelectorAll("." + elementName + "En")),
    estEdArray: Array.from(document.querySelectorAll("." + elementName + "EstEd")),
    enEdArray: Array.from(document.querySelectorAll("." + elementName + "EnEd")),
    estKeyArray: Array.from(document.querySelectorAll("." + elementName + "EstKey")),
    enKeyArray: Array.from(document.querySelectorAll("." + elementName + "EnKey")),
    checkboxArray: Array.from(document.querySelectorAll("." + elementName + "Checkbox")),
    textAreaArray: Array.from(document.querySelectorAll("." + elementName + "TextArea")),
    fileArray: Array.from(document.querySelectorAll("." + elementName + "File")),
    labelArray: Array.from(document.querySelectorAll("." + elementName + "Label")),
    placeholderArray: Array.from(document.querySelectorAll("." + elementName + "Placeholder")),
    imgArray: Array.from(document.querySelectorAll("." + elementName + "Img")),
    headingArray: Array.from(document.querySelectorAll("." + elementName + "Heading")),
    deleteBtnArray: Array.from(document.querySelectorAll("." + elementName + "DeleteBtn")),
  };

  // return the arrays object

  return arrays;
}


// function for getting the relevant DOM arrays specifically for the "dirigendid" subforms


function getDirigendidSubforms() {

  // construct an object out of the elements on the "dirigendid" subform

  var dirigendidSubforms = {
    subformArray: Array.from(document.querySelectorAll(".dirigendidSubform")),
    subformPortreeArray: Array.from(document.querySelectorAll(".dirigendidPortree")),
    subformPortreeLabelArray: Array.from(document.querySelectorAll(".dirigendidPortreeLabel")),
    subformPortreePlaceholderArray: Array.from(document.querySelectorAll(".dirigendidPortreePlaceholder")),
    subformPortreeImgArray: Array.from(document.querySelectorAll(".dirigendidPortreeImg")),
    subformNimiArray: Array.from(document.querySelectorAll(".dirigendidNimi")),
    subformHeadingArray: Array.from(document.querySelectorAll(".dirigendidHeading")),
    subformSubmitBtnArray: Array.from(document.querySelectorAll(".dirigendidSubmitBtn")),
    subformLoikFormArray: Array.from(document.querySelectorAll(".dirigendidLoikForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".dirigendidLoikAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".dirigendidDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikEstEdArrays: [],
    subformLoikEnEdArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: []
  };

  // loop through all the "loik" elements to get arrays of its components

  for (var i = 0; i < dirigendidSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEn"));
    var subformLoikEstEdArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEstEd"));
    var subformLoikEnEdArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEnEd"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikDeleteBtn"));

    // push these arrays into the dirigendidSubforms object

    dirigendidSubforms.subformLoikArrays.push(subformLoikArray);
    dirigendidSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    dirigendidSubforms.subformLoikEnArrays.push(subformLoikEnArray);
    dirigendidSubforms.subformLoikEstEdArrays.push(subformLoikEstEdArray);
    dirigendidSubforms.subformLoikEnEdArrays.push(subformLoikEnEdArray);
    dirigendidSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
    dirigendidSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);
  }

  // return the object

  return dirigendidSubforms;
}


// function for getting the relevant DOM arrays specifically for the "ajalugu" subforms


function getAjaluguSubforms() {

  // construct an object out of the elements on the "ajalugu" subform

  var ajaluguSubforms = {

    subformArray: Array.from(document.querySelectorAll(".ajaluguSubform")),
    subformHeadingArray: Array.from(document.querySelectorAll(".ajaluguHeading")),
    subformPealkiriEstArray: Array.from(document.querySelectorAll(".ajaluguPealkiriEst")),
    subformPealkiriEnArray: Array.from(document.querySelectorAll(".ajaluguPealkiriEn")),
    subformPealkiriHeadingArray: Array.from(document.querySelectorAll(".ajaluguPealkiriHeading")),
    subformSubmitBtnArray: Array.from(document.querySelectorAll(".ajaluguSubmitBtn")),
    subformLoikFormArray: Array.from(document.querySelectorAll(".ajaluguLoikForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".ajaluguLoikAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".ajaluguDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikEstEdArrays: [],
    subformLoikEnEdArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: []
  };

  // loop through all the "loik" elements to get arrays of its components

  for (var i = 0; i < ajaluguSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEn"));
    var subformLoikEstEdArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEstEd"));
    var subformLoikEnEdArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEnEd"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikDeleteBtn"));

    // push these arrays into the ajaluguSubforms object

    ajaluguSubforms.subformLoikArrays.push(subformLoikArray);
    ajaluguSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    ajaluguSubforms.subformLoikEnArrays.push(subformLoikEnArray);
    ajaluguSubforms.subformLoikEstEdArrays.push(subformLoikEstEdArray);
    ajaluguSubforms.subformLoikEnEdArrays.push(subformLoikEnEdArray);
    ajaluguSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
    ajaluguSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);
  }

  // return the object

  return ajaluguSubforms;
}


// function for getting the relevant DOM arrays specifically for the "sundmused" subforms


function getSundmusedSubforms() {

  // construct an object out of the elements on the "sundmused" subform

  var sundmusedSubforms = {

    subformArray: Array.from(document.querySelectorAll(".sundmusedSubform")),
    subformPealkiriEstArray: Array.from(document.querySelectorAll(".sundmusedPealkiriEst")),
    subformPealkiriEnArray: Array.from(document.querySelectorAll(".sundmusedPealkiriEn")),
    subformPlakatArray: Array.from(document.querySelectorAll(".sundmusedPlakat")),
    subformPlakatLabelArray: Array.from(document.querySelectorAll(".sundmusedPlakatLabel")),
    subformPlakatPlaceholderArray: Array.from(document.querySelectorAll(".sundmusedPlakatPlaceholder")),
    subformPlakatImgArray: Array.from(document.querySelectorAll(".sundmusedPlakatImg")),
    subformHeadingArray: Array.from(document.querySelectorAll(".sundmusedHeading")),
    subformLoikFormArray: Array.from(document.querySelectorAll(".sundmusedLoikForm")),
    subformSubmitBtnArray: Array.from(document.querySelectorAll(".sundmusedSubmitBtn")),
    subformLoikKohtFormArray: Array.from(document.querySelectorAll(".sundmusedLoikKohtForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".sundmusedLoikAddBtn")),
    subformLoikKohtAddBtnArray: Array.from(document.querySelectorAll(".sundmusedLoikKohtAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".sundmusedDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikEstEdArrays: [],
    subformLoikEnEdArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: [],
    subformLoikKohtArrays: [],
    subformLoikKohtEstArrays: [],
    subformLoikKohtEnArrays: [],
    subformLoikKohtLinkArrays: [],
    subformLoikKohtHeadingArrays: [],
    subformLoikKohtDeleteBtnArrays: [],
  };

  // populate the empty arrays using a for loop

  for (var i = 0; i < sundmusedSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikEn"));
    var subformLoikEstEdArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikEstEd"));
    var subformLoikEnEdArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikEnEd"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikDeleteBtn"));
    var subformLoikKohtArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKoht"));
    var subformLoikKohtEstArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtEst"));
    var subformLoikKohtEnArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtEn"));
    var subformLoikKohtLinkArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtLink"));
    var subformLoikKohtHeadingArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtHeading"));
    var subformLoikKohtDeleteBtnArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtDeleteBtn"));

    // push these arrays into the sundmusedSubforms object

    sundmusedSubforms.subformLoikArrays.push(subformLoikArray);
    sundmusedSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    sundmusedSubforms.subformLoikEnArrays.push(subformLoikEnArray);
    sundmusedSubforms.subformLoikEstEdArrays.push(subformLoikEstEdArray);
    sundmusedSubforms.subformLoikEnEdArrays.push(subformLoikEnEdArray);
    sundmusedSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
    sundmusedSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);
    sundmusedSubforms.subformLoikKohtArrays.push(subformLoikKohtArray);
    sundmusedSubforms.subformLoikKohtEstArrays.push(subformLoikKohtEstArray);
    sundmusedSubforms.subformLoikKohtEnArrays.push(subformLoikKohtEnArray);
    sundmusedSubforms.subformLoikKohtLinkArrays.push(subformLoikKohtLinkArray);
    sundmusedSubforms.subformLoikKohtHeadingArrays.push(subformLoikKohtHeadingArray);
    sundmusedSubforms.subformLoikKohtDeleteBtnArrays.push(subformLoikKohtDeleteBtnArray);
  }

  return sundmusedSubforms;
}


// function for getting the relevant DOM arrays specifically for the "pood" subforms


function getPoodSubforms() {

  // construct an object out of the elements on the "pood" subform

  var poodSubforms = {

    subformArray: Array.from(document.querySelectorAll(".poodSubform")),
    subformToodeEstArray: Array.from(document.querySelectorAll(".poodToodeEst")),
    subformToodeEnArray: Array.from(document.querySelectorAll(".poodToodeEn")),
    subformToodeNumberArray: Array.from(document.querySelectorAll(".poodToodeNumber")),
    subformPiltArray: Array.from(document.querySelectorAll(".poodPilt")),
    subformPiltLabelArray: Array.from(document.querySelectorAll(".poodPiltLabel")),
    subformPiltPlaceholderArray: Array.from(document.querySelectorAll(".poodPiltPlaceholder")),
    subformPiltImgArray: Array.from(document.querySelectorAll(".poodPiltImg")),
    subformHeadingArray: Array.from(document.querySelectorAll(".poodHeading")),
    subformSubmitBtnArray: Array.from(document.querySelectorAll(".poodSubmitBtn")),
    subformLoikFormArray: Array.from(document.querySelectorAll(".poodLoikForm")),
    subformLoikNimistuFormArray: Array.from(document.querySelectorAll(".poodLoikNimistuForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".poodLoikAddBtn")),
    subformLoikNimistuAddBtnArray: Array.from(document.querySelectorAll(".poodLoikNimistuAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".poodDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikEstEdArrays: [],
    subformLoikEnEdArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: [],
    subformLoikNimistuArrays: [],
    subformLoikNimistuEstArrays: [],
    subformLoikNimistuEnArrays: [],
    subformLoikNimistuEstEdArrays: [],
    subformLoikNimistuEnEdArrays: [],
    subformLoikNimistuHeadingArrays: [],
    subformLoikNimistuDeleteBtnArrays: [],
  };

  // populate the empty "loik" arrays using a for loop

  for (var i = 0; i < poodSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".pood" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikEn"));
    var subformLoikEstEdArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikEstEd"));
    var subformLoikEnEdArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikEnEd"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".pood" + idNumber + "LoikDeleteBtn"));

    // push these arrays into the poodSubforms object

    poodSubforms.subformLoikArrays.push(subformLoikArray);
    poodSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    poodSubforms.subformLoikEnArrays.push(subformLoikEnArray);
    poodSubforms.subformLoikEstEdArrays.push(subformLoikEstEdArray);
    poodSubforms.subformLoikEnEdArrays.push(subformLoikEnEdArray);
    poodSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
    poodSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);

  }
  // populate the empty "loikNimistu" arrays using a for loop

  for (var a = 0; a < poodSubforms.subformLoikNimistuFormArray.length; a++) {

    var idNumberNimistu = a + 1;
    var subformLoikNimistuArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistu"));
    var subformLoikNimistuEstArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuEst"));
    var subformLoikNimistuEnArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuEn"));
    var subformLoikNimistuEstEdArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuEstEd"));
    var subformLoikNimistuEnEdArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuEnEd"));
    var subformLoikNimistuHeadingArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuHeading"));
    var subformLoikNimistuDeleteBtnArray = Array.from(document.querySelectorAll(".pood" + idNumberNimistu + "LoikNimistuDeleteBtn"));

    // push these arrays into the poodSubforms object

    poodSubforms.subformLoikNimistuArrays.push(subformLoikNimistuArray);
    poodSubforms.subformLoikNimistuEstArrays.push(subformLoikNimistuEstArray);
    poodSubforms.subformLoikNimistuEnArrays.push(subformLoikNimistuEnArray);
    poodSubforms.subformLoikNimistuEstEdArrays.push(subformLoikNimistuEstEdArray);
    poodSubforms.subformLoikNimistuEnEdArrays.push(subformLoikNimistuEnEdArray);
    poodSubforms.subformLoikNimistuHeadingArrays.push(subformLoikNimistuHeadingArray);
    poodSubforms.subformLoikNimistuDeleteBtnArrays.push(subformLoikNimistuDeleteBtnArray);
  }

  return poodSubforms;
}


// function for getting the relevant DOM arrays specifically for the "moodunud" subforms


function getMoodunudSubforms() {

  // construct an object out of the elements on the "moodunud" subform

  var moodunudSubforms = {

    subformArray: Array.from(document.querySelectorAll(".moodunudSubform")),
    subformPealkiriEstArray: Array.from(document.querySelectorAll(".moodunudPealkiriEst")),
    subformPealkiriEnArray: Array.from(document.querySelectorAll(".moodunudPealkiriEn")),
    subformPlakatArray: Array.from(document.querySelectorAll(".moodunudPlakat")),
    subformPlakatLabelArray: Array.from(document.querySelectorAll(".moodunudPlakatLabel")),
    subformPlakatPlaceholderArray: Array.from(document.querySelectorAll(".moodunudPlakatPlaceholder")),
    subformPlakatImgArray: Array.from(document.querySelectorAll(".moodunudPlakatImg")),
    subformHeadingArray: Array.from(document.querySelectorAll(".moodunudHeading")),
    subformSubmitBtnArray: Array.from(document.querySelectorAll(".moodunudSubmitBtn")),
    subformLoikFormArray: Array.from(document.querySelectorAll(".moodunudLoikForm")),
    subformLoikKohtFormArray: Array.from(document.querySelectorAll(".moodunudLoikKohtForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".moodunudLoikAddBtn")),
    subformLoikKohtAddBtnArray: Array.from(document.querySelectorAll(".moodunudLoikKohtAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".moodunudDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikEstEdArrays: [],
    subformLoikEnEdArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: [],
    subformLoikKohtArrays: [],
    subformLoikKohtEstArrays: [],
    subformLoikKohtEnArrays: [],
    subformLoikKohtLinkArrays: [],
    subformLoikKohtHeadingArrays: [],
    subformLoikKohtDeleteBtnArrays: [],
  };

  // populate the empty arrays using a for loop

  for (var i = 0; i < moodunudSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikEn"));
    var subformLoikEstEdArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikEstEd"));
    var subformLoikEnEdArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikEnEd"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikDeleteBtn"));
    var subformLoikKohtArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKoht"));
    var subformLoikKohtEstArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKohtEst"));
    var subformLoikKohtEnArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKohtEn"));
    var subformLoikKohtLinkArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKohtLink"));
    var subformLoikKohtHeadingArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKohtHeading"));
    var subformLoikKohtDeleteBtnArray = Array.from(document.querySelectorAll(".moodunud" + idNumber + "LoikKohtDeleteBtn"));

    // push these arrays into the moodunudSubforms object

    moodunudSubforms.subformLoikArrays.push(subformLoikArray);
    moodunudSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    moodunudSubforms.subformLoikEnArrays.push(subformLoikEnArray);
    moodunudSubforms.subformLoikEstEdArrays.push(subformLoikEstEdArray);
    moodunudSubforms.subformLoikEnEdArrays.push(subformLoikEnEdArray);
    moodunudSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
    moodunudSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);
    moodunudSubforms.subformLoikKohtArrays.push(subformLoikKohtArray);
    moodunudSubforms.subformLoikKohtEstArrays.push(subformLoikKohtEstArray);
    moodunudSubforms.subformLoikKohtEnArrays.push(subformLoikKohtEnArray);
    moodunudSubforms.subformLoikKohtLinkArrays.push(subformLoikKohtLinkArray);
    moodunudSubforms.subformLoikKohtHeadingArrays.push(subformLoikKohtHeadingArray);
    moodunudSubforms.subformLoikKohtDeleteBtnArrays.push(subformLoikKohtDeleteBtnArray);
  }

  return moodunudSubforms;
}


// function for getting the names of the relevant DOM element arrays


function getArrayNames(elementName) {

  // construct an object out of the retrieved array names

  var arrayNames = {
    arrayName: elementName,
    arrayNameYear: elementName + "Year",
    arrayNameLink: elementName + "Link",
    arrayNameNumber: elementName + "Number",
    arrayNameIcon: elementName + "Icon",
    arrayNameEst: elementName + "Est",
    arrayNameEn: elementName + "En",
    arrayNameEstEd: elementName + "EstEd",
    arrayNameEnEd: elementName + "EnEd",
    arrayNameEstKey: elementName + "EstKey",
    arrayNameEnKey: elementName + "EnKey",
    arrayNameCheckbox: elementName + "Checkbox",
    arrayNameTextArea: elementName + "TextArea",
    arrayNameFile: elementName + "File",
    arrayNameLabel: elementName + "Label",
    arrayNamePlaceholder: elementName + "Placeholder",
    arrayNameImg: elementName + "Img",
    arrayNameHeading: elementName + "Heading",
    arrayNameDeleteBtn: elementName + "DeleteBtn"
  };

  // return the arrayNames object

  return arrayNames;
}


// function for getting the index of the deleted "loik" element in the array


function getArrayIndex(element, elementName) {

  // get the arrays object

  var arrays = getArrays(elementName);

  // get the index of the deleted element in its array

  var arrayIndex = arrays.array.indexOf(element);

  // return the retrieved index

  return arrayIndex;
}


// function for getting the index of the deleted "dirigendid" subform in the array


function getDirigendidSubformIndex(element) {

  // get the subforms object

  var dirigendidSubforms = getDirigendidSubforms();

  // get the index of the deleted subform in its array

  var dirigendidSubformIndex = dirigendidSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return dirigendidSubformIndex;
}


// function for getting the index of the deleted "ajalugu" subform in the array


function getAjaluguSubformIndex(element) {

  // get the subforms object

  var ajaluguSubforms = getAjaluguSubforms();

  // get the index of the deleted subform in its array

  var ajaluguSubformIndex = ajaluguSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return ajaluguSubformIndex;
}


// function for getting the index of the deleted "sundmused" subform in the array


function getSundmusedSubformIndex(element) {

  // get the subforms object

  var sundmusedSubforms = getSundmusedSubforms();

  // get the index of the deleted subform in its array

  var sundmusedSubformIndex = sundmusedSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return sundmusedSubformIndex;
}


// function for getting the index of the deleted "pood" subform in the array


function getPoodSubformIndex(element) {

  // get the subforms object

  var poodSubforms = getPoodSubforms();

  // get the index of the deleted subform in its array

  var poodSubformIndex = poodSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return poodSubformIndex;
}


// function for getting the index of the deleted "moodunud" subform in the array


function getMoodunudSubformIndex(element) {

  // get the subforms object

  var moodunudSubforms = getMoodunudSubforms();

  // get the index of the deleted subform in its array

  var moodunudSubformIndex = moodunudSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return moodunudSubformIndex;
}




// FUNCTIONS FOR GETTING NECESSARY DATA FOR ADDING ELEMENTS TO THE PAGE ASYNCHRONOUSLY




// function for getting the relevant arrays from the ajax response text using the selector name


function getDocArrays(doc, selectorName) {

  // construct an object from the retrieved arrays

  var docArrays = {
    docArray: doc.querySelectorAll("." + selectorName),
    docYearArray: doc.querySelectorAll("." + selectorName + "Year"),
    docLinkArray: doc.querySelectorAll("." + selectorName + "Link"),
    docIconArray: doc.querySelectorAll("." + selectorName + "Icon"),
    docNumberArray: doc.querySelectorAll("." + selectorName + "Number"),
    docEstArray: doc.querySelectorAll("." + selectorName + "Est"),
    docEnArray: doc.querySelectorAll("." + selectorName + "En"),
    docEstEdArray: doc.querySelectorAll("." + selectorName + "EstEd"),
    docEnEdArray: doc.querySelectorAll("." + selectorName + "EnEd"),
    docEstKeyArray: doc.querySelectorAll("." + selectorName + "EstKey"),
    docEnKeyArray: doc.querySelectorAll("." + selectorName + "EnKey"),
    docCheckboxArray: doc.querySelectorAll("." + selectorName + "Checkbox"),
    docTextAreaArray: doc.querySelectorAll("." + selectorName + "TextArea"),
    docFileArray: doc.querySelectorAll("." + selectorName + "File"),
    docLabelArray: doc.querySelectorAll("." + selectorName + "Label"),
    docPlaceholderArray: doc.querySelectorAll("." + selectorName + "Placeholder"),
    docImgArray: doc.querySelectorAll("." + selectorName + "Img"),
    docHeadingArray: doc.querySelectorAll("." + selectorName + "Heading"),
    docDeleteBtnArray: doc.querySelectorAll("." + selectorName + "DeleteBtn")
  };

  // return the docArrays object

  return docArrays;
}


// function for getting the relevant arrays from the ajax response text for specifically the "dirigendid" subforms


function getDocDirigendidSubforms(doc) {

  // construct an object of the retrieved arrays

  var docDirigendidSubforms = {
    docSubformArray: doc.querySelectorAll(".dirigendidSubform"),
    docSubformPortreeArray: doc.querySelectorAll(".dirigendidPortree"),
    docSubformPortreeLabelArray: doc.querySelectorAll(".dirigendidPortreeLabel"),
    docSubformPortreePlaceholderArray: doc.querySelectorAll(".dirigendidPortreePlaceholder"),
    docSubformPortreeImgArray: doc.querySelectorAll(".dirigendidPortreeImg"),
    docSubformNimiArray: doc.querySelectorAll(".dirigendidNimi"),
    docSubformHeadingArray: doc.querySelectorAll(".dirigendidHeading"),
    docSubformSubmitBtnArray: doc.querySelectorAll(".dirigendidSubmitBtn"),
    docSubformLoikFormArray: doc.querySelectorAll(".dirigendidLoikForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".dirigendidLoikAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".dirigendidDeleteBtn")
  };

  // return the object

  return docDirigendidSubforms;
}


// function for getting the relevant arrays from the ajax response text for specifically the "ajalugu" subforms


function getDocAjaluguSubforms(doc) {

  // construct an object of the retrieved arrays

  var docAjaluguSubforms = {
    docSubformArray: doc.querySelectorAll(".ajaluguSubform"),
    docSubformHeadingArray: doc.querySelectorAll(".ajaluguHeading"),
    docSubformPealkiriEstArray: doc.querySelectorAll(".ajaluguPealkiriEst"),
    docSubformPealkiriEnArray: doc.querySelectorAll(".ajaluguPealkiriEn"),
    docSubformPealkiriHeadingArray: doc.querySelectorAll(".ajaluguPealkiriHeading"),
    docSubformSubmitBtnArray: doc.querySelectorAll(".ajaluguSubmitBtn"),
    docSubformLoikFormArray: doc.querySelectorAll(".ajaluguLoikForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".ajaluguLoikAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".ajaluguDeleteBtn")
  };

  // return the object

  return docAjaluguSubforms;
}


// function for getting the relevant arrays from the ajax response text for specifically the "sundmused" subforms


function getDocSundmusedSubforms(doc) {

  // construct an object of the retrieved arrays

  var docSundmusedSubforms = {
    docSubformArray: doc.querySelectorAll(".sundmusedSubform"),
    docSubformPealkiriEstArray: doc.querySelectorAll(".sundmusedPealkiriEst"),
    docSubformPealkiriEnArray: doc.querySelectorAll(".sundmusedPealkiriEn"),
    docSubformPlakatArray: doc.querySelectorAll(".sundmusedPlakat"),
    docSubformPlakatLabelArray: doc.querySelectorAll(".sundmusedPlakatLabel"),
    docSubformPlakatPlaceholderArray: doc.querySelectorAll(".sundmusedPlakatPlaceholder"),
    docSubformPlakatImgArray: doc.querySelectorAll(".sundmusedPlakatImg"),
    docSubformHeadingArray: doc.querySelectorAll(".sundmusedHeading"),
    docSubformSubmitBtnArray: doc.querySelectorAll(".sundmusedSubmitBtn"),
    docSubformLoikFormArray: doc.querySelectorAll(".sundmusedLoikForm"),
    docSubformLoikKohtFormArray: doc.querySelectorAll(".sundmusedLoikKohtForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".sundmusedLoikAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".sundmusedDeleteBtn")
  };

  // return the object

  return docSundmusedSubforms;
}


// function for getting the relevant arrays from the ajax response text for specifically the "pood" subforms


function getDocPoodSubforms(doc) {

  // construct an object of the retrieved arrays

  var docPoodSubforms = {
    docSubformArray: doc.querySelectorAll(".poodSubform"),
    docSubformToodeEstArray: doc.querySelectorAll(".poodToodeEst"),
    docSubformToodeEnArray: doc.querySelectorAll(".poodToodeEn"),
    docSubformToodeNumberArray: doc.querySelectorAll(".poodToodeNumber"),
    docSubformPiltArray: doc.querySelectorAll(".poodPilt"),
    docSubformPiltLabelArray: doc.querySelectorAll(".poodPiltLabel"),
    docSubformPiltPlaceholderArray: doc.querySelectorAll(".poodPiltPlaceholder"),
    docSubformPiltImgArray: doc.querySelectorAll(".poodPiltImg"),
    docSubformHeadingArray: doc.querySelectorAll(".poodHeading"),
    docSubformSubmitBtnArray: doc.querySelectorAll(".poodSubmitBtn"),
    docSubformLoikFormArray: doc.querySelectorAll(".poodLoikForm"),
    docSubformLoikNimistuFormArray: doc.querySelectorAll(".poodLoikNimistuForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".poodLoikAddBtn"),
    docSubformLoikNimistuAddBtnArray: doc.querySelectorAll(".poodLoikNimistuAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".poodDeleteBtn")
  };

  // return the object

  return docPoodSubforms;
}


// function for getting elements from each array which will be added to the page


function getDocElements(doc, selectorName) {

  // retrieve the arrays from the ajax response text

  var docArrays = getDocArrays(doc, selectorName);

  // get the last elements from each of these arrays, which will be the ones added to the page, and construct an object out of them

  var docElements = {
    docElement: getLastElement(docArrays.docArray),
    docYearElement: getLastElement(docArrays.docYearArray),
    docLinkElement: getLastElement(docArrays.docLinkArray),
    docIconElement: getLastElement(docArrays.docIconArray),
    docNumberElement: getLastElement(docArrays.docNumberArray),
    docEstElement: getLastElement(docArrays.docEstArray),
    docEnElement: getLastElement(docArrays.docEnArray),
    docEstEdElement: getLastElement(docArrays.docEstEdArray),
    docEnEdElement: getLastElement(docArrays.docEnEdArray),
    docEstKeyElement: getLastElement(docArrays.docEstKeyArray),
    docEnKeyElement: getLastElement(docArrays.docEnKeyArray),
    docCheckboxElement: getLastElement(docArrays.docCheckboxArray),
    docTextAreaElement: getLastElement(docArrays.docTextAreaArray),
    docFileElement: getLastElement(docArrays.docFileArray),
    docLabelElement: getLastElement(docArrays.docLabelArray),
    docPlaceholderElement: getLastElement(docArrays.docPlaceholderArray),
    docImgElement: getLastElement(docArrays.docImgArray),
    docHeadingElement: getLastElement(docArrays.docHeadingArray),
    docDeleteBtnElement: getLastElement(docArrays.docDeleteBtnArray)
  };

  // return the docElements object

  return docElements;
}


// get the last elements from each of the arrays related to the "dirigendid" subform (the ones, which will be added to the page)


function getDocDirigendidSubformElements(doc) {

  var docDirigendidSubforms = getDocDirigendidSubforms(doc);

  var docDirigendidSubformElements = {
    docSubformElement: getLastElement(docDirigendidSubforms.docSubformArray),
    docSubformPortreeElement: getLastElement(docDirigendidSubforms.docSubformPortreeArray),
    docSubformPortreeLabelElement: getLastElement(docDirigendidSubforms.docSubformPortreeLabelArray),
    docSubformPortreePlaceholderElement: getLastElement(docDirigendidSubforms.docSubformPortreePlaceholderArray),
    docSubformPortreeImgElement: getLastElement(docDirigendidSubforms.docSubformPortreeImgArray),
    docSubformNimiElement: getLastElement(docDirigendidSubforms.docSubformNimiArray),
    docSubformHeadingElement: getLastElement(docDirigendidSubforms.docSubformHeadingArray),
    docSubformSubmitBtnElement: getLastElement(docDirigendidSubforms.docSubformSubmitBtnArray),
    docSubformLoikFormElement: getLastElement(docDirigendidSubforms.docSubformLoikFormArray),
    docSubformLoikAddBtnElement: getLastElement(docDirigendidSubforms.docSubformLoikAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docDirigendidSubforms.docSubformDeleteBtnArray)
  };

  return docDirigendidSubformElements;
}


// get the last elements from each of the arrays related to the "ajalugu" subform (the ones, which will be added to the page)


function getDocAjaluguSubformElements(doc) {

  var docAjaluguSubforms = getDocAjaluguSubforms(doc);

  var docAjaluguSubformElements = {
    docSubformElement: getLastElement(docAjaluguSubforms.docSubformArray),
    docSubformHeadingElement: getLastElement(docAjaluguSubforms.docSubformHeadingArray),
    docSubformPealkiriEstElement: getLastElement(docAjaluguSubforms.docSubformPealkiriEstArray),
    docSubformPealkiriEnElement: getLastElement(docAjaluguSubforms.docSubformPealkiriEnArray),
    docSubformPealkiriHeadingElement: getLastElement(docAjaluguSubforms.docSubformPealkiriHeadingArray),
    docSubformSubmitBtnElement: getLastElement(docAjaluguSubforms.docSubformSubmitBtnArray),
    docSubformLoikFormElement: getLastElement(docAjaluguSubforms.docSubformLoikFormArray),
    docSubformLoikAddBtnElement: getLastElement(docAjaluguSubforms.docSubformLoikAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docAjaluguSubforms.docSubformDeleteBtnArray)
  };

  return docAjaluguSubformElements;
}


// get the last elements from each of the arrays related to the "sundmused" subform (the ones, which will be added to the page)


function getDocSundmusedSubformElements(doc) {

  var docSundmusedSubforms = getDocSundmusedSubforms(doc);

  var docSundmusedSubformElements = {
    docSubformElement: getLastElement(docSundmusedSubforms.docSubformArray),
    docSubformPealkiriEstElement: getLastElement(docSundmusedSubforms.docSubformPealkiriEstArray),
    docSubformPealkiriEnElement: getLastElement(docSundmusedSubforms.docSubformPealkiriEnArray),
    docSubformPlakatElement: getLastElement(docSundmusedSubforms.docSubformPlakatArray),
    docSubformPlakatLabelElement: getLastElement(docSundmusedSubforms.docSubformPlakatLabelArray),
    docSubformPlakatPlaceholderElement: getLastElement(docSundmusedSubforms.docSubformPlakatPlaceholderArray),
    docSubformPlakatImgElement: getLastElement(docSundmusedSubforms.docSubformPlakatImgArray),
    docSubformHeadingElement: getLastElement(docSundmusedSubforms.docSubformHeadingArray),
    docSubformSubmitBtnElement: getLastElement(docSundmusedSubforms.docSubformSubmitBtnArray),
    docSubformLoikFormElement: getLastElement(docSundmusedSubforms.docSubformLoikFormArray),
    docSubformLoikKohtFormElement: getLastElement(docSundmusedSubforms.docSubformLoikKohtFormArray),
    docSubformLoikAddBtnElement: getLastElement(docSundmusedSubforms.docSubformLoikAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docSundmusedSubforms.docSubformDeleteBtnArray)
  };

  return docSundmusedSubformElements;
}


// get the last elements from each of the arrays related to the "pood" subform (the ones, which will be added to the page)


function getDocPoodSubformElements(doc) {

  var docPoodSubforms = getDocPoodSubforms(doc);

  var docPoodSubformElements = {
    docSubformElement: getLastElement(docPoodSubforms.docSubformArray),
    docSubformToodeEstElement: getLastElement(docPoodSubforms.docSubformToodeEstArray),
    docSubformToodeEnElement: getLastElement(docPoodSubforms.docSubformToodeEnArray),
    docSubformToodeNumberElement: getLastElement(docPoodSubforms.docSubformToodeNumberArray),
    docSubformPiltElement: getLastElement(docPoodSubforms.docSubformPiltArray),
    docSubformPiltLabelElement: getLastElement(docPoodSubforms.docSubformPiltLabelArray),
    docSubformPiltPlaceholderElement: getLastElement(docPoodSubforms.docSubformPiltPlaceholderArray),
    docSubformPiltImgElement: getLastElement(docPoodSubforms.docSubformPiltImgArray),
    docSubformHeadingElement: getLastElement(docPoodSubforms.docSubformHeadingArray),
    docSubformSubmitBtnElement: getLastElement(docPoodSubforms.docSubformSubmitBtnArray),
    docSubformLoikFormElement: getLastElement(docPoodSubforms.docSubformLoikFormArray),
    docSubformLoikNimistuFormElement: getLastElement(docPoodSubforms.docSubformLoikNimistuFormArray),
    docSubformLoikAddBtnElement: getLastElement(docPoodSubforms.docSubformLoikAddBtnArray),
    docSubformLoikNimistuAddBtnElement: getLastElement(docPoodSubforms.docSubformLoikNimistuAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docPoodSubforms.docSubformDeleteBtnArray)
  };

  return docPoodSubformElements;
}




// FUNCTIONS FOR ADDING AND DELETING DOM ELEMENTS ASYNCHRONOUSLY




// function for deleting elements from the page and database


function commenceDelete(event, target, destination, subform) {

  // remove the popup from the screen

  removeMessage(deletePopup);

  // check, if the subform input has been specified as "dirigendid"

  if (subform === "dirigendid") {

    // if yes, get the parent element of the target input

    var dirigendidParent = getParent(target);

    // get the the relevant attributes of the deleted subform

    var dirigendidSubformData = getDirigendidSubformData(dirigendidParent);

    // the parent element is the one we want to delete- call the below function to do that

    deleteDirigendidSubform(dirigendidParent, dirigendidSubformData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeleteDirigendidData(dirigendidParent);
    }, destination + "/delete", "delete"));

    // check, if the subform input has been specified as "ajalugu"

  } else if (subform === "ajalugu") {

    // if yes, get the parent element of the target input

    var ajaluguParent = getParent(target);

    // get the the relevant attributes of the deleted subform

    var ajaluguSubformData = getAjaluguSubformData(ajaluguParent);

    // the parent element is the one we want to delete- call the below function to do that

    deleteAjaluguSubform(ajaluguParent, ajaluguSubformData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeleteAjaluguData(ajaluguParent);
    }, destination + "/delete", "delete"));

    // check, if the subform input has been specified as "sundmused"

  } else if (subform === "sundmused") {

    // if yes, get the parent element of the target input

    var sundmusedParent = getParent(target);

    // also get the index number of the deleted subform, this is contained in the id of the parent element

    var idNumber = sundmusedParent.id.slice(9, -7);

    // also get some DOM elements from the subform, the existence or values of which will determine
    // if the particular subform will be sent to the archive or deleted outright

    var loikEstArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikEst"));
    var loikKohtEstArray = Array.from(document.querySelectorAll(".sundmused" + idNumber + "LoikKohtEst"));
    var pealkiriEst = document.getElementById("sundmused" + idNumber + "PealkiriEst");
    var pealkiriEn = document.getElementById("sundmused" + idNumber + "PealkiriEn");

    // check if any of the dynamic elements exist or if the "pealkiri" inputs have any value

    var textQuery = (loikEstArray.length !== 0 || loikKohtEstArray.length !== 0 || pealkiriEst.value !== "" || pealkiriEn.value !== "");

    // get the the relevant attributes of the deleted subform

    var sundmusedSubformData = getSundmusedSubformData(sundmusedParent);

    // the parent element is the one we want to delete- call the below function to do that

    deleteSundmusedSubform(sundmusedParent, sundmusedSubformData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeleteSundmusedData(sundmusedParent, textQuery);
    }, destination + "/delete", "delete"));

    // check, if the subform input has been specified as "pood"

  } else if (subform === "pood") {

    // if yes, get the parent element of the target input

    var poodParent = getParent(target);

    // get the the relevant attributes of the deleted subform

    var poodSubformData = getPoodSubformData(poodParent);

    // the parent element is the one we want to delete- call the below function to do that

    deletePoodSubform(poodParent, poodSubformData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeletePoodData(poodParent);
    }, destination + "/delete", "delete"));

    // check, if the subform input has been specified as "moodunud"

  } else if (subform === "moodunud") {

    // if yes, get the parent element of the target input

    var moodunudParent = getParent(target);

    // get the the relevant attributes of the deleted subform

    var moodunudSubformData = getMoodunudSubformData(moodunudParent);

    // the parent element is the one we want to delete- call the below function to do that

    deleteMoodunudSubform(moodunudParent, moodunudSubformData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeleteMoodunudData(moodunudParent);
    }, destination + "/delete", "delete"));

  } else {

    // if the subform hasn't been specified, get the attributes of the element about to be deleted

    var elementData = getElementData(target);

    // delete the element from the page

    deleteElement(target, elementData);

    // call an ajax request to delete relevant data from the database

    ajaxBodyParser(event, new BodyParserParam(function() {
      return createDeleteData(target);
    }, destination + "/delete", "delete"));
  }
}


// function for deleting a "loik" element from the page


function deleteElement(element, elementData) {
  element.parentNode.removeChild(element);

  // update the node lists, which are affected by the element deletion

  updateArrays(element, elementData);
}


//function for deleting a "dirigendid" subform from the page


function deleteDirigendidSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateDirigendidSubforms(element, elementData);
}


//function for deleting an "ajalugu" subform from the page


function deleteAjaluguSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateAjaluguSubforms(element, elementData);
}


//function for deleting a "sundmused" subform from the page


function deleteSundmusedSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateSundmusedSubforms(element, elementData);
}


//function for deleting a "pood" subform from the page


function deletePoodSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updatePoodSubforms(element, elementData);
}


//function for deleting a "moodunud" subform from the page


function deleteMoodunudSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateMoodunudSubforms(element, elementData);
}



// function for updating the arrays affected by the deletion of a "loik" element


function updateArrays(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.arrays.array.splice(elementData.arrayIndex, 1);
  elementData.arrays.yearArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.linkArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.iconArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.numberArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.estArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.enArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.estEdArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.enEdArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.estKeyArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.enKeyArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.checkboxArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.textAreaArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.fileArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.labelArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.placeholderArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.imgArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.headingArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.deleteBtnArray.splice(elementData.arrayIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateProperties(elementData);
}


// function for updating the arrays affected by the deletion of a "dirigendid" subform


function updateDirigendidSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPortreeArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPortreeLabelArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPortreePlaceholderArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPortreeImgArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformNimiArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateDirigendidSubformProperties(elementData);
}


// function for updating the arrays affected by the deletion of a "ajalugu" subform


function updateAjaluguSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEstArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateAjaluguSubformProperties(elementData);
}


// function for updating the arrays affected by the deletion of a "sundmused" subform


function updateSundmusedSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEstArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatLabelArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatPlaceholderArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatImgArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtLinkArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateSundmusedSubformProperties(elementData);
}


// function for updating the arrays affected by the deletion of a "pood" subform


function updatePoodSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformToodeEstArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformToodeEnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformToodeNumberArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPiltArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPiltLabelArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPiltPlaceholderArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPiltImgArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikNimistuDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updatePoodSubformProperties(elementData);
}


// function for updating the arrays affected by the deletion of a "moodunud" subform


function updateMoodunudSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEstArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPealkiriEnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatLabelArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatPlaceholderArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformPlakatImgArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformSubmitBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnEdArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtLinkArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikKohtDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateMoodunudSubformProperties(elementData);
}



// function for updating the properties of the DOM elements inside altered "loik" -related node lists


function updateProperties(elementData) {

  for (var i = 0; i < elementData.arrays.array.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    if (elementData.arrays.array[i] !== undefined) {
      elementData.arrays.array[i].setAttribute("id", elementData.arrayNames.arrayName + idNumber);
      elementData.arrays.array[i].setAttribute("name", elementData.arrayNames.arrayName + idNumber);
    }
    if (elementData.arrays.yearArray[i] !== undefined) {
      elementData.arrays.yearArray[i].setAttribute("id", elementData.arrayNames.arrayNameYear + idNumber);
      elementData.arrays.yearArray[i].setAttribute("name", elementData.arrayNames.arrayNameYear + idNumber);
    }
    if (elementData.arrays.linkArray[i] !== undefined) {
      elementData.arrays.linkArray[i].setAttribute("id", elementData.arrayNames.arrayNameLink + idNumber);
      elementData.arrays.linkArray[i].setAttribute("name", elementData.arrayNames.arrayNameLink + idNumber);
    }
    if (elementData.arrays.iconArray[i] !== undefined) {
      elementData.arrays.iconArray[i].setAttribute("id", elementData.arrayNames.arrayNameIcon + idNumber);
      elementData.arrays.iconArray[i].setAttribute("name", elementData.arrayNames.arrayNameIcon + idNumber);
    }
    if (elementData.arrays.numberArray[i] !== undefined) {
      elementData.arrays.numberArray[i].setAttribute("id", elementData.arrayNames.arrayNameNumber + idNumber);
      elementData.arrays.numberArray[i].setAttribute("name", elementData.arrayNames.arrayNameNumber + idNumber);
    }
    if (elementData.arrays.estArray[i] !== undefined) {
      elementData.arrays.estArray[i].setAttribute("id", elementData.arrayNames.arrayNameEst + idNumber);
      elementData.arrays.estArray[i].setAttribute("name", elementData.arrayNames.arrayNameEst + idNumber);
    }
    if (elementData.arrays.enArray[i] !== undefined) {
      elementData.arrays.enArray[i].setAttribute("id", elementData.arrayNames.arrayNameEn + idNumber);
      elementData.arrays.enArray[i].setAttribute("name", elementData.arrayNames.arrayNameEn + idNumber);
    }
    if (elementData.arrays.estEdArray[i] !== undefined) {
      elementData.arrays.estEdArray[i].setAttribute("id", elementData.arrayNames.arrayNameEst + idNumber + "Ed");
      elementData.arrays.estEdArray[i].setAttribute("name", elementData.arrayNames.arrayNameEst + idNumber + "Ed");
    }
    if (elementData.arrays.enEdArray[i] !== undefined) {
      elementData.arrays.enEdArray[i].setAttribute("id", elementData.arrayNames.arrayNameEn + idNumber + "Ed");
      elementData.arrays.enEdArray[i].setAttribute("name", elementData.arrayNames.arrayNameEn + idNumber + "Ed");
    }
    if (elementData.arrays.estKeyArray[i] !== undefined) {
      elementData.arrays.estKeyArray[i].setAttribute("id", elementData.arrayNames.arrayNameEstKey + idNumber);
      elementData.arrays.estKeyArray[i].setAttribute("name", elementData.arrayNames.arrayNameEstKey + idNumber);
    }
    if (elementData.arrays.enKeyArray[i] !== undefined) {
      elementData.arrays.enKeyArray[i].setAttribute("id", elementData.arrayNames.arrayNameEnKey + idNumber);
      elementData.arrays.enKeyArray[i].setAttribute("name", elementData.arrayNames.arrayNameEnKey + idNumber);
    }
    if (elementData.arrays.checkboxArray[i] !== undefined) {
      elementData.arrays.checkboxArray[i].setAttribute("id", elementData.arrayNames.arrayNameCheckbox + idNumber);
      elementData.arrays.checkboxArray[i].setAttribute("name", elementData.arrayNames.arrayNameCheckbox + idNumber);
    }
    if (elementData.arrays.textAreaArray[i] !== undefined) {
      elementData.arrays.textAreaArray[i].setAttribute("id", elementData.arrayNames.arrayNameTextArea + idNumber);
      elementData.arrays.textAreaArray[i].setAttribute("name", elementData.arrayNames.arrayNameTextArea + idNumber);
    }
    if (elementData.arrays.fileArray[i] !== undefined) {
      elementData.arrays.fileArray[i].setAttribute("id", elementData.arrayNames.arrayNameFile + idNumber);
      elementData.arrays.fileArray[i].setAttribute("name", elementData.arrayNames.arrayNameFile + idNumber);
    }
    if (elementData.arrays.labelArray[i] !== undefined) {
      elementData.arrays.labelArray[i].setAttribute("id", elementData.arrayNames.arrayNameLabel + idNumber);
      elementData.arrays.labelArray[i].setAttribute("for", elementData.arrayNames.arrayNameFile + idNumber);
    }
    if (elementData.arrays.placeholderArray[i] !== undefined) {
      elementData.arrays.placeholderArray[i].setAttribute("id", elementData.arrayNames.arrayNamePlaceholder + idNumber);
    }
    if (elementData.arrays.imgArray[i] !== undefined) {
      elementData.arrays.imgArray[i].setAttribute("id", elementData.arrayNames.arrayNameImg + idNumber);
      elementData.arrays.imgArray[i].setAttribute("alt", elementData.headingName + idNumber);
    }
    if (elementData.arrays.deleteBtnArray[i] !== undefined) {
      elementData.arrays.deleteBtnArray[i].setAttribute("id", elementData.arrayNames.arrayNameDeleteBtn + idNumber);
      elementData.arrays.deleteBtnArray[i].setAttribute("name", elementData.arrayNames.arrayNameDeleteBtn + idNumber);
    }
    if (elementData.arrays.headingArray[i] !== undefined) {
      elementData.arrays.headingArray[i].innerHTML = elementData.headingName + " " + idNumber;
    }
  }
}


// function for updating the properties of the DOM elements inside the altered "dirigendid" subforms


function updateDirigendidSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the "dirigendid" subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "dirigendid" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "dirigendid" + idNumber + "Subform");
    elementData.subforms.subformPortreeArray[i].setAttribute("id", "dirigendid" + idNumber + "Portree");
    elementData.subforms.subformPortreeArray[i].setAttribute("name", "dirigendid" + idNumber + "Portree");
    elementData.subforms.subformPortreeLabelArray[i].setAttribute("id", "dirigendid" + idNumber + "PortreeLabel");
    elementData.subforms.subformPortreeLabelArray[i].setAttribute("name", "dirigendid" + idNumber + "PortreeLabel");
    elementData.subforms.subformPortreeLabelArray[i].setAttribute("for", "dirigendid" + idNumber + "Portree");
    elementData.subforms.subformPortreePlaceholderArray[i].setAttribute("id", "dirigendid" + idNumber + "PortreePlaceholder");
    elementData.subforms.subformPortreePlaceholderArray[i].setAttribute("name", "dirigendid" + idNumber + "PortreePlaceholder");
    elementData.subforms.subformPortreeImgArray[i].setAttribute("id", "dirigendid" + idNumber + "PortreeImg");
    elementData.subforms.subformPortreeImgArray[i].setAttribute("name", "dirigendid" + idNumber + "PortreeImg");
    elementData.subforms.subformPortreeImgArray[i].setAttribute("alt", "Portree " + idNumber);
    elementData.subforms.subformNimiArray[i].setAttribute("id", "dirigendid" + idNumber + "Nimi");
    elementData.subforms.subformNimiArray[i].setAttribute("name", "dirigendid" + idNumber + "Nimi");
    elementData.subforms.subformHeadingArray[i].setAttribute("id", "dirigendid" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "dirigendid" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "Dirigent " + idNumber;
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("id", "dirigendid" + idNumber + "SubmitBtn");
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("name", "dirigendid" + idNumber + "SubmitBtn");
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "dirigendid" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "dirigendid" + idNumber + "LoikForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "dirigendid" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "dirigendid" + idNumber + "LoikAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "dirigendid" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "dirigendid" + idNumber + "DeleteBtn");

    // loop through all the "loik" components on every "dirigendid" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "dirigendid" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "dirigendid" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "dirigendid" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstEdArrays[i][a].classList), "dirigendid" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnEdArrays[i][a].classList), "dirigendid" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "dirigendid" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "dirigendid" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "dirigendid" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "dirigendid" + idNumber + "LoikDeleteBtn" + indexNumber);
    }
  }
}


// function for updating the properties of the DOM elements inside the altered "ajalugu" subforms


function updateAjaluguSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the "ajalugu" subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "ajalugu" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "ajalugu" + idNumber + "Subform");
    elementData.subforms.subformHeadingArray[i].setAttribute("id", "ajalugu" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "ajalugu" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "Sektsioon " + idNumber;
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("id", "ajalugu" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("name", "ajalugu" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("id", "ajalugu" + idNumber + "PealkiriEn");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("name", "ajalugu" + idNumber + "PealkiriEn");
    elementData.subforms.subformPealkiriHeadingArray[i].setAttribute("id", "ajalugu" + idNumber + "PealkiriHeading");
    elementData.subforms.subformPealkiriHeadingArray[i].setAttribute("name", "ajalugu" + idNumber + "PealkiriHeading");
    elementData.subforms.subformPealkiriHeadingArray[i].innerHTML = "Sektsiooni pealkiri " + idNumber;
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("id", "ajalugu" + idNumber + "SubmitBtn");
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("name", "ajalugu" + idNumber + "SubmitBtn");
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "ajalugu" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "ajalugu" + idNumber + "LoikForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "ajalugu" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "ajalugu" + idNumber + "LoikAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "ajalugu" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "ajalugu" + idNumber + "DeleteBtn");

    // loop through all the "loik" components on every "ajalugu" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "ajalugu" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "ajalugu" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "ajalugu" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstEdArrays[i][a].classList), "ajalugu" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnEdArrays[i][a].classList), "ajalugu" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "ajalugu" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "ajalugu" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "ajalugu" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "ajalugu" + idNumber + "LoikDeleteBtn" + indexNumber);
    }
  }
}


// function for updating the properties of the DOM elements inside the altered "sundmused" subforms


function updateSundmusedSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the "sundmused" subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "sundmused" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "sundmused" + idNumber + "Subform");
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("id", "sundmused" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("name", "sundmused" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("id", "sundmused" + idNumber + "PealkiriEn");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("name", "sundmused" + idNumber + "PealkiriEn");
    elementData.subforms.subformPlakatArray[i].setAttribute("id", "sundmused" + idNumber + "Plakat");
    elementData.subforms.subformPlakatArray[i].setAttribute("name", "sundmused" + idNumber + "Plakat");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("id", "sundmused" + idNumber + "PlakatLabel");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("name", "sundmused" + idNumber + "PlakatLabel");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("for", "sundmused" + idNumber + "Plakat");
    elementData.subforms.subformPlakatPlaceholderArray[i].setAttribute("id", "sundmused" + idNumber + "PlakatPlaceholder");
    elementData.subforms.subformPlakatPlaceholderArray[i].setAttribute("name", "sundmused" + idNumber + "PlakatPlaceholder");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("id", "sundmused" + idNumber + "PlakatImg");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("name", "sundmused" + idNumber + "PlakatImg");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("alt", "Plakat " + idNumber);
    elementData.subforms.subformHeadingArray[i].setAttribute("id", "sundmused" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "sundmused" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "Sündmus " + idNumber;
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("id", "sundmused" + idNumber + "SubmitBtn");
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("name", "sundmused" + idNumber + "SubmitBtn");
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "sundmused" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "sundmused" + idNumber + "LoikForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "sundmused" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "sundmused" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikKohtFormArray[i].setAttribute("id", "sundmused" + idNumber + "LoikKohtForm");
    elementData.subforms.subformLoikKohtFormArray[i].setAttribute("name", "sundmused" + idNumber + "LoikKohtForm");
    elementData.subforms.subformLoikKohtAddBtnArray[i].setAttribute("id", "sundmused" + idNumber + "LoikKohtAddBtn");
    elementData.subforms.subformLoikKohtAddBtnArray[i].setAttribute("name", "sundmused" + idNumber + "LoikKohtAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "sundmused" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "sundmused" + idNumber + "DeleteBtn");

    // loop through all the "loik" components on every "sundmused" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "sundmused" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "sundmused" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "sundmused" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "sundmused" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "sundmused" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstEdArrays[i][a].classList), "sundmused" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnEdArrays[i][a].classList), "sundmused" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "sundmused" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "sundmused" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "sundmused" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "sundmused" + idNumber + "LoikDeleteBtn" + indexNumber);
    }

    // / loop through all the "loikKoht" components on every "sundmused" subform and update their attributes

    for (var b = 0; b < elementData.subforms.subformLoikKohtArrays[i].length; b++) {

      // the indexNumber in the end of the "loikKoht" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumberKoht = b + 1;

      // update all the attributes

      elementData.subforms.subformLoikKohtArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtArrays[i][b].classList), "sundmused" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEstArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEnArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtLinkArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtHeadingArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].innerHTML = "Aeg ja koht " + indexNumberKoht;
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].setAttribute("id", "sundmused" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].setAttribute("name", "sundmused" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
    }
  }
}


// function for updating the properties of the DOM elements inside the altered "pood" subforms


function updatePoodSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the "pood" subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "pood" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "pood" + idNumber + "Subform");
    elementData.subforms.subformToodeEstArray[i].setAttribute("id", "pood" + idNumber + "ToodeEst");
    elementData.subforms.subformToodeEstArray[i].setAttribute("name", "pood" + idNumber + "ToodeEst");
    elementData.subforms.subformToodeEnArray[i].setAttribute("id", "pood" + idNumber + "ToodeEn");
    elementData.subforms.subformToodeEnArray[i].setAttribute("name", "pood" + idNumber + "ToodeEn");
    elementData.subforms.subformToodeNumberArray[i].setAttribute("id", "pood" + idNumber + "ToodeNumber");
    elementData.subforms.subformToodeNumberArray[i].setAttribute("name", "pood" + idNumber + "ToodeNumber");
    elementData.subforms.subformPiltArray[i].setAttribute("id", "pood" + idNumber + "Pilt");
    elementData.subforms.subformPiltArray[i].setAttribute("name", "pood" + idNumber + "Pilt");
    elementData.subforms.subformPiltLabelArray[i].setAttribute("id", "pood" + idNumber + "PiltLabel");
    elementData.subforms.subformPiltLabelArray[i].setAttribute("name", "pood" + idNumber + "PiltLabel");
    elementData.subforms.subformPiltLabelArray[i].setAttribute("for", "pood" + idNumber + "Pilt");
    elementData.subforms.subformPiltPlaceholderArray[i].setAttribute("id", "pood" + idNumber + "PiltPlaceholder");
    elementData.subforms.subformPiltPlaceholderArray[i].setAttribute("name", "pood" + idNumber + "PiltPlaceholder");
    elementData.subforms.subformPiltImgArray[i].setAttribute("id", "pood" + idNumber + "PiltImg");
    elementData.subforms.subformPiltImgArray[i].setAttribute("name", "pood" + idNumber + "PiltImg");
    elementData.subforms.subformPiltImgArray[i].setAttribute("alt", "Pilt " + idNumber);
    elementData.subforms.subformHeadingArray[i].setAttribute("id", "pood" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "pood" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "Toode " + idNumber;
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("id", "pood" + idNumber + "SubmitBtn");
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("name", "pood" + idNumber + "SubmitBtn");
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "pood" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "pood" + idNumber + "LoikForm");
    elementData.subforms.subformLoikNimistuFormArray[i].setAttribute("id", "pood" + idNumber + "LoikNimistuForm");
    elementData.subforms.subformLoikNimistuFormArray[i].setAttribute("name", "pood" + idNumber + "LoikNimistuForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "pood" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "pood" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikNimistuAddBtnArray[i].setAttribute("id", "pood" + idNumber + "LoikNimistuAddBtn");
    elementData.subforms.subformLoikNimistuAddBtnArray[i].setAttribute("name", "pood" + idNumber + "LoikNimistuAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "pood" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "pood" + idNumber + "DeleteBtn");

    // loop through all the "loik" components on every "pood" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "pood" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "pood" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "pood" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "pood" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "pood" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstEdArrays[i][a].classList), "pood" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnEdArrays[i][a].classList), "pood" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "pood" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "pood" + idNumber + "LoikDeleteBtn" + indexNumber);
    }

    // loop through all the "loikNimistu" components on every "pood" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loikNimistu" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumberNimistu = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikNimistuArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistu" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistu" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuArrays[i][a].classList), "pood" + idNumber + "LoikNimistu" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuEst" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuEst" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuEstArrays[i][a].classList), "pood" + idNumber + "LoikNimistuEst" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuEn" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuEn" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuEnArrays[i][a].classList), "pood" + idNumber + "LoikNimistuEn" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstEdArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuEstEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstEdArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuEstEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuEstEdArrays[i][a].classList), "pood" + idNumber + "LoikNimistuEstEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnEdArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuEnEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnEdArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuEnEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuEnEdArrays[i][a].classList), "pood" + idNumber + "LoikNimistuEnEd" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuHeadingArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuHeading" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuHeadingArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuHeading" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuHeadingArrays[i][a].classList), "pood" + idNumber + "LoikNimistuHeading" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuHeadingArrays[i][a].innerHTML = "Träkk " + indexNumberNimistu;
      elementData.subforms.subformLoikNimistuDeleteBtnArrays[i][a].setAttribute("id", "pood" + idNumber + "LoikNimistuDeleteBtn" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuDeleteBtnArrays[i][a].setAttribute("name", "pood" + idNumber + "LoikNimistuDeleteBtn" + indexNumberNimistu);
      elementData.subforms.subformLoikNimistuDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikNimistuDeleteBtnArrays[i][a].classList), "pood" + idNumber + "LoikNimistuDeleteBtn" + indexNumberNimistu);
    }
  }
}


// function for updating the properties of the DOM elements inside the altered "moodunud" subforms


function updateMoodunudSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the "moodunud" subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "moodunud" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "moodunud" + idNumber + "Subform");
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("id", "moodunud" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEstArray[i].setAttribute("name", "moodunud" + idNumber + "PealkiriEst");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("id", "moodunud" + idNumber + "PealkiriEn");
    elementData.subforms.subformPealkiriEnArray[i].setAttribute("name", "moodunud" + idNumber + "PealkiriEn");
    elementData.subforms.subformPlakatArray[i].setAttribute("id", "moodunud" + idNumber + "Plakat");
    elementData.subforms.subformPlakatArray[i].setAttribute("name", "moodunud" + idNumber + "Plakat");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("id", "moodunud" + idNumber + "PlakatLabel");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("name", "moodunud" + idNumber + "PlakatLabel");
    elementData.subforms.subformPlakatLabelArray[i].setAttribute("for", "moodunud" + idNumber + "Plakat");
    elementData.subforms.subformPlakatPlaceholderArray[i].setAttribute("id", "moodunud" + idNumber + "PlakatPlaceholder");
    elementData.subforms.subformPlakatPlaceholderArray[i].setAttribute("name", "moodunud" + idNumber + "PlakatPlaceholder");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("id", "moodunud" + idNumber + "PlakatImg");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("name", "moodunud" + idNumber + "PlakatImg");
    elementData.subforms.subformPlakatImgArray[i].setAttribute("alt", "Plakat " + idNumber);
    elementData.subforms.subformHeadingArray[i].setAttribute("id", "moodunud" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "moodunud" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "Sündmus " + idNumber;
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("id", "moodunud" + idNumber + "SubmitBtn");
    elementData.subforms.subformSubmitBtnArray[i].setAttribute("name", "moodunud" + idNumber + "SubmitBtn");
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "moodunud" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "moodunud" + idNumber + "LoikForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "moodunud" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "moodunud" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikKohtFormArray[i].setAttribute("id", "moodunud" + idNumber + "LoikKohtForm");
    elementData.subforms.subformLoikKohtFormArray[i].setAttribute("name", "moodunud" + idNumber + "LoikKohtForm");
    elementData.subforms.subformLoikKohtAddBtnArray[i].setAttribute("id", "moodunud" + idNumber + "LoikKohtAddBtn");
    elementData.subforms.subformLoikKohtAddBtnArray[i].setAttribute("name", "moodunud" + idNumber + "LoikKohtAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "moodunud" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "moodunud" + idNumber + "DeleteBtn");

    // loop through all the "loik" components on every "moodunud" subform and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "moodunud" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "moodunud" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "moodunud" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "moodunud" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "moodunud" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEstEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstEdArrays[i][a].classList), "moodunud" + idNumber + "LoikEstEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikEnEdArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnEdArrays[i][a].classList), "moodunud" + idNumber + "LoikEnEd" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "moodunud" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "moodunud" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "moodunud" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "moodunud" + idNumber + "LoikDeleteBtn" + indexNumber);
    }

    // / loop through all the "loikKoht" components on every "moodunud" subform and update their attributes

    for (var b = 0; b < elementData.subforms.subformLoikKohtArrays[i].length; b++) {

      // the indexNumber in the end of the "loikKoht" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumberKoht = b + 1;

      // update all the attributes

      elementData.subforms.subformLoikKohtArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtArrays[i][b].classList), "moodunud" + idNumber + "LoikKoht" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEstArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEstArrays[i][b].classList), "moodunud" + idNumber + "LoikKohtEst" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtEnArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEnArrays[i][b].classList), "moodunud" + idNumber + "LoikKohtEn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtLinkArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEnArrays[i][b].classList), "moodunud" + idNumber + "LoikKohtLink" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtHeadingArrays[i][b].classList), "moodunud" + idNumber + "LoikKohtHeading" + indexNumberKoht);
      elementData.subforms.subformLoikKohtHeadingArrays[i][b].innerHTML = "Aeg ja koht " + indexNumberKoht;
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].setAttribute("id", "moodunud" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].setAttribute("name", "moodunud" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
      elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtDeleteBtnArrays[i][b].classList), "moodunud" + idNumber + "LoikKohtDeleteBtn" + indexNumberKoht);
    }
  }
}


// function for dynamically retrieving all the node lists that are affected by a "loik" element deletion


function getElementData(element) {

  // get the classlist of the provided element

  var classList = element.classList;

  // the last selector in the classlist is also the name of the relevant subform

  var selectorName = getLastElement(classList);

  // using the selector and data retrieving functions, construct an elementData object that contains all the infomation about relevant arrays

  var elementData = {
    arrays: getArrays(selectorName),
    arrayNames: getArrayNames(selectorName),
    arrayIndex: getArrayIndex(element, selectorName),
    headingName: element.dataset.heading
  };

  // return the elementData Object

  return elementData;

}


// function for retrieving all the node lists that are affected by a "dirigendid" subform deletion


function getDirigendidSubformData(element) {

  // create an object from the relevant "dirigendid" subform data

  var dirigendidSubformData = {
    subforms: getDirigendidSubforms(),
    subformIndex: getDirigendidSubformIndex(element)
  };

  // return the object

  return dirigendidSubformData;
}


// function for retrieving all the node lists that are affected by a "ajalugu" subform deletion


function getAjaluguSubformData(element) {

  // create an object from the relevant "ajalugu" subform data

  var ajaluguSubformData = {
    subforms: getAjaluguSubforms(),
    subformIndex: getAjaluguSubformIndex(element)
  };

  // return the object

  return ajaluguSubformData;
}


// function for retrieving all the node lists that are affected by a "sundmused" subform deletion


function getSundmusedSubformData(element) {

  // create an object from the relevant "sundmused" subform data

  var sundmusedSubformData = {
    subforms: getSundmusedSubforms(),
    subformIndex: getSundmusedSubformIndex(element)
  };

  // return the object

  return sundmusedSubformData;
}


// function for retrieving all the node lists that are affected by a "pood" subform deletion


function getPoodSubformData(element) {

  // create an object from the relevant "pood" subform data

  var poodSubformData = {
    subforms: getPoodSubforms(),
    subformIndex: getPoodSubformIndex(element)
  };

  // return the object

  return poodSubformData;
}


// function for retrieving all the node lists that are affected by a "moodunud" subform deletion


function getMoodunudSubformData(element) {

  // create an object from the relevant "moodunud" subform data

  var moodunudSubformData = {
    subforms: getMoodunudSubforms(),
    subformIndex: getMoodunudSubformIndex(element)
  };


  // return the object
  return moodunudSubformData;
}



// add an element


function addElement(event, doc, destination, subform) {

  // check if the subform is specified as "dirigendid"

  if (subform === "dirigendid") {

    // get the relevant subform arrays

    var dirigendidSubforms = getDirigendidSubforms();

    // get the relevant subform arrays from the not yet visible updated version of the page

    var docDirigendidSubform = getDocDirigendidSubforms(doc);

    // get the last elements of each of the arrays in the docDirigendidSubform object

    var docDirigendidSubformElements = getDocDirigendidSubformElements(doc);

    // push those elements into the existing subform arrays, so that those elements will become visible

    var newDirigendidSubforms = pushDirigendidSubform(dirigendidSubforms, docDirigendidSubformElements);

    // get the relevant form

    var dirigendidForm = document.getElementById("dirigendidForm");

    // call the appendSubform function

    appendSubform(dirigendidForm, docDirigendidSubformElements);

    // check if the subform is specified as "ajalugu"

  } else if (subform === "ajalugu") {

    // get the relevant subform arrays

    var ajaluguSubforms = getAjaluguSubforms();

    // get the relevant subform arrays from the not yet visible updated version of the page

    var docAjaluguSubform = getDocAjaluguSubforms(doc);

    // get the last elements of each of the arrays in the docAjaluguSubform object

    var docAjaluguSubformElements = getDocAjaluguSubformElements(doc);

    // push those elements into the existing subform arrays, so that those elements will become visible

    var newAjaluguSubforms = pushAjaluguSubform(ajaluguSubforms, docAjaluguSubformElements);

    // get the relevant form

    var ajaluguForm = document.getElementById("ajaluguForm");

    // call the appendSubform function

    appendSubform(ajaluguForm, docAjaluguSubformElements);

    // check if the subform is specified as "sundmused"

  } else if (subform === "sundmused") {

    // get the relevant subform arrays

    var sundmusedSubforms = getSundmusedSubforms();

    // get the relevant subform arrays from the not yet visible updated version of the page

    var docSundmusedSubform = getDocSundmusedSubforms(doc);

    // get the last elements of each of the arrays in the docSundmusedSubform object

    var docSundmusedSubformElements = getDocSundmusedSubformElements(doc);

    // push those elements into the existing subform arrays, so that those elements will become visible

    var newSundmusedSubforms = pushSundmusedSubform(sundmusedSubforms, docSundmusedSubformElements);

    // get the relevant form

    var sundmusedForm = document.getElementById("sundmusedForm");

    // call the appendSubform function

    appendSubform(sundmusedForm, docSundmusedSubformElements);

    // check if the subform is specified as "pood"

  } else if (subform === "pood") {

    // get the relevant subform arrays

    var poodSubforms = getPoodSubforms();

    // get the relevant subform arrays from the not yet visible updated version of the page

    var docPoodSubform = getDocPoodSubforms(doc);

    // get the last elements of each of the arrays in the docPoodSubform object

    var docPoodSubformElements = getDocPoodSubformElements(doc);

    // push those elements into the existing subform arrays, so that those elements will become visible

    var newPoodSubforms = pushPoodSubform(poodSubforms, docPoodSubformElements);

    // get the relevant form

    var poodForm = document.getElementById("poodForm");

    // call the appendSubform function

    appendSubform(poodForm, docPoodSubformElements);

  } else {

    // use the event target id to get the selector name that will be used to retrieve necessary element arrays

    var selectorName = event.target.id.slice(0, -6);

    // get the relevant DOM arrays from the actual page, using the retrieved selector

    var arrays = getArrays(selectorName);

    // get the same arrays from the ajax text response

    var docArrays = getDocArrays(doc, selectorName);

    // get the last element of each of those arrays retrieved from the ajax text response (which will be the ones added to the actual page)

    var docElements = getDocElements(doc, selectorName);

    // push the new elements to the the arrays on the actual page

    var newArrays = pushArrays(arrays, docElements);

    var fileArray = newArrays.fileArray;

    if (fileArray.length !== 0) {

      for (var i = 0; i < fileArray.length; i++) {
        changePreview(fileArray[i], i);
      }

    }

    // get the container form from its selector name

    var form = document.getElementById(selectorName + "Form");

    // display the new subform with all the new elements on the page

    appendElement(form, docElements);
  }
}


// function for pushing the asynchronously added elements to the arrays on the actual page


function pushArrays(arrays, elements) {

  arrays.array.push(elements.docElement);
  arrays.yearArray.push(elements.docYearElement);
  arrays.linkArray.push(elements.docLinkElement);
  arrays.iconArray.push(elements.docIconElement);
  arrays.numberArray.push(elements.docNumberElement);
  arrays.estArray.push(elements.docEstElement);
  arrays.enArray.push(elements.docEnElement);
  arrays.estEdArray.push(elements.docEstEdElement);
  arrays.enEdArray.push(elements.docEnEdElement);
  arrays.estKeyArray.push(elements.docEstKeyElement);
  arrays.enKeyArray.push(elements.docEnKeyElement);
  arrays.checkboxArray.push(elements.docCheckboxElement);
  arrays.textAreaArray.push(elements.docTextAreaElement);
  arrays.fileArray.push(elements.docFileElement);
  arrays.labelArray.push(elements.docLabelElement);
  arrays.placeholderArray.push(elements.docPlaceholderElement);
  arrays.imgArray.push(elements.docImgElement);
  arrays.headingArray.push(elements.docHeadingElement);
  arrays.deleteBtnArray.push(elements.docDeleteBtnElement);

  return arrays;
}


// function for pushing the asynchronously added arrays on the "dirigendid" subform to the arrays on the actual page


function pushDirigendidSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);
  arrays.subformPortreeArray.push(elements.docSubformPortreeElement);
  arrays.subformPortreeLabelArray.push(elements.docSubformPortreeLabelElement);
  arrays.subformPortreePlaceholderArray.push(elements.docSubformPortreePlaceholderElement);
  arrays.subformPortreeImgArray.push(elements.docSubformPortreeImgElement);
  arrays.subformNimiArray.push(elements.docSubformNimiElement);
  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformSubmitBtnArray.push(elements.docSubformSubmitBtnElement);
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  // call the changePreview function once again so that it also applies to newly added image elements

  for (var i = 0; i < arrays.subformPortreeArray.length; i++) {
    changePreview(arrays.subformPortreeArray[i]);
  }

  return arrays;
}


// function for pushing the asynchronously added arrays on the "ajalugu" subform to the arrays on the actual page


function pushAjaluguSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);
  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformPealkiriEstArray.push(elements.docSubformPealkiriEstElement);
  arrays.subformPealkiriEnArray.push(elements.docSubformPealkiriEnElement);
  arrays.subformPealkiriHeadingArray.push(elements.docSubformPealkiriHeadingElement);
  arrays.subformSubmitBtnArray.push(elements.docSubformSubmitBtnElement);
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  return arrays;
}


// function for pushing the asynchronously added arrays on the "sundmused" subform to the arrays on the actual page


function pushSundmusedSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);
  arrays.subformPealkiriEstArray.push(elements.docSubformPealkiriEstElement);
  arrays.subformPealkiriEnArray.push(elements.docSubformPealkiriEnElement);
  arrays.subformPlakatArray.push(elements.docSubformPlakatElement);
  arrays.subformPlakatLabelArray.push(elements.docSubformPlakatLabelElement);
  arrays.subformPlakatPlaceholderArray.push(elements.docSubformPlakatPlaceholderElement);
  arrays.subformPlakatImgArray.push(elements.docSubformPlakatImgElement);
  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformSubmitBtnArray.push(elements.docSubformSubmitBtnElement);
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformLoikKohtFormArray.push(elements.docSubformLoikKohtFormElement);
  arrays.subformLoikKohtAddBtnArray.push(elements.docSubformLoikKohtAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  // call the changePreview function once again so that it also applies to newly added image elements

  for (var i = 0; i < arrays.subformPlakatArray.length; i++) {
    changePreview(arrays.subformPlakatArray[i]);
  }

  return arrays;
}


// function for pushing the asynchronously added arrays on the "pood" subform to the arrays on the actual page


function pushPoodSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);
  arrays.subformToodeEstArray.push(elements.docSubformToodeEstElement);
  arrays.subformToodeEnArray.push(elements.docSubformToodeEnElement);
  arrays.subformToodeNumberArray.push(elements.docSubformToodeNumberElement);
  arrays.subformPiltArray.push(elements.docSubformPiltElement);
  arrays.subformPiltLabelArray.push(elements.docSubformPiltLabelElement);
  arrays.subformPiltPlaceholderArray.push(elements.docSubformPiltPlaceholderElement);
  arrays.subformPiltImgArray.push(elements.docSubformPiltImgElement);
  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformSubmitBtnArray.push(elements.docSubformSubmitBtnElement);
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikNimistuFormArray.push(elements.docSubformLoikNimistuFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformLoikNimistuAddBtnArray.push(elements.docSubformLoikNimistuAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  // call the changePreview function once again so that it also applies to newly added image elements

  for (var i = 0; i < arrays.subformPiltArray.length; i++) {
    changePreview(arrays.subformPiltArray[i]);
  }

  return arrays;
}


// function for appending the added "loik" element to the actual page


function appendElement(form, docElements) {

  // append the new element to the form

  form.append(docElements.docElement);

  // query for all the children of the added element that have a class of "input"

  var inputChildren = docElements.docElement.querySelectorAll(".input");

  // check if there are any at all

  if (inputChildren.length !== 0) {

    // if yes, loop through the inputs and have them listen to value updates and innerHTML modification

    for (var i = 0; i < inputChildren.length; i++) {
      inputChildren[i].addEventListener("DOMSubtreeModified", updateInputValue);
      inputChildren[i].addEventListener("input", updateInputValue);
    }

    // query for all the children of the added element that have a class of "editable-input"

    var editableInputChildren = docElements.docElement.querySelectorAll(".editable-input");

    // check if there are any at all

    if (editableInputChildren.length !== 0) {

      // if yes, have them listen to paste events as well as focus and blur events
      // and call the corresponding functions

      for (var i = 0; i < editableInputChildren.length; i++) {

        // listen to paste events

        editableInputChildren[i].addEventListener("paste", function(event) {

          // prevent the default pasting

          event.preventDefault();

          // instead paste a plain text version of the copied text

          document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
        });

        // listen to the focus event

        editableInputChildren[i].addEventListener("focus", function(event) {

          // on focus, display the bold btn using utility classes

          boldBtn.classList.remove("hide");
          boldBtn.classList.add("show");
        });

        // listen to the blur event

        editableInputChildren[i].addEventListener("blur", function(event) {

          // if focus is lost, remove the bold button from the page using utility classes

          boldBtn.classList.remove("show");
          boldBtn.classList.add("hide");
        });
      }
    }
  }
}

// function for appending the added subform to the actual page


function appendSubform(form, docSubforms) {


  // append the new element to the form

  form.append(docSubforms.docSubformElement);
}




// ADD EVENT LISTENERS TO RELEVANT DOM ELEMENTS, WHICH WILL CALL AJAX REQUESTS




// add event listeners that listen for the submit event on different forms on various admin pages


// check if the current page is "admin/avaleht" by checking if the avalehtPildid element exists

if (avalehtPildid !== null) {

  avalehtPildid.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(avalehtPildid, "avaleht/pildid"));
  });

  avalehtTekstid.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createAvalehtTekstidData, "avaleht/tekstid", "update"));
  });
}

// check if the current page is "admin/koorist" by checking if the kooristPealkirjad element exists

if (kooristPealkirjad !== null) {

  kooristPealkirjad.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristPealkirjadData, "pealkirjad", "update"));
  });

  kooristSissejuhatus.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(kooristSissejuhatus, "sissejuhatus"));
  });

  kooristLiikmed.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristLiikmedData, "liikmed", "update"));
  });

  kooristDirigendid.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(kooristDirigendid, "dirigendid"));
  });

  kooristAjalugu.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristAjaluguData, "ajalugu", "update"));
  });

  kooristMeedia.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKooristMeediaData, "meedia", "update"));
  });
  kooristToetajad.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(kooristToetajad, "toetajad"));
  });
}

// check if the current page is "admin/kontakt" by checking if the kontakt form element exists

if (kontakt !== null) {

  kontakt.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createKontaktData, "kontakt", "update"));
  });
}

// check if the current page is "admin/kontakt" by checking if the vastuvott form element exists

if (vastuvott !== null) {

  vastuvott.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createVastuvottData, "vastuvott", "update"));
  });
}

// check if the current page is "admin/pood" by checking if the telli form element exists

if (telli !== null) {

  telli.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createTelliData, "telli", "update"));
  });
}

// check if the current page is "admin/sundmused" by checking if the sündmused form element exists

if (sundmused !== null) {

  sundmused.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(sundmused, "sundmused"));
  });
}

// check if the current page is "admin/pood" by checking if the pood form element exists

if (pood !== null) {

  pood.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(pood, "pood"));
  });
}

// check if the current page is "admin/arhiiv" by checking if the "moodunud" form element exists

if (moodunud !== null) {

  moodunud.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(moodunud, "moodunud"));
  });
}

// check if the current page is "vastuvõtt" by checking if the "ankeet" form element exists

if (ankeet !== null) {

  ankeet.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createAnkeetData, "ankeet", "update"));
  });
}


// add an event listener to the whole document, which listens for clicks on the various add and delete buttons on the admin/koorist page


document.addEventListener("click", function(event) {

  // check if the clicked element is a specific previously defined add new "loik" button

  if (event.target === sissejuhatusLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "sissejuhatus/new", "create", "koorist"));
  } else if (event.target === liikmedLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "liikmed/new", "create", "koorist"));
  } else if (event.target === ajaluguSissekanneLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "ajalugu/sissekanne/new", "create", "koorist"));
  } else if (event.target === ajaluguSissejuhatusLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "ajalugu/sissejuhatus/new", "create", "koorist"));
  } else if (event.target === poodSissejuhatusLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "pood/sissejuhatus/new", "create", "pood"));
  } else if (event.target === meediaLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/new", "create", "koorist"));
  } else if (event.target === meediaVideoLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/video/new", "create", "koorist"));
  } else if (event.target === meediaLinkLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/link/new", "create", "koorist"));
  } else if (event.target === toetajadLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "toetajad/new", "create", "koorist"));
  } else if (event.target === kontaktSissejuhatusLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/sissejuhatus/new", "create", "kontakt"));
  } else if (event.target === uldineLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/uldine/new", "create", "kontakt"));
  } else if (event.target === andmedLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/andmed/new", "create", "kontakt"));
  } else if (event.target === numbridLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/numbrid/new", "create", "kontakt"));
  } else if (event.target === mtuLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/mtu/new", "create", "kontakt"));
  } else if (event.target === ikoonidLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "kontakt/ikoonid/new", "create", "kontakt"));
  } else if (event.target === vastuvottLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "vastuvott/new", "create", "kontakt"));
  } else if (event.target === ankeetLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "vastuvott/ankeet/new", "create", "kontakt"));
  } else if (event.target === telliLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "telli/new", "create", "pood"));
  } else if (event.target === kontaktandmedLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "telli/kontaktandmed/new", "create", "pood"));
  } else if (event.target === sundmusedSissejuhatusLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "sundmused/sissejuhatus/new", "create", "sundmused"));

    // check if the clicked element is a dynamically created add new "loik" button on a "dirigendid" subform

  } else if (event.target.classList.contains("dirigendidLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addDirigendidLoikIdNumber = event.target.id.slice(10, -10);

    // call the ajax function, with the destination route being "dirigendid" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "dirigendid" + addDirigendidLoikIdNumber + "/new", "create", "koorist"));

    // check if the clicked element is a dynamically created add new "loik" button on a "ajalugu" subform

  } else if (event.target.classList.contains("ajaluguLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addAjaluguLoikIdNumber = event.target.id.slice(7, -10);

    // call the ajax function, with the destination route being "ajalugu" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "ajalugu" + addAjaluguLoikIdNumber + "/new", "create", "koorist"));

    // check if the clicked element is a dynamically created add new "loik" button on a "sundmused" subform

  } else if (event.target.classList.contains("sundmusedLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addSundmusedLoikIdNumber = event.target.id.slice(9, -10);

    // call the ajax function, with the destination route being "sundmused" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "sundmused" + addSundmusedLoikIdNumber + "/new", "create", "sundmused"));

    // check if the clicked element is a dynamically created add new "loikKoht" button on a "sundmused" subform

  } else if (event.target.classList.contains("sundmusedLoikKohtAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addSundmusedLoikKohtIdNumber = event.target.id.slice(9, -14);

    // call the ajax function, with the destination route being "sundmused/koht" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "sundmused/koht" + addSundmusedLoikKohtIdNumber + "/new", "create", "sundmused"));

    // check if the clicked element is a dynamically created add new "loik" button on a "pood" subform

  } else if (event.target.classList.contains("poodLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addPoodLoikIdNumber = event.target.id.slice(4, -10);

    // call the ajax function, with the destination route being "pood" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "pood" + addPoodLoikIdNumber + "/new", "create", "pood"));

    // check if the clicked element is a dynamically created add new "loikNimistu" button on a "pood" subform

  } else if (event.target.classList.contains("poodLoikNimistuAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addPoodLoikNimistuIdNumber = event.target.id.slice(4, -17);

    // call the ajax function, with the destination route being "pood/nimistu" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "pood/nimistu" + addPoodLoikNimistuIdNumber + "/new", "create", "pood"));

    // check if the clicked element is a dynamically created add new "loik" button on a "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addMoodunudLoikIdNumber = event.target.id.slice(8, -10);

    // call the ajax function, with the destination route being "moodunud" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "moodunud" + addMoodunudLoikIdNumber + "/new", "create", "arhiiv"));

    // check if the clicked element is a dynamically created add new "loikKoht" button on a "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikKohtAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addMoodunudLoikKohtIdNumber = event.target.id.slice(8, -14);

    // call the ajax function, with the destination route being "moodunud/koht" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "moodunud/koht" + addMoodunudLoikKohtIdNumber + "/new", "create", "arhiiv"));

    // check if the clicked element is a previously defined add new "dirigendid" subform button

  } else if (event.target === dirigendidAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "dirigendid/new", "create", "koorist", "dirigendid"));

    // check if the clicked element is a previously defined add new "ajalugu" subform button

  } else if (event.target === ajaluguAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "ajalugu/new", "create", "koorist", "ajalugu"));

    // check if the clicked element is a previously defined add new "sundmused" subform button

  } else if (event.target === sundmusedAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "sundmused/new", "create", "sundmused", "sundmused"));

    // check if the clicked element is a previously defined add new "pood" subform button

  } else if (event.target === poodAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "pood/new", "create", "pood", "pood"));

    // check if the clicked element is a specific delete "loik" button

  } else if (event.target.classList.contains("sissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "sissejuhatus");
  } else if (event.target.classList.contains("liikmedLoikDeleteBtn")) {
    createDeleteMessage(event, "liikmed");
  } else if (event.target.classList.contains("ajaluguSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "ajalugu/sissejuhatus");
  } else if (event.target.classList.contains("poodSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "pood/sissejuhatus");
  } else if (event.target.classList.contains("ajaluguSissekanneLoikDeleteBtn")) {
    createDeleteMessage(event, "ajalugu/sissekanne");
  } else if (event.target.classList.contains("meediaLoikDeleteBtn")) {
    createDeleteMessage(event, "meedia");
  } else if (event.target.classList.contains("meediaVideoLoikDeleteBtn")) {
    createDeleteMessage(event, "meedia/video");
  } else if (event.target.classList.contains("meediaLinkLoikDeleteBtn")) {
    createDeleteMessage(event, "meedia/link");
  } else if (event.target.classList.contains("toetajadLoikDeleteBtn")) {
    createDeleteMessage(event, "toetajad");
  } else if (event.target.classList.contains("kontaktSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/sissejuhatus");
  } else if (event.target.classList.contains("uldineLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/uldine");
  } else if (event.target.classList.contains("andmedLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/andmed");
  } else if (event.target.classList.contains("numbridLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/numbrid");
  } else if (event.target.classList.contains("mtuLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/mtu");
  } else if (event.target.classList.contains("ikoonidLoikDeleteBtn")) {
    createDeleteMessage(event, "kontakt/ikoonid");
  } else if (event.target.classList.contains("vastuvottLoikDeleteBtn")) {
    createDeleteMessage(event, "vastuvott");
  } else if (event.target.classList.contains("ankeetLoikDeleteBtn")) {
    createDeleteMessage(event, "vastuvott/ankeet");
  } else if (event.target.classList.contains("telliLoikDeleteBtn")) {
    createDeleteMessage(event, "telli");
  } else if (event.target.classList.contains("kontaktandmedLoikDeleteBtn")) {
    createDeleteMessage(event, "telli/kontaktandmed");
  } else if (event.target.classList.contains("sundmusedSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "sundmused/sissejuhatus");

    // check if the clicked element is a delete "loik" button on a dynamically created "dirigendid" subform

  } else if (event.target.classList.contains("dirigendidLoikDeleteBtn")) {

    // the event target should have an id, which contains a number between "dirigendid" and "LoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 10 and ends where "LoikDeleteBtn" starts

    var endOfNumber = event.target.id.indexOf("LoikDeleteBtn");
    var deleteLoikIdNumber = event.target.id.slice(10, endOfNumber);
    createDeleteMessage(event, "dirigendid" + deleteLoikIdNumber);

    // check if the clicked element is a delete "loik" button on a dynamically created "ajalugu" subform

  } else if (event.target.classList.contains("ajaluguLoikDeleteBtn")) {

    // the event target should have an id, which contains a number between "ajalugu" and "LoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 7 and ends where "LoikDeleteBtn" starts

    var endOfAjaluguNumber = event.target.id.indexOf("LoikDeleteBtn");
    var deleteAjaluguLoikIdNumber = event.target.id.slice(7, endOfAjaluguNumber);
    createDeleteMessage(event, "ajalugu" + deleteAjaluguLoikIdNumber);

    // check if the clicked element is a delete "loik" button on a dynamically created "sundmused" subform

  } else if (event.target.classList.contains("sundmusedLoikDeleteBtn")) {

    // the event target should have an id, which contains a number between "sundmused" and "LoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 9 and ends where "LoikDeleteBtn" starts

    var endOfSundmusedNumber = event.target.id.indexOf("LoikDeleteBtn");
    var deleteSundmusedLoikIdNumber = event.target.id.slice(9, endOfSundmusedNumber);
    createDeleteMessage(event, "sundmused" + deleteSundmusedLoikIdNumber);

    // check if the clicked element is a delete "loikKoht" button on a dynamically created "sundmused" subform

  } else if (event.target.classList.contains("sundmusedLoikKohtDeleteBtn")) {

    // the event target should have an id, which contains a number between "sundmused" and "LoikKohtDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 9 and ends where "LoikKohtDeleteBtn" starts

    var endOfSundmusedNumberKoht = event.target.id.indexOf("LoikKohtDeleteBtn");
    var deleteSundmusedLoikKohtIdNumber = event.target.id.slice(9, endOfSundmusedNumberKoht);
    createDeleteMessage(event, "sundmused/koht" + deleteSundmusedLoikKohtIdNumber);

    // check if the clicked element is a delete "loik" button on a dynamically created "pood" subform

  } else if (event.target.classList.contains("poodLoikDeleteBtn")) {

    // the event target should have an id, which contains a number between "pood" and "LoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 4 and ends where "LoikDeleteBtn" starts

    var endOfPoodNumber = event.target.id.indexOf("LoikDeleteBtn");
    var deletePoodLoikIdNumber = event.target.id.slice(4, endOfPoodNumber);
    createDeleteMessage(event, "pood" + deletePoodLoikIdNumber);

    // check if the clicked element is a delete "loikNimistu" button on a dynamically created "pood" subform

  } else if (event.target.classList.contains("poodLoikNimistuDeleteBtn")) {

    // the event target should have an id, which contains a number between "pood" and "NimistuLoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 4 and ends where "LoikDeleteBtn" starts

    var endOfPoodNimistuNumber = event.target.id.indexOf("LoikNimistuDeleteBtn");
    var deletePoodNimistuLoikIdNumber = event.target.id.slice(4, endOfPoodNimistuNumber);
    createDeleteMessage(event, "pood/nimistu" + deletePoodNimistuLoikIdNumber);

    // check if the clicked element is a delete "loik" button on a dynamically created "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikDeleteBtn")) {

    // the event target should have an id, which contains a number between "moodunud" and "LoikDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 9 and ends where "LoikDeleteBtn" starts

    var endOfMoodunudNumber = event.target.id.indexOf("LoikDeleteBtn");
    var deleteMoodunudLoikIdNumber = event.target.id.slice(8, endOfMoodunudNumber);
    createDeleteMessage(event, "moodunud" + deleteMoodunudLoikIdNumber);

    // check if the clicked element is a delete "loikKoht" button on a dynamically created "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikKohtDeleteBtn")) {

    // the event target should have an id, which contains a number between "moodunud" and "LoikKohtDeleteBtn" - this number will be the idNumber variable
    // this number starts at index 9 and ends where "LoikKohtDeleteBtn" starts

    var endOfMoodunudNumberKoht = event.target.id.indexOf("LoikKohtDeleteBtn");
    var deleteMoodunudLoikKohtIdNumber = event.target.id.slice(8, endOfMoodunudNumberKoht);
    createDeleteMessage(event, "moodunud/koht" + deleteMoodunudLoikKohtIdNumber);

    // check if the clicked element is a delete "dirigendid" subform button

  } else if (event.target.classList.contains("dirigendidDeleteBtn")) {
    createDeleteMessage(event, "dirigendid", "dirigendid");

    // check if the clicked element is a delete "ajalugu" subform button

  } else if (event.target.classList.contains("ajaluguDeleteBtn")) {
    createDeleteMessage(event, "ajalugu", "ajalugu");

    // check if the clicked element is a delete "sundmused" subform button

  } else if (event.target.classList.contains("sundmusedDeleteBtn")) {
    createDeleteMessage(event, "sundmused", "sundmused");

    // check if the clicked element is a delete "pood" subform button

  } else if (event.target.classList.contains("poodDeleteBtn")) {
    createDeleteMessage(event, "pood", "pood");

    // check if the clicked element is a delete "moodunud" subform button

  } else if (event.target.classList.contains("moodunudDeleteBtn")) {
    createDeleteMessage(event, "moodunud", "moodunud");

    // check if the clicked element is a restore "sundmused" subform button

  } else if (event.target.classList.contains("moodunudRestoreBtn")) {
    createDeleteMessage(event, "moodunud/restore", "moodunud");
  }
});




// CREATE AJAX CALL PARAMETERS WITH A CONSTRUCTOR FUNCTION




// for multer


function MulterParam(formName, destination) {
  this.formName = formName;
  this.destination = destination;
}


// for body-parser


function BodyParserParam(functionName, postDestination, type, getDestination, subform) {
  this.functionName = functionName;
  this.postDestination = postDestination;
  this.type = type;
  this.getDestination = getDestination;
  this.subform = subform;
}




// AJAX GET REQUESTS




function ajaxGetNew(event, location, destination, subform) {

  // create a new XMLHttpRequest

  var xhr = new XMLHttpRequest();

  // open the request and specify its method (GET), the destination of the request and whether the call is asynchronous (true)

  xhr.open('GET', location, true);

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // check if everything works

    if (this.readyState == 4 && this.status == 200) {

      // if yes, store the response string (that contains the request destination HTML) into a variable

      var responseText = this.responseText;

      // setup a string parser

      var parser = new DOMParser();

      // use the parser to create a DOM tree from the response string

      var doc = parser.parseFromString(responseText, "text/html");

      // call a function that takes the response text as an argument, identifies the added element and displays it on the page

      addElement(event, doc, destination, subform);

      // if something is wrong, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the ajax get request

  xhr.send();
}




// AJAX POST CALLS HANDLED BY MULTER




// create an ajax request for uploading pictures and text with multer (function takes an object with two params as an input)


function ajaxMulter(event, params) {

  // prevent default action (form submitting in a regular manner)

  event.preventDefault();

  // instead create a new XMLHttpRequest object for transferring data to the server

  var xhr = new XMLHttpRequest();


  // create a new formData object, which will send the relevant form to the server

  var formData = new FormData(params.formName);

  // open the XMLHttpRequest and specify the method (POST), destination route on the server, and whether the call takes place asynchronously (true);

  xhr.open('POST', '/upload/' + params.destination, true);

  // check if the request is ready

  xhr.onreadystatechange = function() {

    // if everything works, create a success message

    if (this.readyState == 4 && this.status == 200) {
      createSuccessMessage();

      // if not, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send(formData);
}




// AJAX POST CALLS HANDLED BY BODY-PARSER




// create an ajax request for updating, adding and deleting text, which will be handled by body-parser, (function takes the event and an object with three params as an input)


function ajaxBodyParser(event, params) {

  // prevent the regular event from happening

  event.preventDefault();

  // instead create a new XMLHttpRequest

  var xhr = new XMLHttpRequest();

  // specify a function that creates the data to be sent to the server

  var data = params.functionName(event);

  // turn the created data into JSON

  var jsonData = JSON.stringify(data);

  // open the XMLHttpRequest and specify the method (POST), destination route on the server ("/upload/" + postDestination), and whether the call takes place asynchronously (true);

  xhr.open("POST", "/upload/" + params.postDestination, true);

  // manually set a request header, so that the server knows what type of data to expect

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  // check if the request is ready

  xhr.onreadystatechange = function() {


    // if everything works, check the action type

    if (this.readyState == 4 && this.status == 200) {

      // if the action type is "create", initialize an ajax get request to add a new DOM element to the page

      if (params.type === "create") {

        // specify the location of the get request (will be "/admin/" + a specified parameter)

        var getDestination = "/admin/" + params.getDestination;

        // specify the location of the potential future post requests that can be made by the currently added element

        var postDestination = params.postDestination.slice(0, -4);

        // specify if the created element is a subform or not

        var subform = params.subform;

        // make the get request

        ajaxGetNew(event, getDestination, postDestination, subform);

        // if the action type is "update", create a success message

      } else if (params.type === "update") {
        createSuccessMessage();

        // if there is something wrong with the action type, create a failure message, if the action type is "delete", do nothing

      } else if (params.type !== "delete") {
        createFailureMessage();
      }

      // if there is another problem, create a failure message

    } else if (this.status !== 200) {
      createFailureMessage();
    }
  };

  // send the data to the server

  xhr.send("data=" + jsonData);
}
