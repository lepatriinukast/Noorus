

////////////////////////////////////////// A MANUAL ON HOW THE CODE FOR DYNAMIC INPUTS WORKS IN index.js //////////////////////////////////////////////////////////


////////////////////////////////////////////////////////// INTRODUCTION /////////////////////////////////////////////////////////////////////////////////////

// On the admin pages the user can update the text and images displayed on the web page noorus.ee- the code for creating such an environment is quite easy.
// However, there are also two types of dynamic elements that the user can create or delete on his/her own. Those are:

// FIRSTLY: Dynamic paragraphs aka "Loik" elements (the name "loik" comes from the estonian word for paragraph)
// SECONDLY: Dynamic subforms, which may also contain dynamic "loik" elements of its own.

// Coding this feature is much more difficult.

// THUS, I have created a specific coding environment that can be reused every time when there is a need to create more of those dynamic elements.
// This environment means that FIRSTLY there is a specific HTML (and EJS) structure for the dynamic parts of the admin pages,
// SECONDLY the attributes of these HTML elements must be named in a specific way
// and THIRDLY some very specific javascript code will need to written into the index.js file.



/////////////////////////////////////////////// HTML AND EJS STRUCTURE FOR DYNAMIC ELEMENTS ON THE ADMIN PAGES //////////////////////////////////////////////////


// OPTION 1. HTML and EJS structure for "Loik" element in a form on an admin page (All inputs are optional and can be omitted):


<form action="/upload/someRouteName" method="post" enctype="multipart/form-data" class="page-admin__form" id="someFormName">
  <h3 class="page-admin__title">Some Heading</h3>

// Optionally some other inputs


// wrapper code:

  <div class="page-admin__form-box" id="somethingLoikForm">
    <% for (var i = 0; i < someData.length; i++) { %>
    <div class="page-admin__form-field somethingLoik" id="somethingLoik<%= i + 1 %>" data-heading="Some subheading">
      <h3 class="page-admin__heading somethingLoikHeading">Some subheading <%= i + 1 %></h3>

// custom text inputs (There are many custom text inputs- replace "InputType" with the name of the particular one you need)

      <p class="page-admin__text">Heading for the text input</p>
      <input class="page-admin__input input somethingLoikInputType" type="text" id="somethingLoikInputType<%= i + 1 %>" name="somethingLoikInputType<%= i + 1 %>" value="<%- someData.someInputTypeValue %>">

// for boldable text-area inputs require a hidden input and a corresponding editable div

<p class="page-admin__text">Heading for the text input</p>
<div class="page-admin__input input editable-input somethingLoikInputTypeEd" id="somethingLoikInputType<%= i + 1 %>Ed" name="somethingLoikInputType<%= i + 1 %>Ed" value="<%- someData.someInputTypeValue %>">
<input class="page-admin__input somethingLoikInputType" type="text" id="somethingLoikInputType<%= i + 1 %>" name="somethingLoikInputType<%= i + 1 %>" value="<%- someData.someInputTypeValue %>">


// "file" input:

     <input class="page-admin__hidden-input file someNameLoikFile" type="file" id="someNameLoikFile<%= i + 1 %>" name="someNameLoikFile<%= i + 1 %>">

// "label" element:

     <label class="someNameLoikLabel" for="someNameLoikFile<%= i + 1 %>" class="page-admin__small-btn" id="someNameLoikLabel<%= i + 1 %>">Choose file</label>

// "placeholder" element:

     <p class="page-admin__input-placeholder someNameLoikPlaceholder" id="someNameLoikPlaceholder<%= i + 1 %>"></p>

// "img" element:

    <img class="page-admin__icon someNameImg" src="<%=  %>" id="someNameImg<%= i + 1 %>" alt="Some subheading <%= i + 1 %>">

// delete "loik" button:

      <button class="page-admin__small-btn deleteBtn somethingLoikDeleteBtn" type="button" id="somethingLoikDeleteBtn<%= i + 1 %>" name="somethingLoikDeleteBtn<%= i + 1 %>">Delete the element</button>

    </div>
    <% } %>
    </div>

// add "loik" button:

  <div class="page-admin__form-box">
    <button class="page-admin__small-btn" type="button" id="somethingLoikAddBtn">Add an element</button>
  </div>

  // Optionally some other inputs


  // Save changes button:

  <div class="page-admin__form-box">
    <button class="page-admin__btn" type="submit" id="someBtnId">Save changes</button>
  </div>

  </form>






// OPTION 2. HTML and EJS structure for a dynamic subform that contains dynamic "loik" elements:


<form action="/upload/someRouteName" method="post" enctype="multipart/form-data" class="page-admin__form" id="someFormName">
  <h3 class="page-admin__title">Some Heading</h3>

// Optionally some other inputs outside the dynamic subform

  <div class="page-admin__form-wrapper" id="somethingForm">
    <% for (var a = 0; a < someData.length; a++) { %>
    <div class="page-admin__subform somethingSubform" name="<%= a + 1 %>Subform" id="<%= a + 1 %>Subform">
      <h2 class="page-admin__subheading somethingHeading" id="<%= a + 1 %>Heading" name="<%= a + 1 %>Heading">Some Subform heading <%= a + 1 %></h2>
      <div class="page-admin__form-box">

// Optionally some other inputs inside the dynamic subform- these will need specific naming and some extra coding- will be explained later

      <div class="page-admin__form-box somethingLoikForm" id="something<%= a + 1 %>LoikForm" name="something<%= a + 1 %>LoikForm">
        <% for (var i = 0; i < someData[a].someSubData.length; i++) { %>
        <div class="page-admin__form-field something<%= a + 1 %>Loik" id="something<%= a + 1 %>Loik<%= i + 1 %>" data-heading="Some subheading">
          <h3 class="page-admin__heading something<%= a + 1 %>LoikHeading">Some subheading <%= i + 1 %></h3>

// custom text inputs (replace "InputType with the name of the particular input you need, the HTML textarea element can also be replaced with a regular input element"):

          <p class="page-admin__text">Heading for the text input</p>
          <textarea type="text" class="page-admin__input page-admin__text-area input something<%= a + 1 %>LoikInputType" id="something<%= a + 1 %>LoikInputType<%= i + 1 %>" name="something<%= a + 1 %>LoikInputType<%= i + 1 %>"
            rows="1"><%= someData[a].someSubData[i].someEstValue %></textarea>

// delete "loik" element button:

          <button class="page-admin__small-btn somethingLoikDeleteBtn something<%= a + 1 %>LoikDeleteBtn" type="button" id="something<%= a + 1 %>LoikDeleteBtn<%= i + 1 %>" name="something<%= a + 1 %>LoikDeleteBtn<%= i + 1 %>">Delete the "loik" element</button>

        </div>
        <% } %>
      </div>

// Buttons for adding a "loik" element and deleting the subform:

      <div class="page-admin__form-box">
        <button class="page-admin__small-btn somethingLoikAddBtn" type="button" id="something<%= a + 1 %>LoikAddBtn">Add an element</button>
        <button class="page-admin__small-btn somethingDeleteBtn" type="button" id="something<%= a + 1 %>DeleteBtn">Delete the subform</button>
      </div>


    </div>
    <% } %>
  </div>

// Button for adding a subform:

  <div class="page-admin__form-box">
    <button class="page-admin__btn" id="somethingAddBtn">Add a subform</button>
  </div>

  // Save changes button:

  <div class="page-admin__form-box">
    <button class="page-admin__btn" type="submit" id="someBtnId">Save changes</button>
  </div>

</form>




////////////////////////////////////////////////// NAMING STRUCTURE FOR THE ATTRIBUTES OF DYNAMIC HTML ELEMENTS /////////////////////////////////////////////////////////////

// There are clear rules for how most of the attributes of the dynamic HTML elements must be named- these can be seen below


// OPTION 1. THE NAMING RULES FOR "LOIK" ELEMENTS:



// NOTE: each form-box needs to be represented by a unique string- let's call it "someName",
 // this will be used several times throughout the descendant elements of the form-box-
 // when creating a new dynamic element, replace "someName" with a new unique string

 // This string can be any letter combination we like, but it has to be unique to its form-box element
  // and exactly the same throughout the descendant elements of the form-box



 // FORM ITSELF:

     // (page-admin__form): needs an freely chosen id


// FORM-BOX (page-admin__form-box):

    // needs an id of "someNameLoikForm"


// NOTE: THE ELEMENTS BELOW WILL BE INSIDE A FOR LOOP CREATED WITH EJS!!!
// THE LETTER "i" MARKS THE ITERATOR!!!



// FORM-FIELD (page-admin__form-field):

    // the very last class (IMPORTANT!) in the classlist has to be "someNameLoik"
    // this element also needs an id of "somenameLoik<%= i + 1 %>"
    // and a custom data-heading attribute, which can be a freely constructed string- let's call it "customHeading"
    // the data-heading attribute will be displayed on the admin page as a heading for the dynamic "loik" element


// "LOIK" HEADING (page-admin__heading):

    // the very last class needs to be "someNameHeading" and the value has to be "customHeading <%= i + 1 %>"
    // NB: We created the "customHeading" string just above- these two have to match!
    // Also note that in this case there is a space between "customHeading" and the ejs code"


// CUSTOM TEXT INPUTS (page-admin__input):

    // needs a class of "input", but the very last class in the classlist needs to be "someNameLoikInputType"
    // also needs identical id and name attributes of "someNameLoikInputTyper<%= i + 1 %>"
    // note that "InputType" actually needs to be replaced everywhere by the name of the particular input needed

// CUSTOM BOLDABLE TEXT-AREAS (page-admin__input) and (page-admin__hidden-input)

    // needs TWO elements-

    // firstly a div with classes "input" and "editable-input" and the contenteditable attribute set to "true",
    // the very last class in the classlist needs to be named "someNameLoikInputTypeEd"
    // also needs an id of "someNameLoikInputType<%= i + 1 %>Ed"

     // secondly an input with the class "page-admin__hidden input"
     // the very last class in its classlist has to be "someNameLoikInputType"
     // also needs identical id and name attributes of "someNameLoikInputType<%= i + 1 %>"

      // note that "InputType" actually needs to be replaced everywhere by the name of the particular input needed,
      // whatever string replaces "InputType" on one of these elements has to be the same on the other one as well

      // note also that with both elements all the html provided by ejs has to be between these tags <%- %> not these <%= %>

// DELETE "LOIK" BUTTON (page-admin__small-btn):

   // needs a class of "deleteBtn", but the very last class in the classlist needs to be "someNameLoikDeleteBtn"
   // also needs identical id and name attributes of "someNameLoikDeleteBtn<%= i + 1 %>"

// ADD "LOIK" BUTTON (page-admin__small-btn):

   // needs an id of "someNameLoikAddBtn"


// IMAGE INPUT ELEMENTS:


// FILE INPUT (page-admin__hidden-input):

    // needs a class of "file", but the last class has to be "someNameLoikFile"
     // also needs an id and name of "someNameLoikFile<%= i + 1 %>"


// LABEL (page-admin__small-btn):

    // needs a "for" attribute of "someNameLoikFile<%= i + 1 %>" (the id of corresponding hidden input)
    // also needs an id and name of "someNameLoikLabel<%= i + 1 %>", the last class in the classlist has to be "someNameLoikLabel"


// PLACEHOLDER (page-admin__input-placeholder):

    // needs an id of "someNameLoikPlaceholder" and the last class in the classlist needs to be "someNameLoikPlaceholder"


// ICON (page-admin__icon):

    // needs an id of "someNameLoikImg<%= i + 1 %" and an "alt" attribute of whatever string feels appropriate plus <%= i + 1 %> after an empty space
    // also the last class in the classlist needs to be "someNameLoikImg"



// OPTION 2. THE NAMING RULES FOR DYNAMIC SUBFORMS, WITH "LOIK" ELEMENTS OF THEIR OWN


// In this case a unique name has to be created too (let's call it "someName" again),
// but this time it is for each form-wrapper element, and again has to be the same throughout all its descendants


// FORM ITSELF (page-admin__form):

    // Needs a freely chosen id


// FORM-WRAPPER (page-admin__form-wrapper):

    // Needs an id of "someNameForm"



    // NOTE: THE ELEMENTS BELOW WILL BE INSIDE A FOR LOOP CREATED WITH EJS!!!
    // THE LETTER "a" MARKS THE ITERATOR!!!




// SUBFORM (page-admin__subform):

    // The last class in the element's classlist has to be "someNameSubform"
    // this element also needs identical id and name attributes of "someName<%= a + 1 %>Subform"

// HEADING (page-admin__subheading):

    // The last class in the element's classlist needs to be "someNameHeading",
    // also needs identical id an name attributes of "someName<%= a + 1 %>Heading"
    // The value of this element has to be a custom string (let's call it "customFormHeading"),
    // followed by a space and <%= a + 1 %>, as follows:

    // "customFormHeading <%= a + 1 %>"

    // This value will be displayed on the admin page as the heading of the subform




// POTENTIALLY LOTS OF OPTIONAL NON-DYNAMIC ELEMENTS:

    // These can be images, text or whichever type of inputs are needed on the subform.
    // Extra code has to be written in index.js for each of those elements,
    // HOWEVER, the unique custom string that we called "someName" must still be used when naming the attributes of these elements:

    // The element always needs an id, which should be called "someName<%= a + 1 %>Something"
    // "someName" is the same unique string we created above, while "Something" is whatever we want

    // If it also needs a name attribute, it should be identical to the id

    // The the last class of the element should always be "someNameSomething"
    // NB: "Something" is a custom string that must match the "Something" that we used in id and name attributes



// NOTE: BELOW ARE THE DYNAMIC "LOIK" ELEMENTS




// FORM-BOX (page-admin__form-box):

   // the last class has to be "someNameLoikForm",
   // while the id and name attributes are "someName<%= a + 1 %LoikForm>"



// NOTE: THE ELEMENTS BELOW ARE WILL BE INSIDE ANOTHER FOR LOOP CREATED WITH EJS!
// THIS TIME THE LETTER "i" MARKS THE ITERATOR, SO THERE ARE NOW TWO ITERATORS- "a" and "i"!




// FORM-FIELD (page-admin__form-field):

   // the last class needs to be "someName<%= a + 1 %>Loik",
   // id and name attributes are "someName<%= a + 1 %>Loik<%= i + 1 %>" (note the two iterators).
   // This element also requires a custom "data-heading" attribute, which should be set to equal a custom string,
   // it can be whatever we want (let's call it "customHeading" again)
   // This will be displayed on the admin page as the heading for the "loik" inputs


// "LOIK" HEADING (page-admin__heading):

    // the very last class needs to be "someName<%= a + 1 %>Heading" and the value has to be "customHeading <%= i + 1 %>"
    // NB: We created the "customHeading" string just above- these two have to match!
    // Also note that in this case there is a space between "customHeading" and the ejs code"


// CUSTOM TEXT INPUTS (page-admin__input) and optionally (page-admin__text-area):

    // needs a class of "input", but the very last class in the classlist needs to be "someName<%= a + 1 %>LoikInputType"
    // also needs identical id and name attributes of "someName<%= a + 1 %>LoikInputType<%= i + 1 %>"
    // note that "InputType" actually needs to be replaced everywhere by the name of the particular input we need


// DELETE "LOIK" BUTTON (page-admin__small-btn):

    // needs a class of "deleteBtn", but the very last class in the classlist needs to be "someName<%= a + 1 %>LoikDeleteBtn"
    // also needs identical id and name attributes of "someName<%= a + 1 %>LoikDeleteBtn<%= i + 1 %>"



// NOTE: THE ELEMENTS BELOW ARE OUTSIDE OF THE INNER LOOP BUT STILL INSIDE THE OUTER ONE! (no "i" iterator anymore)




// ADD "LOIK" BUTTON (page-admin__small-btn):

   // the last class in its classlist must be "someNameLoikAddBtn",
   // also needs an id of "someName<%= a + 1 %>LoikAddBtn"


// DELETE SUBFORM BUTTON (page-admin__small-btn):

   // the last class in its classlist needs to be "someNameDeleteBtn",
   // also needs an id of "someName<%= a + 1 %>DeleteBtn"



// NOTE: HERE THE OUTER LOOP ENDS AS WELL! (no "a" iterator anymore)




// ADD SUBFORM BUTTON (page-admin__btn):

// needs an id of "someNameAddBtn"











////////////////////////////////////////// JAVASCRIPT CODE PRINCIPLES IN INDEX.JS FOR THE DYNAMIC ELEMENTS ////////////////////////////////////////////////


/// OPTION 1. FOR A NEW UPLOAD ROUTE CONTAINING "LOIK" ELEMENTS, DO THIS IN INDEX.JS:

// define a variable for the form itself, if it doesn't exist already
// define a variable for the add new loik button(s)
// define a variable for the delete loik button(s)

// add a new event listener for the "submit" event, and in the callback construct a new BodyParserParam or MulterParam with arguments

// (if using BodyParserParam, define a new function for data creation)

// add an event listener for clicks on delete loik button(s)
// add an event listener for clicks on add loik button(s)





// OPTION 2. FOR A NEW UPLOAD ROUTE CONTAINING A DYNAMIC SUBFORM WITH "LOIK" ELEMENTS, DO THIS IN INDEX.JS:

// NOTE: If the "Loik" elements are located on a dynamic subform like in this case,
// then only follow option 2, no need to create extra code for the "loik" elements only



// define a variable for the form itself if it doesn't exist already
// define a variable for the subform

// some optional inputs outside "loik" elements may also need to be captured in a variable (image inputs, for example)

// define a a variable for the add subform button
// create an array of all add loik buttons on this subform

// create an array of delete subform buttons
// create an array of delete loik button arrays (arrays in arrays in arrays, right?)


// create lots of functions, SPECIFICALLY:



// create a function for for getting the relevant DOM arrays specifically for these new dynamic subform-
 // the structure is shown below (someName is again meant to be replaced with a name we come up with ourselves):


function getSomeNameSubforms() {

var someNameSubforms = {

  subformArray: Array.from(document.querySelectorAll(".someNameSubform")),

  // potentially some arrays for other optional inputs

  subformHeadingArray: Array.from(document.querySelectorAll(".someNameHeading")),
  subformLoikFormArray: Array.from(document.querySelectorAll(".someNameLoikForm")),
  subformLoikAddBtnArray: Array.from(document.querySelectorAll(".someNameLoikAddBtn")),
  subformDeleteBtnArray: Array.from(document.querySelectorAll(".someNameDeleteBtn")),
  subformLoikArrays: [],
  subformLoikEstArrays: [],
  subformLoikEnArrays: [],
  subformLoikHeadingArrays: [],
  subformLoikDeleteBtnArrays: []
}

// populate the empty arrays using a for loop

for (var i = 0; i < someNameSubforms.subformLoikFormArray.length; i++) {

  var idNumber = i + 1;
  var subformLoikArray = Array.from(document.querySelectorAll(".someName" + idNumber + "Loik"));
  var subformLoikEstArray = Array.from(document.querySelectorAll(".someName" + idNumber + "LoikEst"));
  var subformLoikEnArray = Array.from(document.querySelectorAll(".someName" + idNumber + "LoikEn"));
  var subformLoikHeadingArray = Array.from(document.querySelectorAll(".someName" + idNumber + "LoikHeading"));
  var subformLoikDeleteBtnArray = Array.from(document.querySelectorAll(".someName" + idNumber + "LoikDeleteBtn"));

  // push these arrays into the someNameSubforms object

  someNameSubforms.subformLoikArrays.push(subformLoikArray);
  someNameSubforms.subformLoikEstArrays.push(subformLoikEstArray);
  someNameSubforms.subformLoikEnArrays.push(subformLoikEnArray);
  someNameSubforms.subformLoikHeadingArrays.push(subformLoikHeadingArray);
  someNameSubforms.subformLoikDeleteBtnArrays.push(subformLoikDeleteBtnArray);
}

return someNameSubforms;

}


// create a function, which when a subform is deleted:
// takes the deleted subform as an argument
// and returns its index in the subformArray that we created in the previous function

function getSomeNameSubformIndex(element) {

  // get the subforms object

  var someNameSubforms = getsomeNameSubforms();

  // get the index of the deleted subform in its array

  var someNameSubformIndex = someNameSubforms.subformArray.indexOf(element);

  // return the retrieved index

  return someNameSubformIndex;
}


// create a function, which when a new subform is added to the page:
// takes a HTML string parsed with a DOMParser (typically doc) as an argument,
// creates arrays of relevant DOM objects inside this parsed HTML string,
// and creates an object out of these arrays


function getDocSomeNameSubforms(doc) {

  // construct an object of the retrieved arrays

  var docSomeNameSubforms = {
    docSubformArray: doc.querySelectorAll(".someNameSubform"),

    // optionally some other inputs that are not "loik" related

    docSubformHeadingArray: doc.querySelectorAll(".someNameHeading"),
    docSubformLoikFormArray: doc.querySelectorAll(".someNameLoikForm"),
    docSubformLoikAddBtnArray: doc.querySelectorAll(".someNameLoikAddBtn"),
    docSubformDeleteBtnArray: doc.querySelectorAll(".someNameDeleteBtn")
  };

  // return the object

  return docSomeNameSubforms;
}


// create a function, which gets the last elements from each of those doc arrays we created just above

function getDocSomeNameSubformElements(doc) {

  var docAjaluguSubforms = getDocSomeNameSubforms(doc);

  var docSomeNameSubformElements = {
    docSubformElement: getLastElement(docSomeNameSubforms.docSubformArray),

    // potentially some other non-"loik" inputs

    docSubformHeadingElement: getLastElement(docSomeNameSubforms.docSubformHeadingArray),
    docSubformLoikFormElement: getLastElement(docSomeNameSubforms.docSubformLoikFormArray),
    docSubformLoikAddBtnElement: getLastElement(docSomeNameSubforms.docSubformLoikAddBtnArray),
    docSubformDeleteBtnElement: getLastElement(docSomeNameSubforms.docSubformDeleteBtnArray)
  };

  return docSomeNameSubformElements;
}


// create a function for deleting this specific type of subform:

function deleteSomeNameSubform(element, elementData) {
  element.parentNode.removeChild(element);

  // update the attributes of all subforms left on the page

  updateSomeNameSubforms(element, elementData);
}


// create a function for updating the arrays affected by the deletion of this new subform

function updateSomeNameSubforms(element, elementData) {

  // remove the deleted element from each of the arrays using the received index

  elementData.subforms.subformArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformHeadingArray.splice(elementData.subformIndex, 1);

  // optionally some other inputs not related to "loik" elements

  elementData.subforms.subformLoikFormArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikAddBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformDeleteBtnArray.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEstArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikEnArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikHeadingArrays.splice(elementData.subformIndex, 1);
  elementData.subforms.subformLoikDeleteBtnArrays.splice(elementData.subformIndex, 1);

  // update the properties of the DOM elements that have been affected by element deletion

  updateSomeNameSubformProperties(elementData);
}


// create a function for updating the properties of the DOM elements inside subforms affected by a deletion

function updateSomeNameSubformProperties(elementData) {

  for (var i = 0; i < elementData.subforms.subformArray.length; i++) {

    // because normal people start counting from 1 not 0, add 1 to the index to create element id-s and form headings

    var idNumber = i + 1;

    // update the attributes of all the subform elements affected by the deletion of one of them

    elementData.subforms.subformArray[i].setAttribute("id", "someName" + idNumber + "Subform");
    elementData.subforms.subformArray[i].setAttribute("name", "someName" + idNumber + "Subform");

    // optionally some other inputs outside "loik" elements

    elementData.subforms.subformHeadingArray[i].setAttribute("id", "someName" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].setAttribute("name", "someName" + idNumber + "Heading");
    elementData.subforms.subformHeadingArray[i].innerHTML = "customHeading " + idNumber;
    elementData.subforms.subformLoikFormArray[i].setAttribute("id", "someName" + idNumber + "LoikForm");
    elementData.subforms.subformLoikFormArray[i].setAttribute("name", "someName" + idNumber + "LoikForm");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("id", "someName" + idNumber + "LoikAddBtn");
    elementData.subforms.subformLoikAddBtnArray[i].setAttribute("name", "someName" + idNumber + "LoikAddBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("id", "someName" + idNumber + "DeleteBtn");
    elementData.subforms.subformDeleteBtnArray[i].setAttribute("name", "someName" + idNumber + "DeleteBtn");


    // NOTE: updating the subformHeadingArray requires a custom string
    // that we called "customHeading" and created above when naming HTML elements- these have to match!
    // There is also a space between "customHeading" and idNumber


    // loop through all the "loik" components on every subform of this type and update their attributes

    for (var a = 0; a < elementData.subforms.subformLoikArrays[i].length; a++) {

      // the indexNumber in the end of the "loik" elements' attributes is their position in the array + 1 (since humans count from 1 not 0)

      var indexNumber = a + 1;

      // update all the attributes

      elementData.subforms.subformLoikArrays[i][a].setAttribute("id", "someName" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].setAttribute("name", "someName" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikArrays[i][a].classList), "someName" + idNumber + "Loik" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("id", "someName" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].setAttribute("name", "someName" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEstArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEstArrays[i][a].classList), "someName" + idNumber + "LoikEst" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("id", "someName" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].setAttribute("name", "someName" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikEnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikEnArrays[i][a].classList), "someName" + idNumber + "LoikEn" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("id", "someName" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].setAttribute("name", "someName" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikHeadingArrays[i][a].classList), "someName" + idNumber + "LoikHeading" + indexNumber);
      elementData.subforms.subformLoikHeadingArrays[i][a].innerHTML = "Lõik " + indexNumber;
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("id", "someName" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].setAttribute("name", "someName" + idNumber + "LoikDeleteBtn" + indexNumber);
      elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList.replace(getLastElement(elementData.subforms.subformLoikDeleteBtnArrays[i][a].classList), "someName" + idNumber + "LoikDeleteBtn" + indexNumber);
    }
  }
}


// create a function for retrieving all the node lists that are affected by a subform deletion

function getSomeNameSubformData(element) {

  // create an object from the relevant subform data

  var someNameSubformData = {
    subforms: getSomeNameSubforms(),
    subformIndex: getSomeNameSubformIndex(element)
  };

  // return the object

  return someNameSubformData;
}


// create a function for pushing the asynchronously added arrays on the relevant subform to the arrays on the actual page

function pushSomeNameSubform(arrays, elements) {

  arrays.subformArray.push(elements.docSubformElement);

  // optionally some other input arrays

  arrays.subformHeadingArray.push(elements.docSubformHeadingElement);
  arrays.subformLoikFormArray.push(elements.docSubformLoikFormElement);
  arrays.subformLoikAddBtnArray.push(elements.docSubformLoikAddBtnElement);
  arrays.subformDeleteBtnArray.push(elements.docSubformDeleteBtnElement);

  return arrays;
}


// create a new data creating function, that sends the data necessary for deleting an element to the server


// NOTE: the deleteData object will contain a custom number (let's call it someValue),
// this number must be the length of the string we created in place of "someName"


function createDeleteSomeNameData(target) {

  // obtain the id number of the deleted subform using the target id and construct a js object to send to the server

  var deleteData = {
    formName: "someNameSubform",
    idNumber: target.id.slice(someValue, -7)   // replace someValue with the length of whatever string we use instead of "someName"
  };

  // return the constructed object

  return deleteData;
}



// find the commenceDelete function from index.js and update it as follows:

// there is an "else" keyword just before the comment "if the subform hasn't been specified...",
// before that keyword, add an "else if" statement just like below:



// check, if the subform input has been specified as "someName"

else if (subform === "someName") {

  // if yes, get the parent element of the target input

  var someNameParent = getParent(target);

  // get the the relevant attributes of the deleted subform

  var someNameSubformData = getSomeNameSubformData(someNameParent);

  // the parent element is the one we want to delete- call the below function to do that

  deleteSomeNameSubform(someNameParent, someNameSubformData);

  // call an ajax request to delete relevant data from the database

  ajaxBodyParser(event, new BodyParserParam(function() {
    return createDeleteSomeNameData(someNameParent);
  }, destination + "/delete", "delete"));

}


// find the addElement function and update it as follows:
// There is a keyword "else" just before the comment "use the event target id to get the selector name..."
// add the following code just before the "else" keyword

else if (subform === "someName") {

  // get the relevant subform arrays

  var someNameSubforms = getSomeNameSubforms();

  // get the relevant subform arrays from the not yet visible updated version of the page

  var docSomeNameSubform = getDocSomeNameSubforms(doc);

  // get the last elements of each of the arrays in the docAjaluguSubform object

  var docSomeNameSubformElements = getDocSomeNameSubformElements(doc);

  // push those elements into the existing subform arrays, so that those elements will become visible

  var newSomeNameSubforms = pushSomeNameSubform(someNameSubforms, docSomeNameSubformElements);

  // get the relevant form

  var someNameForm = document.getElementById("someNameForm");

  // call the appendSubform function

  appendSubform(someNameForm, docSomeNameSubformElements);

}


// find the spot where an event listener is added to the document object-
 // just after the comment "add an event listener, which listens for clicks on..."
 // add a new "else if statement" to the call back function like below:


 // check if the clicked element is a previously defined add new "someName" subform button

 else if (event.target.classList.contains("someNameLoikAddBtn")) {

   // get the post destination route-
   // first obtain an id number from the id of the clicked element

   var addSomeNameLoikIdNumber = event.target.id.slice(someValue, -10);


   // NOTE: The variable someValue must be replaced with a number that represents the length of whatever string we use instead of "someName"!



   // call the ajax function, with the destination route being "ajalugu" + the id number

   ajaxBodyParser(event, new BodyParserParam(createNonData, "someName" + addSomeNameLoikIdNumber + "/new", "create", "someEjsTemplate"));

 }


 // NOTE: "someEjsTemplate" above must be replaced by the name of whatever ejs template is used to render this part of the webpage




  // add yet another "else if" statement to the same callback:


 // check if the clicked element is a previously defined add new "someName" subform button

} else if (event.target === someNameAddBtn) {
 ajaxBodyParser(event, new BodyParserParam(createNonData, "someName/new", "create", "someEjsTemplate", "someName"));


 // NOTE: "SomeEjsTemplate" needs to be replaced accordingly again



 // yet another "else if" statement:


 // check if the clicked element is a delete "loik" button on a dynamically created "someName" subform

 else if (event.target.classList.contains("someNameLoikDeleteBtn")) {

 // the event target should have an id, which contains a number between "someName" and "LoikDeleteBtn" - this number will be the idNumber variable
 // this number starts at index someValue (which needs to be replaced by the length of the "someName" string) and ends where "LoikDeleteBtn" starts

 var endOfSomeNameNumber = event.target.id.indexOf("LoikDeleteBtn");
 var deleteSomeNameLoikIdNumber = event.target.id.slice(7, endOfSomeNameNumber);
 createDeleteMessage(event, "someName" + deleteSomeNameLoikIdNumber);

}


// and the last "else if" statement here:


// check if the clicked element is a delete "someName" subform button

 else if (event.target.classList.contains("someNameDeleteBtn")) {
createDeleteMessage(event, "someName", "someName");
}



///////////////////////////////////////////////////////////////// LIST OF PREDIFINED INPUTS: ////////////////////////////////////////////////////

// TEXT INPUTS:

// est
// en
// year
// link
// number
// icon
// estKey
// enKey


// IMAGE INPUTS:

// file
// label
// placeholder
// img
