// D A T A  C R E A T I O N  F U N C T I O N S




//Functions that create data for ajax post calls handled by body-parser


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
    sissejuhatus: {
      loigud: []
    },
    uldine: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("uldinePealkiriEst").value),
        en: encodeURIComponent(document.getElementById("uldinePealkiriEn").value),
      },
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
  };
  for (var i = 0; i < document.querySelectorAll(".kontaktSissejuhatusLoik").length; i++) {
    var loik = {
      est: encodeURIComponent(document.querySelectorAll(".kontaktSissejuhatusLoikEst")[i].value),
      en: encodeURIComponent(document.querySelectorAll(".kontaktSissejuhatusLoikEn")[i].value)
    };
    kontaktData.sissejuhatus.loigud.push(loik);
  }
  for (var d = 0; d < document.querySelectorAll(".uldineLoik").length; d++) {
    var loikUldine = {
      est: encodeURIComponent(document.querySelectorAll(".uldineLoikEst")[d].value),
      en: encodeURIComponent(document.querySelectorAll(".uldineLoikEn")[d].value)
    };
    kontaktData.uldine.loigud.push(loikUldine);
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
  console.log(kontaktData);
  return kontaktData;
}


function createVastuvottData() {

  var vastuvottData = {
    tekstid: {
      pealkiri: {
        est: encodeURIComponent(document.getElementById("vastuvottPealkiriEst").value),
        en: encodeURIComponent(document.getElementById("vastuvottPealkiriEn").value)
      },
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
