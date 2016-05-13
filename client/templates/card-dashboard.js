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
			let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			var protein = Session.get("displayMainProtein");
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
				return protein;
			}
		},
		outputVeg: function() {
			let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			var veg = Session.get("displayVegOne");
			if (selectedMeal) {
				if (selectedMeal.restrictLcsVegOne) {
					if (this.lcs) {
						var veg = Session.get("displayVegTwo");
					}
				}
				if (selectedMeal.restrictNasVegOne) {
					if (this.nas) {
						var veg = Session.get("displayVegTwo");
					}
				}
				if (selectedMeal.restrictLowSodiumVegOne) {
					if (this.lowSodium) {
						var veg = Session.get("displayVegTwo");
					}
				}
				if (selectedMeal.restrictRenalVegOne) {
					if (this.renal) {
						var veg = Session.get("displayVegTwo");
					}
				}
			}
			return veg;
		},

		displayMealSelect: function() {
			select = Session.get("selectedTime");
			console.log(select);
			if (select == "") {
				return "Meal Select";
			}
			else {
				return select;
			}
		},

		outputStarch: function() {
			let selectedMeal = MealList.findOne({'mealTime': Session.get("targetTime"), 'mealDay': Session.get("targetDay")});
			var starch = Session.get("displayStarchOne");
			if (selectedMeal) {
				if (selectedMeal.restrictLcsVegOne) {
					if (this.lcs) {
						var starch = Session.get("displayStarchTwo");
					}
				}
				if (selectedMeal.restrictNasVegOne) {
					if (this.nas) {
						var starch = Session.get("displayStarchTwo");
					}
				}
				if (selectedMeal.restrictLowSodiumVegOne) {
					if (this.lowSodium) {
						var starch = Session.get("displayStarchTwo");
					}
				}
				if (selectedMeal.restrictRenalVegOne) {
					if (this.renal) {
						var starch = Session.get("displayStarchTwo");
					}
				}
			}
			return starch;
		},
		itemCheck: function(item, term, restriction, selectedMeal){

		},

		isRenal: function(){

		},

		terms: function() {
			console.log(this.terms);
			return this.terms.join(", ");
		}
	});

	Template.cardDashboard.events({
		'click #printCards': function() {
			window.print();
		},

		'click .dropdownValue': function() {
			//console.log(MealList.findOne({'id':"meal1"}).mainProtein);
			//console.log(ResidentList.findOne({'id': "resident1"}));
			//console.log(event.target.text);
			//console.log($('.dropdownValue')[0].innerHTML);
			// Rips from the dropdown
			//selectedTime = $('.dropdownValue').find(":selected").text();

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
