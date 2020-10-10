// UTILITY FUNCTIONS


// function for getting the last element of an array

function getLastElement(array) {
  var lastElement = array[array.length - 1];
  return lastElement;
}

// function for getting the parent node of a specified element

function getParent(element) {
  var parent = element.parentNode;
  return parent;
}

// function for bolding/unbolding text on inputs, both on the admin page and the page that we want to update

function getMarkupText() {

  // check if the bold/unbold button is checked

  if (boldBtn.checked === true) {

    // if yes, get the selected text as a js object

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

      var mainInput = anchorParent.closest(".input");

      // the bolding/unbolding of selected text should only work if the mainInput exists,
      // otherwise the selected text is not valid for bolding/unbolding and the button will call for its second method

      if (mainInput !== null) {

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

          // add "b" tags to these slices to keep them bold, but leave them out for the selected part
          // then construct a new string out of all these parts

          var newTextUnbold = beforeSelectionUnbold.bold() + selectionString + afterSelectionUnbold.bold();

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

          // uncheck the bold/unbold button

          boldBtn.checked = false;

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

            // loop through the childNodesData array to replace all the text that it contains

            for (var a = 0; a < childNodesData.length; a++) {

              // check if the current item's index is the one we obtained earlier from the selectionData

              if (a === indexBoldSimple) {

                // if yes, replace the current item's text content with the string we created above
                // and push the new text to the array created above

                textArrayBoldSimple.push(newTextBoldSimple);

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

            // construct a long string from the newly created array

            var newInnerHTMLBoldSimple = textArrayBoldSimple.join("");

            // this string will be the new innerHTML for the mainInput

            mainInput.innerHTML = newInnerHTMLBoldSimple;

            // uncheck the bold/unbold button

            boldBtn.checked = false;

            // if the selection does not begin and end on the same node,
             // it means some of the selected text is bold and some of it not

          } else {

            // get the indexes of the node where the selection starts and for the one where it ends

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

            // uncheck the bold/unbold button

            boldBtn.checked = false;
          }
        }
      }

    } else {

      // THE BUTTON WILL STAY DOWN
    }





  } else if (boldBtn.checked === false) {
    console.log("No");
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

  // firstly find out what the indexes are for the anchor and focus nodes
  // in relation to the given array and whether they are bold or not

  var anchorData = compareIndexes(anchor, array);

  var focusData = compareIndexes(focus, array);

  // anchor and focus are not the same as the beginning and end points of the selection,
  // but we can use them to check if the selection has been made backwards (in which case the anchor comes after the focus)

  var backwards = checkIfBackwards(selection, anchorData, focusData);

  // now use a function to create a javascript object with all the obtained data about the selected text

  var selectionData = createSelectionData(selection, anchorData, focusData, backwards);

  // return the retrieved object

  return selectionData;
}


// function for determining the location of the selection's beginning and end
// in relation to its parent element and whether either of them is located between bold tags

function compareIndexes(node, array) {

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

  } else {

    // return an object with the obtained index and the bold attribute set as "false"

    var indexObject2 = {
      index: index,
      bold: false
    };

    return indexObject2;
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
      beginningNodeText: selection.anchorNode.data,
      endIndex: focusData.index,
      endOffset: selection.focusOffset,
      endBold: focusData.bold,
      endNodeText: selection.focusNode.data
    };

    return selectionData1;

  } else if (backwards === true) {

    var selectionData2 = {
      beginningIndex: focusData.index,
      beginningOffset: selection.focusOffset,
      beginningBold: focusData.bold,
      beginningNodeText: selection.focusNode.data,
      endIndex: anchorData.index,
      endOffset: selection.anchorOffset,
      endBold: anchorData.bold,
      endNodeText: selection.anchorNode.data
    };

    return selectionData2;
  }
}




// DISPLAY A MESSAGE WHEN AN UPDATE IS SUBMITTED ON AN ADMIN PAGE



// success

function createSuccessMessage() {
  successPopup.classList.remove("hide");
  successPopup.classList.add("show");
  successBtn.focus();
}


// failure

function createFailureMessage() {
  failurePopup.classList.remove("hide");
  failurePopup.classList.add("show");
  failureBtn.focus();
}


// are you sure you want to delete this?

function createDeleteMessage(event, destination, subform) {
  deletePopup.classList.remove("hide");
  deletePopup.classList.add("show");
  deleteNoBtn.focus();

  // register the event target

  var element = event.target;

  // get the parent node of the event target

  var parent = getParent(element);

  // add an event listener to the "Yes" button on the delete popup and pass in the parent subform as an argument

  deleteYesBtn.addEventListener("click", function(event) {

      // when the button is clicked, call the commenceDelete function

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
  popupType.classList.remove("show");
  popupType.classList.add("hide");
}



// listen for clicks and keypresses and display or remove messages accordingly

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




// CHANGE THE LABELS AND PREVIEWS UNDER PICTURE UPLOAD BUTTONS




// change the labels and picture samples

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

// loop through the array and call the changePreview function once for each input in the array

for (var i = 0; i < images.length; i++) {
  changePreview(images[i]);
}

// for images in an array, call the function in separate for loops

for (var i = 0; i < dirigendidPortreeArray.length; i++) {
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




// REGISTER TEXT UPDATES ON ALL THE ADMIN PAGES



// text inputs on the admin pages have two versions-
// one is the real input, the content of which will be sent to the server,
// the second one is a corresponding editable div, which will be displayed on the page
// the values of both versions of a particular input must be identical


//get all the editable text inputs on the page as an array

var inputArray = document.querySelectorAll(".input");

// check if there are any relevant inputs on the page

if (inputArray !== null) {

  // loop through all the inputs and have them listen to value updates

  for (var i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", updateInputValue);
  }
}

// manually update the value property of the fake text inputs that have been changed by the admin
// and also carry it over to the corresponding hidden input

function updateInputValue(event) {

  // get what is currently written into the editable input

  var changedInputValue = event.target.innerHTML;

  // set its value attribute to what is currently written into the editable input

  this.setAttribute("value", changedInputValue);

  // get the id of the current editable input

  var inputId = event.target.id;

  // from this id, also input the id of the corresponding hidden input
  // this will be the same string minus two of its last characters

  var realInput = document.getElementById(inputId.slice(0, -2));

  // change the value of the "real" hidden input accordingly as well

  realInput.setAttribute("value", changedInputValue);
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
    estKeyArray: Array.from(document.querySelectorAll("." + elementName + "EstKey")),
    enKeyArray: Array.from(document.querySelectorAll("." + elementName + "EnKey")),
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
    subformLoikFormArray: Array.from(document.querySelectorAll(".dirigendidLoikForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".dirigendidLoikAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".dirigendidDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: []
  };

  // loop through all the "loik" elements to get arrays of its components

  for (var i = 0; i < dirigendidSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikEn"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".dirigendid" + idNumber + "LoikDeleteBtn"));

    // push these arrays into the dirigendidSubforms object

    dirigendidSubforms.subformLoikArrays.push(subformLoikArray);
    dirigendidSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    dirigendidSubforms.subformLoikEnArrays.push(subformLoikEnArray);
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
    subformLoikFormArray: Array.from(document.querySelectorAll(".ajaluguLoikForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".ajaluguLoikAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".ajaluguDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
    subformLoikHeadingArrays: [],
    subformLoikDeleteBtnArrays: []
  };

  // loop through all the "loik" elements to get arrays of its components

  for (var i = 0; i < ajaluguSubforms.subformLoikFormArray.length; i++) {

    var idNumber = i + 1;
    var subformLoikArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "Loik"));
    var subformLoikEstArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEst"));
    var subformLoikEnArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikEn"));
    var subformLoikHeadingArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikHeading"));
    var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ajalugu" + idNumber + "LoikDeleteBtn"));

    // push these arrays into the ajaluguSubforms object

    ajaluguSubforms.subformLoikArrays.push(subformLoikArray);
    ajaluguSubforms.subformLoikEstArrays.push(subformLoikEstArray);
    ajaluguSubforms.subformLoikEnArrays.push(subformLoikEnArray);
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
    subformLoikKohtFormArray: Array.from(document.querySelectorAll(".sundmusedLoikKohtForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".sundmusedLoikAddBtn")),
    subformLoikKohtAddBtnArray: Array.from(document.querySelectorAll(".sundmusedLoikKohtAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".sundmusedDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
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
    subformLoikFormArray: Array.from(document.querySelectorAll(".moodunudLoikForm")),
    subformLoikKohtFormArray: Array.from(document.querySelectorAll(".moodunudLoikKohtForm")),
    subformLoikAddBtnArray: Array.from(document.querySelectorAll(".moodunudLoikAddBtn")),
    subformLoikKohtAddBtnArray: Array.from(document.querySelectorAll(".moodunudLoikKohtAddBtn")),
    subformDeleteBtnArray: Array.from(document.querySelectorAll(".moodunudDeleteBtn")),
    subformLoikArrays: [],
    subformLoikEstArrays: [],
    subformLoikEnArrays: [],
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
    arrayNameEstKey: elementName + "EstKey",
    arrayNameEnKey: elementName + "EnKey",
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
    docEstKeyArray: doc.querySelectorAll("." + selectorName + "EstKey"),
    docEnKeyArray: doc.querySelectorAll("." + selectorName + "EnKey"),
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
    docSubformLoikFormArray: doc.querySelectorAll(".sundmusedLoikForm"),
    docSubformLoikKohtFormArray: doc.querySelectorAll(".sundmusedLoikKohtForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".sundmusedLoikAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".sundmusedDeleteBtn")
  };

  // return the object

  return docSundmusedSubforms;
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
    docEstKeyElement: getLastElement(docArrays.docEstKeyArray),
    docEnKeyElement: getLastElement(docArrays.docEnKeyArray),
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
    docSubformLoikFormElement: getLastElement(docSundmusedSubforms.docSubformLoikFormArray),
    docSubformLoikKohtFormElement: getLastElement(docSundmusedSubforms.docSubformLoikKohtFormArray),
    docSubformLoikAddBtnElement: getLastElement(docSundmusedSubforms.docSubformLoikAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docSundmusedSubforms.docSubformDeleteBtnArray)
  };

  return docSundmusedSubformElements;
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


// delete a "loik" element from the page

function deleteElement(element, elementData) {
  element.parentNode.removeChild(element);

  // update the node lists, which are affected by the element deletion

  updateArrays(element, elementData);
}


// delete a "dirigendid" subform from the page

function deleteDirigendidSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateDirigendidSubforms(element, elementData);
}


// delete an "ajalugu" subform from the page

function deleteAjaluguSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateAjaluguSubforms(element, elementData);
}


// delete a "sundmused" subform from the page

function deleteSundmusedSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateSundmusedSubforms(element, elementData);
}


// delete a "moodunud" subform from the page

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
  elementData.arrays.estKeyArray.splice(elementData.arrayIndex, 1);
  elementData.arrays.enKeyArray.splice(elementData.arrayIndex, 1);
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
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
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
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
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
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
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

  updateSundmusedSubformProperties(elementData);
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
  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
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
    if (elementData.arrays.estKeyArray[i] !== undefined) {
      elementData.arrays.estKeyArray[i].setAttribute("id", elementData.arrayNames.arrayNameEstKey + idNumber);
      elementData.arrays.enKeyArray[i].setAttribute("name", elementData.arrayNames.arrayNameEnKey + idNumber);
    }
    if (elementData.arrays.enKeyArray[i] !== undefined) {
      elementData.arrays.enKeyArray[i].setAttribute("id", elementData.arrayNames.arrayNameEnKey + idNumber);
      elementData.arrays.enKeyArray[i].setAttribute("name", elementData.arrayNames.arrayNameEnKey + idNumber);
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
      elementData.subforms.subformLoikKohtLinkArrays[i][b].classList.replace(getLastElement(elementData.subforms.subformLoikKohtEnArrays[i][b].classList), "sundmused" + idNumber + "LoikKohtLink" + indexNumberKoht);
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

    // get the last elements of each of the arrays in the docAjaluguSubform object

    var docSundmusedSubformElements = getDocSundmusedSubformElements(doc);

    // push those elements into the existing subform arrays, so that those elements will become visible

    var newSundmusedSubforms = pushSundmusedSubform(sundmusedSubforms, docSundmusedSubformElements);

    // get the relevant form

    var sundmusedForm = document.getElementById("sundmusedForm");

    // call the appendSubform function

    appendSubform(sundmusedForm, docSundmusedSubformElements);

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
  arrays.estKeyArray.push(elements.docEstKeyElement);
  arrays.enKeyArray.push(elements.docEnKeyElement);
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
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  // call the changePreview function once again so that it also applies to newly added image elements

  for (var i = 0; i < arrays.subformPortreeArray.length; i++) {
    changePreview(arrays.subformPortreeArray[i]);
  }

  return arrays;
}


// function for pushing the asynchronously added arrays on the "dirigendid" subform to the arrays on the actual page

function pushAjaluguSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);
  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformPealkiriEstArray.push(elements.docSubformPealkiriEstElement);
  arrays.subformPealkiriEnArray.push(elements.docSubformPealkiriEnElement);
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



// function for appending the added "loik" element to the actual page

function appendElement(form, docElements) {

  // append the new element to the form

  form.append(docElements.docElement);
}


// function for appending the added subform to the actual page

function appendSubform(form, docSubforms) {

  // append the new element to the form

  form.append(docSubforms.docSubformElement);
}




// DATA CREATION FUNCTIONS FOR AJAX POST CALLS THAT ARE HANDLED BY BODY-PARSER




function createAvalehtTekstidData(event) {
  if (avalehtTekstid !== null) {
    var avalehtTekstidData = {
      suurPealkiri: {
        est: encodeURIComponent(document.getElementById("suurPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("suurPealkiriEn").value)
      },
      jatkuPealkiri: {
        est: encodeURIComponent(document.getElementById("jatkuPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("jatkuPealkiriEn").value)
      },
      sektsiooniPealkiri1: {
        est: encodeURIComponent(document.getElementById("sektsiooniPealkiriEst1").value),
        en: encodeURIComponent(document.getElementById("sektsiooniPealkiriEn1").value)
      },
      sektsiooniTekst1: {
        est: encodeURIComponent(document.getElementById("sektsiooniTekstEst1").value),
        en: encodeURIComponent(document.getElementById("sektsiooniTekstEn1").value)
      },
      sektsiooniPealkiri2: {
        est: encodeURIComponent(document.getElementById("sektsiooniPealkiriEst2").value),
        en: encodeURIComponent(document.getElementById("sektsiooniPealkiriEn2").value)
      },
      sektsiooniTekst2: {
        est: encodeURIComponent(document.getElementById("sektsiooniTekstEst2").value),
        en: encodeURIComponent(document.getElementById("sektsiooniTekstEn2").value)
      },
    };
    return avalehtTekstidData;
  }
}

function createKooristPealkirjadData(event) {
  if (kooristPealkirjad !== null) {
    var pealkirjadData = [];
    for (var i = 0; i < 6; i++) {
      indexNumber = i + 1;
      var pealkiri = {
        est: encodeURIComponent(document.getElementById("pealkiriEst" + indexNumber).value),
        en: encodeURIComponent(document.getElementById("pealkiriEn" + indexNumber).value),
      };
      pealkirjadData.push(pealkiri);
    }
    return pealkirjadData;
  }
}

function createKooristLiikmedData(event) {
  if (kooristLiikmed !== null) {
    var liikmedData = {
      haaleruhmaNimed: [],
      haaleruhmaTutvustused: [],
      lauljadPealkiri: {
        est: encodeURIComponent(document.getElementById("lauljadPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("lauljadPealkiriEn").value)
      },
      sopranid: encodeURIComponent(document.getElementById("sopranid").value),
      aldid: encodeURIComponent(document.getElementById("aldid").value),
      tenorid: encodeURIComponent(document.getElementById("tenorid").value),
      bassid: encodeURIComponent(document.getElementById("bassid").value),
      vilistlastePealkiri: {
        est: encodeURIComponent(document.getElementById("vilistlastePealkiriEst").value),
        en: encodeURIComponent(document.getElementById("vilistlastePealkiriEn").value)
      },
      vilistlasteNimekiri: {
        est: encodeURIComponent(document.getElementById("vilistlasteNimekiriEst").value),
        en: encodeURIComponent(document.getElementById("vilistlasteNimekiriEn").value)
      },
      loigud: []
    };

    for (var i = 1; i < 5; i++) {
      var haaleruhmaNimi = {
        est: encodeURIComponent(document.getElementById("haaleruhmaNimiEst" + i).value),
        en: encodeURIComponent(document.getElementById("haaleruhmaNimiEn" + i).value)
      };
      var haaleruhmaTutvustus = {
        est: encodeURIComponent(document.getElementById("haaleruhmaTutvustusEst" + i).value),
        en: encodeURIComponent(document.getElementById("haaleruhmaTutvustusEn" + i).value)
      };
      liikmedData.haaleruhmaNimed.push(haaleruhmaNimi);
      liikmedData.haaleruhmaTutvustused.push(haaleruhmaTutvustus);
    }

    for (var a = 0; a < document.querySelectorAll(".liikmedLoik").length; a++) {
      var loik = {
        est: encodeURIComponent(document.querySelectorAll(".liikmedLoikEst")[a].value),
        en: encodeURIComponent(document.querySelectorAll(".liikmedLoikEn")[a].value),
      };
      liikmedData.loigud.push(loik);
    }
    return liikmedData;
  }
}

function createKooristAjaluguData(event) {

  if (kooristAjalugu !== null) {

    var ajaluguData = {
      sissejuhatus: {
        pealkiri: {
          est: encodeURIComponent(document.getElementById("ajaluguSissejuhatusPealkiriEst").value),
          en: encodeURIComponent(document.getElementById("ajaluguSissejuhatusPealkiriEn").value)
        },
        loigud: []
      },
      ajajoon: {
        pealkiri: {
          est: encodeURIComponent(document.getElementById("ajaluguSissekannePealkiriEst").value),
          en: encodeURIComponent(document.getElementById("ajaluguSissekannePealkiriEn").value)
        },
        sissekanded: []
      },
      sektsioonid: []
    };

    for (var i = 0; i < document.querySelectorAll(".ajaluguSissekanneLoik").length; i++) {
      var sissekanne = {
        year: encodeURIComponent(document.querySelectorAll(".ajaluguSissekanneLoikYear")[i].value),
        est: encodeURIComponent(document.querySelectorAll(".ajaluguSissekanneLoikEst")[i].value),
        en: encodeURIComponent(document.querySelectorAll(".ajaluguSissekanneLoikEn")[i].value)
      };
      ajaluguData.ajajoon.sissekanded.push(sissekanne);
    }

    for (var a = 0; a < document.querySelectorAll(".ajaluguSissejuhatusLoik").length; a++) {
      var sissejuhatavLoik = {
        est: encodeURIComponent(document.querySelectorAll(".ajaluguSissejuhatusLoikEst")[a].value),
        en: encodeURIComponent(document.querySelectorAll(".ajaluguSissejuhatusLoikEn")[a].value)
      };
      ajaluguData.sissejuhatus.loigud.push(sissejuhatavLoik);
    }

    for (var b = 0; b < document.querySelectorAll(".ajaluguSubform").length; b++) {
      var sektsioon = {
        pealkiri: {
          est: encodeURIComponent(document.querySelectorAll(".ajaluguPealkiriEst")[b].value),
          en: encodeURIComponent(document.querySelectorAll(".ajaluguPealkiriEn")[b].value)
        },
        loigud: []
      };

      var indexNumber = b + 1;

      for (var c = 0; c < document.querySelectorAll(".ajalugu" + indexNumber + "Loik").length; c++) {

        var loik = {
          est: encodeURIComponent(document.querySelectorAll(".ajalugu" + indexNumber + "LoikEst")[c].value),
          en: encodeURIComponent(document.querySelectorAll(".ajalugu" + indexNumber + "LoikEn")[c].value)
        };
        sektsioon.loigud.push(loik);
      }
      ajaluguData.sektsioonid.push(sektsioon);
    }
    return ajaluguData;
  }
}

function createKooristMeediaData(event) {

  if (kooristMeedia !== null) {

    var meediaData = {

      sissejuhatus: {
        pealkiri: {
          est: encodeURIComponent(document.getElementById("meediaPealkiriEst").value),
          en: encodeURIComponent(document.getElementById("meediaPealkiriEn").value)
        },
        loigud: []
      },
      videod: {
        pealkiri: {
          est: encodeURIComponent(document.getElementById("meediaVideoPealkiriEst").value),
          en: encodeURIComponent(document.getElementById("meediaVideoPealkiriEn").value)
        },
        manustamislingid: []
      },
      muudLingid: {
        pealkiri: {
          est: encodeURIComponent(document.getElementById("meediaLinkPealkiriEst").value),
          en: encodeURIComponent(document.getElementById("meediaLinkPealkiriEn").value)
        },
        lingid: []
      },
    };

    for (var i = 0; i < document.querySelectorAll(".meediaLoik").length; i++) {
      var loik = {
        est: encodeURIComponent(document.querySelectorAll(".meediaLoikEst")[i].value),
        en: encodeURIComponent(document.querySelectorAll(".meediaLoikEn")[i].value),
      };
      meediaData.sissejuhatus.loigud.push(loik);
    }
    for (var a = 0; a < document.querySelectorAll(".meediaVideoLoik").length; a++) {
      var manustamislink = encodeURIComponent(document.querySelectorAll(".meediaVideoLoikLink")[a].value);
      meediaData.videod.manustamislingid.push(manustamislink);
    }
    for (var b = 0; b < document.querySelectorAll(".meediaLinkLoik").length; b++) {
      var link = {
        est: encodeURIComponent(document.querySelectorAll(".meediaLinkLoikEst")[b].value),
        en: encodeURIComponent(document.querySelectorAll(".meediaLinkLoikEn")[b].value),
        link: encodeURIComponent(document.querySelectorAll(".meediaLinkLoikLink")[b].value),
      };
      meediaData.muudLingid.lingid.push(link);
    }
    return meediaData;
  }
}

function createKontaktData() {

  var kontaktData = {
    uldine: {
      loigud: []
    },
    andmed: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("andmedPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("andmedPealkiriEn").value),
      },
      paarid: []
    },
    numbrid: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("numbridPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("numbridPealkiriEn").value),
      },
      numbrid: []
    },
    mtu: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("mtuPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("mtuPealkiriEn").value),
      },
      paarid: []
    },
    ikoonid: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("ikoonidPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("ikoonidPealkiriEn").value),
      },
      ikoonid: []
    },
  };
  for (var i = 0; i < document.querySelectorAll(".uldineLoik").length; i++) {

    var loik = {
      est: encodeURIComponent(document.querySelectorAll(".uldineLoikEst")[i].value),
      en: encodeURIComponent(document.querySelectorAll(".uldineLoikEn")[i].value)
    };
    kontaktData.uldine.loigud.push(loik);
  }
  for (var a = 0; a < document.querySelectorAll(".andmedLoik").length; a++) {
    var teaveAndmed = {
      estKey: encodeURIComponent(document.querySelectorAll(".andmedLoikEstKey")[a].value),
      enKey: encodeURIComponent(document.querySelectorAll(".andmedLoikEnKey")[a].value),
      est: encodeURIComponent(document.querySelectorAll(".andmedLoikEst")[a].value),
      en: encodeURIComponent(document.querySelectorAll(".andmedLoikEn")[a].value)
    };
    kontaktData.andmed.paarid.push(teaveAndmed);
  }
  for (var b = 0; b < document.querySelectorAll(".numbridLoik").length; b++) {
    var number = {
      estKey: encodeURIComponent(document.querySelectorAll(".numbridLoikEstKey")[b].value),
      enKey: encodeURIComponent(document.querySelectorAll(".numbridLoikEnKey")[b].value),
      number: encodeURIComponent(document.querySelectorAll(".numbridLoikNumber")[b].value)
    };
    kontaktData.numbrid.numbrid.push(number);
  }
  for (var c = 0; c < document.querySelectorAll(".mtuLoik").length; c++) {
    var teaveMtu = {
      estKey: document.querySelectorAll(".mtuLoikEstKey")[c].value,
      enKey: document.querySelectorAll(".mtuLoikEnKey")[c].value,
      est: document.querySelectorAll(".mtuLoikEst")[c].value,
      en: document.querySelectorAll(".mtuLoikEn")[c].value
    };
    kontaktData.mtu.paarid.push(teaveMtu);
  }
  for (var d = 0; d < document.querySelectorAll(".ikoonidLoik").length; d++) {
    var ikoon = {
      icon: document.querySelectorAll(".ikoonidLoikIcon")[d].value,
      link: document.querySelectorAll(".ikoonidLoikLink")[d].value
    };
    kontaktData.ikoonid.ikoonid.push(ikoon);
  }
  return kontaktData;
}


function createVastuvottData() {

  var vastuvottData = {
    tekstid: {
      loigud: []
    },
    ankeet: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("ankeetPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("ankeetPealkiriEn").value)
      },
      valjad: []
    }
  };
  for (var i = 0; i < document.querySelectorAll(".vastuvottLoik").length; i++) {
    var loik = {
      est: encodeURIComponent(document.querySelectorAll(".vastuvottLoikEst")[i].value),
      en: encodeURIComponent(document.querySelectorAll(".vastuvottLoikEn")[i].value),
    };
    vastuvottData.tekstid.loigud.push(loik);
  }
  for (var a = 0; a < document.querySelectorAll(".ankeetLoik").length; a++) {
    var vali = {
      est: encodeURIComponent(document.querySelectorAll(".ankeetLoikEst")[a].value),
      en: encodeURIComponent(document.querySelectorAll(".ankeetLoikEn")[a].value),
    };
    vastuvottData.ankeet.valjad.push(vali);
  }
  return vastuvottData;
}


function createAnkeetData() {

  var ankeetData = [];

  for (var i = 0; i < document.querySelectorAll(".ankeetField").length; i++) {
    var vali = "'" + encodeURIComponent(document.querySelectorAll(".ankeetField")[i].value + "'");

    ankeetData.push(vali);
  }

  return ankeetData;
}

// function that creates nothing relevant (used for ajax post requests that have no data to send)

function createNonData() {
  return "Not data";
}

// function that creates the data necessary for deleting "loik" elements

function createDeleteData(target) {

  // get the classlist of the deleted element

  var classList = target.classList;

  // get the last name in the classlist, which is also the name of the subform

  var lastElement = getLastElement(classList);

  // get the length of the subform's name in characters

  var nameLength = lastElement.length;

  // create the "deleteData" object for sending to the server,
  // where the formName propery comes from the elements classlist and the idNumber is the number retrieved from the end of the element's id

  var deleteData = {
    formName: lastElement,
    idNumber: target.id.slice(nameLength)
  };

  // return the object

  return deleteData;
}


// function for creating the data necessary to delete a "dirigendid" subform, which will be sent to the server

function createDeleteDirigendidData(target) {

  // obtain the id number of the deleted subform using the target id and construct a js object to send to the server

  var deleteData = {
    formName: "dirigendidSubform",
    idNumber: target.id.slice(10, -7)
  };

  // return the constructed object

  return deleteData;
}


// function for creating the data necessary to delete a "sundmused" subform, which will be sent to the server

function createDeleteAjaluguData(target) {

  // obtain the id number of the deleted subform using the target id and construct a js object to send to the server

  var deleteData = {
    formName: "ajaluguSubform",
    idNumber: target.id.slice(7, -7)
  };

  // return the constructed object

  return deleteData;
}


// function for creating the data necessary to delete a "sundmused" subform, which will be sent to the server

function createDeleteSundmusedData(target, textQuery) {

  // obtain the id number of the deleted subform using the target id

  var idNumber = target.id.slice(9, -7);


  // construct a js object that includes information about the deleted element, which will be sent to the server

  var deleteData = {
    textQuery: textQuery,
    formName: "sundmusedSubform",
    idNumber: idNumber
  };

  // return the constructed object

  return deleteData;
}


// function for creating the data necessary to delete a "moodunud" subform, which will be sent to the server

function createDeleteMoodunudData(target) {

  // obtain the id number of the deleted subform using the target id

  var idNumber = target.id.slice(8, -7);


  // construct a js object that includes information about the deleted element, which will be sent to the server

  var deleteData = {
    formName: "sundmusedSubform",
    idNumber: idNumber
  };

  // return the constructed object

  return deleteData;
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

// check if the current page is "admin/vastuvott" by checking if the vastuvott form element exists

if (vastuvott !== null) {

  vastuvott.addEventListener("submit", function(event) {
    ajaxBodyParser(event, new BodyParserParam(createVastuvottData, "vastuvott", "update"));
  });
}

// check if the current page is "admin/sundmused" by checking if the sündmused form element exists

if (sundmused !== null) {

  sundmused.addEventListener("submit", function(event) {
    ajaxMulter(event, new MulterParam(sundmused, "sundmused"));
  });
}

// check if the current page is "admin/andmebaas" by checking if the "moodunud" form element exists

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



// add an event listener, which listens for clicks on the various add and delete buttons on the admin/koorist page

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
  } else if (event.target === meediaLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/new", "create", "koorist"));
  } else if (event.target === meediaVideoLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/video/new", "create", "koorist"));
  } else if (event.target === meediaLinkLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "meedia/link/new", "create", "koorist"));
  } else if (event.target === toetajadLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "toetajad/new", "create", "koorist"));
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
    ajaxBodyParser(event, new BodyParserParam(createNonData, "vastuvott/new", "create", "vastuvott"));
  } else if (event.target === ankeetLoikAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "vastuvott/ankeet/new", "create", "vastuvott"));
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



    // check if the clicked element is a dynamically created add new "loik" button on a "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addMoodunudLoikIdNumber = event.target.id.slice(8, -10);

    // call the ajax function, with the destination route being "moodunud" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "moodunud" + addMoodunudLoikIdNumber + "/new", "create", "andmebaas"));



    // check if the clicked element is a dynamically created add new "loikKoht" button on a "moodunud" subform

  } else if (event.target.classList.contains("moodunudLoikKohtAddBtn")) {

    // get the post destination route-
    // first obtain an id number from the id of the clicked element

    var addMoodunudLoikKohtIdNumber = event.target.id.slice(8, -14);

    // call the ajax function, with the destination route being "moodunud/koht" + the id number

    ajaxBodyParser(event, new BodyParserParam(createNonData, "moodunud/koht" + addMoodunudLoikKohtIdNumber + "/new", "create", "andmebaas"));



    // check if the clicked element is a previously defined add new "dirigendid" subform button

  } else if (event.target === dirigendidAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "dirigendid/new", "create", "koorist", "dirigendid"));

    // check if the clicked element is a previously defined add new "ajalugu" subform button

  } else if (event.target === ajaluguAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "ajalugu/new", "create", "koorist", "ajalugu"));

    // check if the clicked element is a previously defined add new "sundmused" subform button

  } else if (event.target === sundmusedAddBtn) {
    ajaxBodyParser(event, new BodyParserParam(createNonData, "sundmused/new", "create", "sundmused", "sundmused"));


    // check if the clicked element is a specific delete "loik" button

  } else if (event.target.classList.contains("sissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "sissejuhatus");
  } else if (event.target.classList.contains("liikmedLoikDeleteBtn")) {
    createDeleteMessage(event, "liikmed");
  } else if (event.target.classList.contains("ajaluguSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "ajalugu/sissejuhatus");
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
  } else if (event.target.classList.contains("sundmusedSissejuhatusLoikDeleteBtn")) {
    createDeleteMessage(event, "sundmused/sissejuhatus");
  } else if (event.target.classList.contains("andmebaasLoikDeleteBtn")) {
    createDeleteMessage(event, "ankeet");

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


  } else if (event.target.classList.contains("moodunudDeleteBtn")) {
    createDeleteMessage(event, "moodunud", "moodunud");


  } else if (event.target.classList.contains("moodunudRestoreBtn")) {
    createDeleteMessage(event, "moodunud/restore", "moodunud");
  }
});

// listen for changes on the bold text button

boldBtn.addEventListener("change", getMarkupText);


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
