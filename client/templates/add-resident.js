  if(Meteor.isClient){
    var residentCount = 0;
    var cardSubmitText = "";
    Template.addResident.helpers({
      cardSubmitResults : function() {
        return cardSubmitText;
      }
    });

    Template.addResident.events({
      'click #regularRadio' : function () {
        Session.set('selectedTexture', 'Regular ');
      },
      'click #groundRadio' : function () {
        Session.set('selectedTexture', 'Ground ');
      },
      'click #pureeRadio' : function () {
        Session.set('selectedTexture', 'Puree ');
      },
      'click #thinRadio' : function () {
        Session.set('selectedThickness', 'Thin ');
      },
      'click #nectarRadio' : function () {
        Session.set('selectedThickness', 'Nectar ');
      },
      'click #honeyRadio' : function () {
        Session.set('selectedThickness', 'Honey ');
      },
      'click #coffeeRadio' : function () {
        Session.set('selectedHotBev', 'Coffee');
      },
      'click #teaRadio' : function () {
        Session.set('selectedHotBev', 'Tea');
      },
      'click #hotCocoaRadio' : function () {
        Session.set('selectedHotBev', 'Hot Cocoa');
      },
      'click #noHotBevRadio' : function () {
        Session.set('selectedHotBev', '');
      },
      'click #orangeJuiceRadio' : function () {
        Session.set('selectedColdBev', 'Orange Juice');
      },
      'click #appleJuiceRadio' : function () {
        Session.set('selectedColdBev', 'Apple Juice');
      },
      'click #cranberryJuiceRadio' : function () {
        Session.set('selectedColdBev', 'Cranberry Juice');
      },
      'click #gingerAleRadio' : function () {
        Session.set('selectedColdBev', 'Ginger Ale');
      },
      'click #colaRadio' : function () {
        Session.set('selectedColdBev', 'Cola');
      },
      'click #noColdBevRadio' : function () {
        Session.set('selectedColdBev', '');
      },
      'submit #addForm' : function () {
        event.preventDefault();
        if (event.target.inputName.value == "" || event.target.inputRmNum.value == "" || Session.get('selectedTexture') == ""
          || Session.get('selectedThickness') == "") {
          cardSubmitText = "You have left a field blank! All fields but restrictions are required.";
        document.getElementById("cardSubmitResults").innerHTML = cardSubmitText;
      }
      else
      {
        cardSubmitText = "You have successfully added a Resident!";
        document.getElementById("cardSubmitResults").innerHTML = cardSubmitText;
        residentCount += 1;
        console.log(event.target.lcs);
        var resident = {
          name : event.target.inputName.value,
          rmNum: event.target.inputRmNum.value,
          texture: Session.get('selectedTexture'),
          consistency : Session.get('selectedThickness'),
          lcs: event.target.lcs.checked,
          nas: event.target.nas.checked,
          lowSodium: event.target.lowSodium.checked,
          renal: event.target.renal.checked,
          hotBev: Session.get("selectedHotBev"),
          coldBev: Session.get("selectedColdBev"),
          protein: ' ',
          veg: ' ',
          starch: ' ',
          terms: []
        };

        if (resident.lcs == true) {
            resident.terms.push("lcs");
          }
          if (resident.nas == true) {
            resident.terms.push("nas");
          }
          if (resident.lowSodium == true) {
            resident.terms.push("low sodium");
          }
          if (resident.renal == true) {
            resident.terms.push("renal");
          }
      Meteor.call('createResident', resident);
      //ResidentList.insert(resident);
      resident.terms = [];
      Session.set('selectedTexture','');
      Session.set('selectedThickness','');
      Session.set('selectedLcs', false);
      Session.set('selectedNas', false);
      Session.set('selectedLowSodium', false);
      Session.set('selectedRenal', false);
        /*document.getElementById("inputName") = "";
        document.getElementById("inputRmNum") = "";
        document.getElementById("lcs").checked = false;
        document.getElementById("nas").checked = false;
        document.getElementById("lowSodium").checked = false;
        document.getElementById("renal").checked = false;
        document.getElementById("regularRadio").checked = false;
        document.getElementById("groundRadio").checked = false;
        document.getElementById("pureeRadio").checked = false;*/

        document.getElementById("addForm").reset();
      }
    }
  });
}
