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
      'click .thickness': function() {
        console.log(event.target.innerHTML);
        Session.set('selectedThickness', event.target.innerHTML);
      },
      'click .texture': function() {
        Session.set('selectedTexture', event.target.innerHTML);
      },
      'click .hot': function() {
        Session.set('selectedHotBev', event.target.innerHTML);
      },
      'click .cold': function() {
        Session.set('selectedColdBev', event.target.innerHTML);
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
        var resident = {
          name : event.target.inputName.value,
          rmNum: event.target.inputRmNum.value,
          dislikes: event.target.inputDislikes.value,
          texture: event.target.texture.value,
          consistency : event.target.thickness.value,
          lcs: event.target.lcs.checked,
          nas: event.target.nas.checked,
          lowSodium: event.target.lowSodium.checked,
          renal: event.target.renal.checked,
          hotBev: event.target.hot.value,
          coldBev: event.target.cold.value,
          terms: []
        };
        console.log(event.target.cold);

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
