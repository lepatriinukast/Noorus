// D A T A  C R E A T I O N  F U N C T I O N S




// function that creates the output string from boolean values

function convertCheckedValue(boolean) {

  // check if the provided boolean is true

  if (boolean === true) {

    // if yes, return a "*"

    return "*";

    // if not, return an empty string

  } else {

    return "";
  }
}




//Functions that create data for ajax post calls handled by body-parser


function createAvalehtTekstidData(event) {
  if (avalehtTekstid !== null) {
    var avalehtTekstidData = {
      suurPealkiri: {
        est: (document.getElementById("suurPealkiriEst").value),
        en: (document.getElementById("suurPealkiriEn").value)
      },
      jatkuPealkiri: {
        est: (document.getElementById("jatkuPealkiriEst").value),
        en: (document.getElementById("jatkuPealkiriEn").value)
      },
      sektsiooniPealkiri1: {
        est: (document.getElementById("sektsiooniPealkiriEst1").value),
        en: (document.getElementById("sektsiooniPealkiriEn1").value)
      },
      sektsiooniTekst1: {
        est: (document.getElementById("sektsiooniTekstEst1").value),
        en: (document.getElementById("sektsiooniTekstEn1").value)
      },
      sektsiooniPealkiri2: {
        est: (document.getElementById("sektsiooniPealkiriEst2").value),
        en: (document.getElementById("sektsiooniPealkiriEn2").value)
      },
      sektsiooniTekst2: {
        est: (document.getElementById("sektsiooniTekstEst2").value),
        en: (document.getElementById("sektsiooniTekstEn2").value)
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
        est: (document.getElementById("pealkiriEst" + indexNumber).value),
        en: (document.getElementById("pealkiriEn" + indexNumber).value),
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
        est: (document.getElementById("lauljadPealkiriEst").value),
        en: (document.getElementById("lauljadPealkiriEn").value)
      },
      sopranid: (document.getElementById("sopranid").value),
      aldid: (document.getElementById("aldid").value),
      tenorid: (document.getElementById("tenorid").value),
      bassid: (document.getElementById("bassid").value),
      vilistlastePealkiri: {
        est: (document.getElementById("vilistlastePealkiriEst").value),
        en: (document.getElementById("vilistlastePealkiriEn").value)
      },
      vilistlasteNimekiri: {
        est: (document.getElementById("vilistlasteNimekiriEst").value),
        en: (document.getElementById("vilistlasteNimekiriEn").value)
      },
      loigud: []
    };

    for (var i = 1; i < 5; i++) {
      var haaleruhmaNimi = {
        est: (document.getElementById("haaleruhmaNimiEst" + i).value),
        en: (document.getElementById("haaleruhmaNimiEn" + i).value)
      };
      var haaleruhmaTutvustus = {
        est: (document.getElementById("haaleruhmaTutvustusEst" + i).value),
        en: (document.getElementById("haaleruhmaTutvustusEn" + i).value)
      };
      liikmedData.haaleruhmaNimed.push(haaleruhmaNimi);
      liikmedData.haaleruhmaTutvustused.push(haaleruhmaTutvustus);
    }

    for (var a = 0; a < document.querySelectorAll(".liikmedLoik").length; a++) {
      var loik = {
        est: (document.querySelectorAll(".liikmedLoikEst")[a].value),
        en: (document.querySelectorAll(".liikmedLoikEn")[a].value),
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
          est: (document.getElementById("ajaluguSissejuhatusPealkiriEst").value),
          en: (document.getElementById("ajaluguSissejuhatusPealkiriEn").value)
        },
        loigud: []
      },
      ajajoon: {
        pealkiri: {
          est: (document.getElementById("ajaluguSissekannePealkiriEst").value),
          en: (document.getElementById("ajaluguSissekannePealkiriEn").value)
        },
        sissekanded: []
      },
      sektsioonid: []
    };

    for (var i = 0; i < document.querySelectorAll(".ajaluguSissekanneLoik").length; i++) {
      var sissekanne = {
        year: (document.querySelectorAll(".ajaluguSissekanneLoikYear")[i].value),
        est: (document.querySelectorAll(".ajaluguSissekanneLoikEst")[i].value),
        en: (document.querySelectorAll(".ajaluguSissekanneLoikEn")[i].value)
      };
      ajaluguData.ajajoon.sissekanded.push(sissekanne);
    }

    for (var a = 0; a < document.querySelectorAll(".ajaluguSissejuhatusLoik").length; a++) {
      var sissejuhatavLoik = {
        est: (document.querySelectorAll(".ajaluguSissejuhatusLoikEst")[a].value),
        en: (document.querySelectorAll(".ajaluguSissejuhatusLoikEn")[a].value)
      };
      ajaluguData.sissejuhatus.loigud.push(sissejuhatavLoik);
    }

    for (var b = 0; b < document.querySelectorAll(".ajaluguSubform").length; b++) {
      var sektsioon = {
        pealkiri: {
          est: (document.querySelectorAll(".ajaluguPealkiriEst")[b].value),
          en: (document.querySelectorAll(".ajaluguPealkiriEn")[b].value)
        },
        loigud: []
      };

      var indexNumber = b + 1;

      for (var c = 0; c < document.querySelectorAll(".ajalugu" + indexNumber + "Loik").length; c++) {

        var loik = {
          est: (document.querySelectorAll(".ajalugu" + indexNumber + "LoikEst")[c].value),
          en: document.querySelectorAll(".ajalugu" + indexNumber + "LoikEn")[c].value
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
          est: (document.getElementById("meediaPealkiriEst").value),
          en: (document.getElementById("meediaPealkiriEn").value)
        },
        loigud: []
      },
      videod: {
        pealkiri: {
          est: (document.getElementById("meediaVideoPealkiriEst").value),
          en: (document.getElementById("meediaVideoPealkiriEn").value)
        },
        manustamislingid: []
      },
      muudLingid: {
        pealkiri: {
          est: (document.getElementById("meediaLinkPealkiriEst").value),
          en: (document.getElementById("meediaLinkPealkiriEn").value)
        },
        lingid: []
      },
    };

    for (var i = 0; i < document.querySelectorAll(".meediaLoik").length; i++) {
      var loik = {
        est: (document.querySelectorAll(".meediaLoikEst")[i].value),
        en: (document.querySelectorAll(".meediaLoikEn")[i].value),
      };
      meediaData.sissejuhatus.loigud.push(loik);
    }
    for (var a = 0; a < document.querySelectorAll(".meediaVideoLoik").length; a++) {
      var manustamislink = (document.querySelectorAll(".meediaVideoLoikLink")[a].value);
      meediaData.videod.manustamislingid.push(manustamislink);
    }
    for (var b = 0; b < document.querySelectorAll(".meediaLinkLoik").length; b++) {
      var link = {
        est: (document.querySelectorAll(".meediaLinkLoikEst")[b].value),
        en: (document.querySelectorAll(".meediaLinkLoikEn")[b].value),
        link: (document.querySelectorAll(".meediaLinkLoikLink")[b].value),
      };
      meediaData.muudLingid.lingid.push(link);
    }
    return meediaData;
  }
}

function createKontaktData() {

  var kontaktData = {
    sissejuhatus: {
      loigud: []
    },
    uldine: {
      pealkiri: {
        est: (document.getElementById("uldinePealkiriEst").value),
        en: (document.getElementById("uldinePealkiriEn").value),
      },
      loigud: []
    },
    andmed: {
      pealkiri: {
        est: (document.getElementById("andmedPealkiriEst").value),
        en: (document.getElementById("andmedPealkiriEn").value),
      },
      paarid: []
    },
    numbrid: {
      pealkiri: {
        est: (document.getElementById("numbridPealkiriEst").value),
        en: (document.getElementById("numbridPealkiriEn").value),
      },
      numbrid: []
    },
    mtu: {
      pealkiri: {
        est: (document.getElementById("mtuPealkiriEst").value),
        en: (document.getElementById("mtuPealkiriEn").value),
      },
      paarid: []
    },
  };
  for (var i = 0; i < document.querySelectorAll(".kontaktSissejuhatusLoik").length; i++) {
    var loik = {
      est: (document.querySelectorAll(".kontaktSissejuhatusLoikEst")[i].value),
      en: (document.querySelectorAll(".kontaktSissejuhatusLoikEn")[i].value)
    };
    kontaktData.sissejuhatus.loigud.push(loik);
  }
  for (var d = 0; d < document.querySelectorAll(".uldineLoik").length; d++) {
    var loikUldine = {
      est: (document.querySelectorAll(".uldineLoikEst")[d].value),
      en: (document.querySelectorAll(".uldineLoikEn")[d].value)
    };
    kontaktData.uldine.loigud.push(loikUldine);
  }
  for (var a = 0; a < document.querySelectorAll(".andmedLoik").length; a++) {
    var teaveAndmed = {
      estKey: (document.querySelectorAll(".andmedLoikEstKey")[a].value),
      enKey: (document.querySelectorAll(".andmedLoikEnKey")[a].value),
      est: (document.querySelectorAll(".andmedLoikEst")[a].value),
      en: (document.querySelectorAll(".andmedLoikEn")[a].value)
    };
    kontaktData.andmed.paarid.push(teaveAndmed);
  }
  for (var b = 0; b < document.querySelectorAll(".numbridLoik").length; b++) {
    var number = {
      estKey: (document.querySelectorAll(".numbridLoikEstKey")[b].value),
      enKey: (document.querySelectorAll(".numbridLoikEnKey")[b].value),
      number: (document.querySelectorAll(".numbridLoikNumber")[b].value)
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
  return kontaktData;
}


function createVastuvottData() {

  var vastuvottData = {
    tekstid: {
      pealkiri: {
        est: (document.getElementById("vastuvottPealkiriEst").value),
        en: (document.getElementById("vastuvottPealkiriEn").value)
      },
      loigud: []
    },
    ankeet: {
      pealkiri: {
        est: (document.getElementById("ankeetPealkiriEst").value),
        en: (document.getElementById("ankeetPealkiriEn").value)
      },
      valjad: []
    }
  };
  for (var i = 0; i < document.querySelectorAll(".vastuvottLoik").length; i++) {
    var loik = {
      est: (document.querySelectorAll(".vastuvottLoikEst")[i].value),
      en: (document.querySelectorAll(".vastuvottLoikEn")[i].value)
    };
    vastuvottData.tekstid.loigud.push(loik);
  }
  for (var a = 0; a < document.querySelectorAll(".ankeetLoik").length; a++) {
    var vali = {
      est: (document.querySelectorAll(".ankeetLoikEst")[a].value),
      en: (document.querySelectorAll(".ankeetLoikEn")[a].value),
      checked: convertCheckedValue(document.querySelectorAll(".ankeetLoikCheckbox")[a].checked),
      textArea: convertCheckedValue(document.querySelectorAll(".ankeetLoikTextArea")[a].checked)
    };
    vastuvottData.ankeet.valjad.push(vali);
  }
  return vastuvottData;
}


function createTelliData() {

  var telliData = {
      loigud: [],
    ankeet: {
      pealkiri: {
        est: (document.getElementById("kontaktandmedPealkiriEst").value),
        en: (document.getElementById("kontaktandmedPealkiriEn").value)
      },
      jarelloik: {
        est: (document.getElementById("kontaktandmedJarelloikEst").value),
        en: (document.getElementById("kontaktandmedJarelloikEn").value)
      },
      valjad: []
    }
  };
  for (var i = 0; i < document.querySelectorAll(".telliLoik").length; i++) {
    var loik = {
      est: (document.querySelectorAll(".telliLoikEst")[i].value),
      en: (document.querySelectorAll(".telliLoikEn")[i].value)
    };
    telliData.loigud.push(loik);
  }
  for (var a = 0; a < document.querySelectorAll(".kontaktandmedLoik").length; a++) {
    var vali = {
      est: (document.querySelectorAll(".kontaktandmedLoikEst")[a].value),
      en: (document.querySelectorAll(".kontaktandmedLoikEn")[a].value),
      checked: convertCheckedValue(document.querySelectorAll(".kontaktandmedLoikCheckbox")[a].checked),
      textArea: convertCheckedValue(document.querySelectorAll(".kontaktandmedLoikTextArea")[a].checked)
    };
    telliData.ankeet.valjad.push(vali);
  }

  return telliData;
}

// function that creates the data for logging into the admin page

function createLoginData() {

  var credentials = {
    user: document.getElementById("user").value,
    password: document.getElementById("password").value
  };

return credentials;

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


// function for creating the data necessary to delete an "ajalugu" subform, which will be sent to the server

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


// function for creating the data necessary to delete a "pood" subform, which will be sent to the server

function createDeletePoodData(target) {

  // obtain the id number of the deleted subform using the target id

  var idNumber = target.id.slice(4, -7);


  // construct a js object that includes information about the deleted element, which will be sent to the server

  var deleteData = {
    formName: "poodSubform",
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
    formName: "moodunudSubform",
    idNumber: idNumber
  };

  // return the constructed object

  return deleteData;
}
