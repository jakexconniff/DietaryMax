Session.set("searchBy", "letter");
Session.set("selectedTime", "");
var ticker = 0;
// Infinite Scroll
lastScrollTop = 0;
$(window).scroll(function(event) {
	if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
		var scrollTop = $(this).scrollTop();
		if (scrollTop > lastScrollTop) {
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
			var searchParam = Session.get("search");
			var searchQuery = new RegExp(searchParam, "i");
			if (Session.get("searchBy") == "letter") {
				return ResidentList.find({name: searchQuery}, { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});
			}
			if (Session.get("searchBy") == "numeric") {
				return ResidentList.find({rmNum: searchQuery}, { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});
			}

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
			var selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			if (selectedMeal) {
				protein = globe.outputPlate(selectedMeal, this,  "lcs", "protein");
				return protein;
			}
		},
		outputVeg: function() {
			var selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			if (selectedMeal) {
				veg = globe.outputPlate(selectedMeal, this,  "lcs", "veg");
				return veg;
			}
		},

		outputStarch: function() {
			var selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			if (selectedMeal) {
				starch = globe.outputPlate(selectedMeal, this,  "lcs", "starch");
				return starch;
			}
		},

		displayMealSelect: function() {
			select = Session.get("selectedTime");
			if (select == "") {
				return "Meal Select";
			}
			else {
				return select;
			}
		},

		terms: function() {
			var termsOut = "";
			if (this.lcs == true) termsOut += "lcs ";
			if (this.nas == true) termsOut += "nas ";
			if (this.lowSodium == true) termsOut += "low sodium ";
			if (this.renal == true) termsOut += "renal ";
			return termsOut;
		}
	});

	Template.cardDashboard.events({
		'click #printCards': function() {
			window.print();
		},

		'click .dropdownValue': function() {
			selectedTime = event.target.text;
			selectedTimeArray = selectedTime.split(' ');
			Session.set('selectedTime', selectedTime);
			Session.set('targetDay', selectedTimeArray[0]);
			Session.set('targetTime', selectedTimeArray[1]);
			// End rip, start applying to database.
			let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			outputTime = selectedMeal.mealTime;
			outputDay = selectedMeal.mealDay;
			outputMainProtein = selectedMeal.mainProtein;
			outputAltProtein = selectedMeal.altProtein;
			outputVegOne = selectedMeal.vegOne;
			outputVegTwo = selectedMeal.vegTwo;
			outputStarchOne = selectedMeal.starchOne;
			outputStarchTwo = selectedMeal.starchTwo;

			Session.set('displayTime',outputTime);
			Session.set('displayDay',outputDay);
			Session.set('displayMainProtein', outputMainProtein);
			Session.set('displayAltProtein', outputAltProtein);
			Session.set('displayVegOne', outputVegOne);
			Session.set('displayVegTwo', outputVegTwo);
			Session.set('displayStarchOne', outputStarchOne);
			Session.set('displayStarchTwo', outputStarchTwo);

			console.log(Session.get('displayVegOne'));
		}
	});
