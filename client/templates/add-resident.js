  if(Meteor.isClient){
    var residentCount = 0;
    var cardSubmitText = "";
    Template.addResident.helpers({
      cardSubmitResults : function() {
        return cardSubmitText;
      },
      displayMealTexture: function() {
        if (Session.get("selectedTexture")) {
          return Session.get("selectedTexture");
        }
        else {
          return "Select a Texture!";
        }
      },
      displayLiquidThickness: function() {
        if (Session.get("selectedThickness")) {
          return Session.get("selectedThickness");
        }
        else {
          return "Select a Thickness!";
        }
      },
      displayHotBev: function() {
        if (Session.get("selectedHotBev")) {
          return Session.get("selectedHotBev");
        }
        else {
          return "Select a Hot Beverage!";
        }
      },
      displayColdBev: function() {
        if (Session.get("selectedColdBev")) {
          return Session.get("selectedColdBev");
        }
        else {
          return "Select a Cold  Beverage!";
        }
      },
    });

    Template.addResident.events({
      'click #regularTexture' : function () {
        Session.set('selectedTexture', 'Regular ');
      },
      'click #groundTexture' : function () {
        Session.set('selectedTexture', 'Ground ');
      },
      'click #pureeTexture' : function () {
        Session.set('selectedTexture', 'Puree ');
      },
      'click #thinThickness' : function () {
        Session.set('selectedThickness', 'Thin ');
      },
      'click #nectarThickness' : function () {
        Session.set('selectedThickness', 'Nectar ');
      },
      'click #honeyThickness' : function () {
        Session.set('selectedThickness', 'Honey ');
      },
      'click #coffeeHotBev' : function () {
        Session.set('selectedHotBev', 'Coffee');
      },
      'click #teaHotBev' : function () {
        Session.set('selectedHotBev', 'Tea');
      },
      'click #hotCocoaHotBev' : function () {
        Session.set('selectedHotBev', 'Hot Cocoa');
      },
      'click #noHotBev' : function () {
        Session.set('selectedHotBev', 'none');
      },
      'click #orangeJuiceColdBev' : function () {
        Session.set('selectedColdBev', 'Orange Juice');
      },
      'click #appleJuiceColdBev' : function () {
        Session.set('selectedColdBev', 'Apple Juice');
      },
      'click #cranberryJuiceColdBev' : function () {
        Session.set('selectedColdBev', 'Cranberry Juice');
      },
      'click #gingerAleColdBev' : function () {
        Session.set('selectedColdBev', 'Ginger Ale');
      },
      'click #colaColdBev' : function () {
        Session.set('selectedColdBev', 'Cola');
      },
      'click #noColdBev' : function () {
        Session.set('selectedColdBev', 'none');
      },
      'submit #addForm' : function () {
        event.preventDefault();
        console.log(event.target.inputName.value);
        console.log(event.target.inputRmNum.value);
        console.log(Session.get('selectedTexture'));
        console.log(Session.get('selectedThickness'));
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
          dislikes: event.target.inputDislikes.value,
          texture: Session.get('selectedTexture'),
          consistency : Session.get('selectedThickness'),
          lcs: event.target.lcs.checked,
          nas: event.target.nas.checked,
          lowSodium: event.target.lowSodium.checked,
          renal: event.target.renal.checked,
          hotBev: Session.get("selectedHotBev"),
          coldBev: Session.get("selectedColdBev"),
          terms: []
        };

        if (resident.dislikes) {
          var dislikesArray = resident.dislikes.split(" ");
          console.log(dislikesArray);
        }

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
      Session.set('selectedHotBev', "Select a Hot Beverage!");
      Session.set('selectedColdBev', "Select a Cold Beverage!");

        document.getElementById("addForm").reset();
      }
    }
  });
}
