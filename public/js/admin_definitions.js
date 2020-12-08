// J S  V A R I A B L E   D E F I N I T I O N S   F O R   T H E   A D M I N   P A G E S



// GET ALL THE RELEVANT DOM ELEMENTS (FORMS, SUBFORMS, BUTTONS, INPUTS, POPUPS)




// forms

var avalehtPildid = document.getElementById("avalehtPildid");
var avalehtTekstid = document.getElementById("avalehtTekstid");
var kooristPealkirjad = document.getElementById("kooristPealkirjad");
var kooristSissejuhatus = document.getElementById("kooristSissejuhatus");
var kooristLiikmed = document.getElementById("kooristLiikmed");
var kooristDirigendid = document.getElementById("kooristDirigendid");
var kooristAjalugu = document.getElementById("kooristAjalugu");
var kooristMeedia = document.getElementById("kooristMeedia");
var kooristToetajad = document.getElementById("kooristToetajad");
var kontakt = document.getElementById("kontakt");
var vastuvott = document.getElementById("vastuvott");
var sundmused = document.getElementById("sundmused");
var moodunud = document.getElementById("moodunud");
var ankeet = document.getElementById("ankeet");

// subforms

var dirigendidSubformArray = Array.from(document.querySelectorAll(".dirigendidSubform"));
var ajaluguSubformArray = Array.from(document.querySelectorAll(".ajaluguSubform"));
var sundmusedSubformArray = Array.from(document.querySelectorAll(".sundmusedSubform"));
var moodunudSubformArray = Array.from(document.querySelectorAll(".moodunudSubform"));

// image upload inputs

var paiseikoon = document.getElementById("paiseikoon");
var avalehtLogo = document.getElementById("avalehtLogo");
var avalehtTaustapilt = document.getElementById("avalehtTaustapilt");
var avapilt = document.getElementById("avapilt");

// create an array of single image inputs on all the admin pages

var images = [paiseikoon, avalehtLogo, avalehtTaustapilt, avapilt];

// arrays of image upload inputs

var dirigendidPortreeArray = Array.from(document.querySelectorAll(".dirigendidPortree"));
var toetajadLoikFileArray = Array.from(document.querySelectorAll(".toetajadLoikFile"));
var sundmusedPlakatArray = Array.from(document.querySelectorAll(".sundmusedPlakat"));
var moodunudPlakatArray = Array.from(document.querySelectorAll(".moodunudPlakat"));

// message popups on the admin pages

var deletePopup = document.getElementById("deletePopup");
var successPopup = document.getElementById("successPopup");
var failurePopup = document.getElementById("failurePopup");

// buttons on the popups

var deleteYesBtn = document.getElementById("deleteYesBtn");
var deleteNoBtn = document.getElementById("deleteNoBtn");
var successBtn = document.getElementById("successBtn");
var failureBtn = document.getElementById("failureBtn");

// bold text button

var boldBtn = document.getElementById("boldBtn");

// add "loik" buttons

var sissejuhatusLoikAddBtn = document.getElementById("sissejuhatusLoikAddBtn");
var liikmedLoikAddBtn = document.getElementById("liikmedLoikAddBtn");
var ajaluguSissejuhatusLoikAddBtn = document.getElementById("ajaluguSissejuhatusLoikAddBtn");
var ajaluguSissekanneLoikAddBtn = document.getElementById("ajaluguSissekanneLoikAddBtn");
var meediaLoikAddBtn = document.getElementById("meediaLoikAddBtn");
var meediaVideoLoikAddBtn = document.getElementById("meediaVideoLoikAddBtn");
var meediaLinkLoikAddBtn = document.getElementById("meediaLinkLoikAddBtn");
var toetajadLoikAddBtn = document.getElementById("toetajadLoikAddBtn");
var kontaktSissejuhatusLoikAddBtn = document.getElementById("kontaktSissejuhatusLoikAddBtn");
var uldineLoikAddBtn = document.getElementById("uldineLoikAddBtn");
var andmedLoikAddBtn = document.getElementById("andmedLoikAddBtn");
var numbridLoikAddBtn = document.getElementById("numbridLoikAddBtn");
var mtuLoikAddBtn = document.getElementById("mtuLoikAddBtn");
var ikoonidLoikAddBtn = document.getElementById("ikoonidLoikAddBtn");
var vastuvottLoikAddBtn = document.getElementById("vastuvottLoikAddBtn");
var ankeetLoikAddBtn = document.getElementById("ankeetLoikAddBtn");
var sundmusedSissejuhatusLoikAddBtn = document.getElementById("sundmusedSissejuhatusLoikAddBtn");

// arrays of add buttons

var dirigendidLoikAddBtnArray = Array.from(document.querySelectorAll(".dirigendidLoikAddBtn"));
var ajaluguLoikAddBtnArray = Array.from(document.querySelectorAll(".ajaluguLoikAddBtn"));
var sundmusedLoikAddBtnArray = Array.from(document.querySelectorAll(".sundmusedLoikAddBtn"));
var sundmusedLoikKohtAddBtnArray = Array.from(document.querySelectorAll(".sundmusedLoikKohtAddBtn"));
var moodunudLoikAddBtnArray = Array.from(document.querySelectorAll(".moodunudLoikAddBtn"));
var moodunudLoikKohtAddBtnArray = Array.from(document.querySelectorAll(".moodunudLoikKohtAddBtn"));

// add subform buttons

var dirigendidAddBtn = document.getElementById("dirigendidAddBtn");
var ajaluguAddBtn = document.getElementById("ajaluguAddBtn");
var sundmusedAddBtn = document.getElementById("sundmusedAddBtn");

// get delete "loik" buttons as an array

var sissejuhatusLoikDeleteBtnArray = Array.from(document.querySelectorAll(".sissejuhatusLoikDeleteBtn"));
var liikmedLoikDeleteBtnArray = Array.from(document.querySelectorAll(".liikmedLoikDeleteBtn"));
var ajaluguSissejuhatusLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ajaluguSissejuhatusLoikDeleteBtn"));
var ajaluguSissekanneLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ajaluguSissekanneLoikDeleteBtn"));
var meediaLoikDeleteBtnArray = Array.from(document.querySelectorAll(".meediaLoikDeleteBtn"));
var meediaVideoLoikDeleteBtnArray = Array.from(document.querySelectorAll(".meediaVideoLoikDeleteBtn"));
var meediaLinkLoikDeleteBtnArray = Array.from(document.querySelectorAll(".meediaLinkLoikDeleteBtn"));
var toetajadLoikDeleteBtnArray = Array.from(document.querySelectorAll(".toetajadLoikDeleteBtn"));
var kontaktSissejuhatusLoikDeleteBtnArray = Array.from(document.querySelectorAll(".kontaktSissejuhatusLoikDeleteBtn"));
var uldineLoikDeleteBtnArray = Array.from(document.querySelectorAll(".uldineLoikDeleteBtn"));
var andmedLoikDeleteBtnArray = Array.from(document.querySelectorAll(".andmedLoikDeleteBtn"));
var numbridLoikDeleteBtnArray = Array.from(document.querySelectorAll(".numbridLoikDeleteBtn"));
var mtuLoikDeleteBtnArray = Array.from(document.querySelectorAll(".mtuLoikDeleteBtn"));
var ikoonidLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ikoonidLoikDeleteBtn"));
var vastuvottLoikDeleteBtnArray = Array.from(document.querySelectorAll(".vastuvottLoikDeleteBtn"));
var ankeetLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ankeetLoikDeleteBtn"));
var sundmusedSissejuhatusLoikDeleteBtnArray = Array.from(document.querySelectorAll(".sundmusedSissejuhatusLoikDeleteBtn"));
var andmebaasLoikDeleteBtnArray = Array.from(document.querySelectorAll(".andmebaasLoikDeleteBtn"));

// get delete "loik" button arrays as an array (on dynamic subforms)

var dirigendidLoikDeleteBtnArrays = [];

for (var i = 0; i < dirigendidSubformArray.length; i++) {
  var indexNumber = i + 1;
  var dirigendidLoikDeleteBtnArray = Array.from(document.querySelectorAll(".dirigendid" + indexNumber + "LoikDeleteBtn"));
  dirigendidLoikDeleteBtnArrays.push(dirigendidLoikDeleteBtnArray);
}

var ajaluguLoikDeleteBtnArrays = [];

for (var i = 0; i < ajaluguSubformArray.length; i++) {
  var indexNumber = i + 1;
  var ajaluguLoikDeleteBtnArray = Array.from(document.querySelectorAll(".ajalugu" + indexNumber + "LoikDeleteBtn"));
  ajaluguLoikDeleteBtnArrays.push(ajaluguLoikDeleteBtnArray);
}

var sundmusedLoikDeleteBtnArrays = [];

for (var i = 0; i < sundmusedSubformArray.length; i++) {
  var indexNumber = i + 1;
  var sundmusedLoikDeleteBtnArray = Array.from(document.querySelectorAll(".sundmused" + indexNumber + "LoikDeleteBtn"));
  sundmusedLoikDeleteBtnArrays.push(sundmusedLoikDeleteBtnArray);
}

var sundmusedLoikKohtDeleteBtnArrays = [];

for (var i = 0; i < sundmusedSubformArray.length; i++) {
  var indexNumber = i + 1;
  var sundmusedLoikKohtDeleteBtnArray = Array.from(document.querySelectorAll(".sundmused" + indexNumber + "LoikKohtDeleteBtn"));
  sundmusedLoikKohtDeleteBtnArrays.push(sundmusedLoikKohtDeleteBtnArray);
}

var moodunudLoikDeleteBtnArrays = [];

for (var i = 0; i < moodunudSubformArray.length; i++) {
  var indexNumber = i + 1;
  var moodunudLoikDeleteBtnArray = Array.from(document.querySelectorAll(".moodunud" + indexNumber + "LoikDeleteBtn"));
  moodunudLoikDeleteBtnArrays.push(moodunudLoikDeleteBtnArray);
}

var moodunudLoikKohtDeleteBtnArrays = [];

for (var i = 0; i < moodunudSubformArray.length; i++) {
  var indexNumber = i + 1;
  var moodunudLoikKohtDeleteBtnArray = Array.from(document.querySelectorAll(".moodunud" + indexNumber + "LoikKohtDeleteBtn"));
  moodunudLoikKohtDeleteBtnArrays.push(moodunudLoikKohtDeleteBtnArray);
}

// get delete subform buttons as an array

var dirigendidDeleteBtnArray = Array.from(document.querySelectorAll(".dirigendidDeleteBtn"));
var ajaluguDeleteBtnArray = Array.from(document.querySelectorAll(".ajaluguDeleteBtn"));
var sundmusedDeleteBtnArray = Array.from(document.querySelectorAll(".sundmusedDeleteBtn"));
var moodunudDeleteBtnArray = Array.from(document.querySelectorAll(".moodunudDeleteBtn"));

// get all the "fake" inputs on a page as an array

var editableInputArray = document.querySelectorAll(".editable-input");
