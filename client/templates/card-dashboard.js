

// Infinite Scroll
lastScrollTop = 0;
$(window).scroll(function(event) {
if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
var scrollTop = $(this).scrollTop();
if (scrollTop > lastScrollTop) {
	console.log("Wheeeee");
Session.set("residentLimit", Session.get("residentLimit") + 8);
}
lastScrollTop = scrollTop;
}});


Template.cardDashboard.onCreated(function() {
	Session.set("residentLimit", 8);
	const meals = Meteor.subscribe('Meals.public');
	
});

Template.cardDashboard.helpers({
	card: function() {
		return CardsList.find().fetch();
	},
	meal: function() {
		return MealList.find().fetch();
	},
	resident: function() {
		Meteor.subscribe('Residents.all', Session.get("residentLimit"));
		return ResidentList.find({}, {limit: Session.get("residentLimit")});
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
				//if (this.lcs == true) return Session.get('displayAltProtein');
				if (this.lcs == true) {
					var protein = Session.get("displayAltProtein");
				}	
			}
			if (selectedMeal.restrictNasMainProtein == true) {
				if (this.nas == true) {
					var protein = Session.get("displayAltProtein");
				}
			}
			if (selectedMeal.restrictLowSodiumMainProtein == true) {
				if (this.lowSodium == true) {
					var protein = Session.get("displayAltProtein");
				}
			}
			if (selectedMeal.restrictRenalMainProtein == true) {
				if (this.renal == true) {
					var protein = Session.get("displayAltProtein");
				}
			}
			if (protein !== Session.get("displayAltProtein")) {
				var protein = Session.get("displayMainProtein");
			};
				console.log(protein);
				return protein;
		}
	},
	outputVeg: function() {
		let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
		console.log(this);
	},

	terms: function() {
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