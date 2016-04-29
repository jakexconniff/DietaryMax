Template.cardDashboard.helpers({
	card: function() {
		return CardsList.find().fetch();
	},
	meal: function() {
		return MealList.find().fetch();
	},
	resident: function() {
		return ResidentList.find().fetch();
	},
	outputDay: function() {
		return Session.get('displayDay');
	},
	outputTime: function() {
		return Session.get('displayTime');
	},
	outputHotBev: function() {
		return this.hotBev;
	},
	outputColdBev: function() {
		return this.coldBev;
	},
	outputProtein: function() {
		let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
		console.log(Session.get('displayAltProtein'), Session.get('displayMainProtein'));
		console.log(selectedMeal);
		// dislike check here.
      //if (this.dislikes.indexOf(displayMainProtein)) return Session.get('displayAltProtein');
      	if (selectedMeal) {
			if (selectedMeal.restrictLcsMainProtein == true) {
				console.log(Session.get('displayAltProtein'));
				if (this.lcs == true) return Session.get('displayAltProtein');
				else return Session.get('displayMainProtein');
			}
			else return Session.get('displayMainProtein');
		}
	},
	outputVeg: function() {
		let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
		console.log(this);
	},

	terms: function() {
      if (this.lcs == true) {
        this.terms.push("lcs");
      }
      if (this.nas == true) {
        this.terms.push("nas");
      }
      if (this.lowSodium == true) {
        this.terms.push("low sodium");
      }
      if (this.renal == true) {
        this.terms.push("renal");
      }
      console.log(this.terms);
      return this.terms.join(", ");
	}
});

Template.cardDashboard.events({
	'click .dropdownValue' : function() {
		//console.log(MealList.findOne({'id':"meal1"}).mainProtein);
		//console.log(ResidentList.findOne({'id': "resident1"}));
		//console.log(event.target.text);
		//console.log($('.dropdownValue')[0].innerHTML);
		// Rips from the dropdown
		//selectedTime = $('.dropdownValue').find(":selected").text();

		selectedTime = event.target.text;
		selectedTimeArray = selectedTime.split(' ');
		Session.set('targetDay', selectedTimeArray[0]);
		Session.set('targetTime', selectedTimeArray[1]);
		// End rip, start applying to database.
		let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
		console.log(this.outputHotBev);
		outputTime = selectedMeal.mealTime;
		outputDay = selectedMeal.mealDay;
		outputMainProtein = selectedMeal.mainProtein;
		outputAltProtein = selectedMeal.altProtein;
		outputVegOne = selectedMeal.vegOne;
		outputVegTwo = selectedMeal.vegTwo;
		outputVegThree = selectedMeal.vegThree;

		Session.set('displayTime',outputTime);
		Session.set('displayDay',outputDay);
		Session.set('displayMainProtein', outputMainProtein);
		Session.set('displayAltProtein', outputAltProtein);
		Session.set('displayVegOne'), outputVegOne;
		Session.set('displayVegTwo'), outputVegTwo;
		Session.set('displayVegThree'), outputVegThree;
		

	}
});