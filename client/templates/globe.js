globe = {
  outputPlate: function(subject, resident, value, item) {

    if (item == "protein") {
      output = Session.get("displayMainProtein");
      var testOne = subject.restrictLcsMainProtein;
      var testTwo = subject.restrictNasMainProtein;
      var testThree = subject.restrictLowSodiumMainProtein;
      var testFour = subject.restrictRenalMainProtein;
    }
    if (item == "veg") {
      output = Session.get("displayVegOne");
      var testOne = subject.restrictLcsVegOne;
      var testTwo = subject.restrictNasVegOne;
      var testThree = subject.restrictLowSodiumVegOne;
      var testFour = subject.restrictRenalVeg;
    }
    if (item == "starch") {
      output = Session.get("displayStarchOne");
      var testOne = subject.restrictLcsStarchOne;
      var testTwo = subject.restrictNasStarchOne;
      var testThree = subject.restrictLowSodiumStarchOne;
      var testFour = subject.restrictRenalStarchOne;
    }
      outputReg = new RegExp(output, 'i');
      console.log(resident.dislikes);
      var testDislikes = (outputReg.test(resident.dislikes));

    if (testOne) {
      if (resident.lcs) {
        globe.altCheck(item);
      }
    }
    if (testTwo) {
      if (resident.nas) {
        globe.altCheck(item);
      }
    }
    if (testThree) {
      if (resident.lowSodium) {
        globe.altCheck(item);
      }
    }
    if (testFour) {
      if (resident.renal) {
        globe.altCheck(item);
      }
    }
    if (testDislikes) {
      globe.altCheck(item);
      console.log(output);
    }

    return output;
  },

  altCheck: function(item) {

    if (item == "protein") {

      output = Session.get("displayAltProtein");

    }
    if (item == "veg") {
      output = Session.get("displayVegTwo");
    }
    if (item == "starch") {
      output = Session.get("displayStarchTwo");
    }
    return output;
  },

  displayTerm: function(resident, term, glyph, action) {
    var status = '';
    var temp = '';
    if (term == "lcs") status = resident.lcs;
    if (term == "nas") status = resident.nas;
    if (term == "low sodium") status = resident.lowSodium;
    if (term == "renal") status = resident.renal;
    if (status == action) {
      temp = '<span>' + term + '</span> <span class="' + glyph + '"></span>';
    }
    return temp;
  },

  addTerm: function(resident, term, glyph) {
    var status = '';
    var temp = '';
    if (term == "lcs") status = resident.lcs;
    if (term == "nas") status = resident.nas;
    if (term == "low sodium") status = resident.lowSodium;
    if (term == "renal") status = resident.renal;
    if (status == false) {
      temp = '<span>' + term + '</span> <span class="' + glyph + '"></span>';
    }
    return temp;
  },

  // Make each item here, termsEdit, liquidEdit, etc, all part of the same array. Use for loop to iterate through each to reduce lines used.
  applyEdits: function(swapEdit) {
    termsEdit = document.getElementsByClassName("termsedit");
    liquidEdit = document.getElementsByClassName("liquidedit");
    hotBevEdit = document.getElementsByClassName("hotbevedit");
    coldBevEdit = document.getElementsByClassName("coldbevedit");
    glyphRemove = document.getElementsByClassName("glyphicon-remove");
    glyphAdd = document.getElementsByClassName("glyphicon-plus");
    residentCardSize = document.getElementsByClassName("resident-card");
    termsInitial = document.getElementsByClassName("restrictionsListInitial");
    termsSecondary = document.getElementsByClassName("restrictionsListSecondary");

    if (swapEdit > 0) {
      globe.toggleVis(termsInitial, "restrictionsListInitial hidden rest");
      globe.toggleVis(termsSecondary, "restrictionsListSecondary shown rest");
    }

    if (swapEdit % 2 == 0) {
      globe.toggleVis(residentCardSize, "resident-card small-box col-xs-12 col-md-6 col-md-offset-3");
      globe.toggleVis(hotBevEdit, "hotbevedit hidden");
      globe.toggleVis(coldBevEdit, "coldbevedit hidden");
      globe.toggleVis(termsEdit, "termsedit hidden rest");
      globe.toggleVis(glyphRemove, "red glyphicon glyphicon-remove hidden");
      globe.toggleVis(glyphAdd, "green glyphicon glyphicon-plus hidden");
      globe.toggleVis(liquidEdit, "liquidedit hidden");
    }
    if (swapEdit % 2 == 1) {
      globe.toggleVis(residentCardSize, "resident-card big-box col-xs-12 col-md-6 col-md-offset-3");
      globe.toggleVis(hotBevEdit, "hotbevedit shown selector");
      globe.toggleVis(coldBevEdit, "coldbevedit shown selector");
      globe.toggleVis(termsEdit, "termsedit shown rest");
      globe.toggleVis(glyphRemove, "red glyphicon glyphicon-remove shown");
      globe.toggleVis(glyphAdd, "green glyphicon glyphicon-plus shown");
      globe.toggleVis(liquidEdit, "liquidedit shown selector");
    }


  },

  applyMealEdits: function(swapEdit) {
    mainProteinEdit = document.getElementsByClassName("mainproteinedit");
    if (swapEdit % 2 == 0) {
      globe.toggleVis(mainProteinEdit, "mainproteinedit hidden");
    }

    if (swapEdit % 2 == 1) {
      globe.toggleVis(mainProteinEdit, "mainproteinedit shown");
    }
  },

  toggleVis: function(target, classMod) {
    for (var i=0; i<target.length; i++) {
      target[i].className = classMod;
    }
  },
}
