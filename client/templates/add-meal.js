var submitText = "";
Template.addMeal.onCreated(function() {
	this.showAddMeal = new ReactiveVar(false);
});

Template.addMeal.helpers({
	showAddMeal: function() {
		return Template.instance().showAddMeal.get();
		console.log("works");
	},
	submitResult: function() {
		return submitText;
	}
});

Template.addMeal.events({
	'click #addExpand' : function(event, template) {
		template.showAddMeal.set(true);
	},
	'click #mealSubmit' : function(event, template) {
		template.showAddMeal.set(false);
	},
	'click #addMealTime': function() {
		console.log(document.getElementById("addMealTime"));
	},
	'click #breakfast' : function() {
		console.log(event.target.id);
		Session.set('mealTime', "Breakfast");
	},
	'click #lunch' : function() {
		Session.set('mealTime', "Lunch");
	},
	'click #dinner' : function() {
		Session.set('mealTime', "Dinner");
	},
	'click #sunday' : function() {
		Session.set('mealDay', "Sunday");
	},
	'click #monday' : function() {
		Session.set('mealDay', "Monday");
	},
	'click #tuesday' : function() {
		Session.set('mealDay', "Tuesday");
	},
	'click #wednesday' : function() {
		Session.set('mealDay', "Wednesday");
	},
	'click #thursday' : function() {
		Session.set('mealDay', "Thursday");
	},
	'click #friday' : function() {
		Session.set('mealDay', "Friday");
	},
	'click #saturday' : function() {
		Session.set('mealDay', "Saturday");
	},
	'click #sunday' : function() {
		Session.set('mealDay', "Sunday");
	},

	'submit #addMealForm' : function(template) {
		event.preventDefault();

		// Start of error checking on submit.
		if (MealList.findOne({mealDay: Session.get('mealDay'), mealTime: Session.get('mealTime')})) {
			submitText = ("You have entered a duplicate meal! ");
			document.getElementById("submitResults").innerHTML = submitText;
			if (event.target.restrictLcsMainProtein.checked)console.log(event.target.restrictLcsMainProtein.checked);
		}
		else if (Session.get('mealTime') == "" || Session.get('mealDay') == "" || event.target.mainProtein.value == ""
			|| event.target.altProtein.value == "" || event.target.vegOne.value == "" || event.target.vegTwo.value == ""
			|| event.target.starchOne.vaue == "" || event.target.starchTwo.value == "" ) {
			submitText = "You left a field blank!";
			document.getElementById("submitResults").innerHTML = submitText;
			console.log(MealList.find().count());
		}
		// Start of successful insert.
		else{
			submitText = "You have successfully inserted a meal!";
			document.getElementById("submitResults").innerHTML = submitText;
			var meal = {
				addedOn: new Date(),
				id: MealList.find().count(),
				mealTime: Session.get('mealTime'),
				mealDay: Session.get('mealDay'),
				mainProtein: event.target.mainProtein.value,
				altProtein: event.target.altProtein.value,
				vegOne: event.target.vegOne.value,
				vegTwo: event.target.vegTwo.value,
				//vegThree: event.target.vegThree.value,
				starchOne: event.target.starchOne.value,
				starchTwo: event.target.starchTwo.value,

				restrictLcsMainProtein: event.target.restrictLcsMainProtein.checked,
				restrictNasMainProtein: event.target.restrictNasMainProtein.checked,
				restrictLowSodiumMainProtein: event.target.restrictLowSodiumMainProtein.checked,
				restrictRenalMainProtein: event.target.restrictRenalMainProtein.checked,

				restrictLcsAltProtein: event.target.restrictLcsAltProtein.checked,
				restrictNasAltProtein: event.target.restrictNasAltProtein.checked,
				restrictLowSodiumAltProtein: event.target.restrictLowSodiumAltProtein.checked,
				restrictRenalAltProtein: event.target.restrictRenalAltProtein.checked,

				restrictLcsVegOne: event.target.restrictLcsVegOne.checked,
				restrictNasVegOne: event.target.restrictNasVegOne.checked,
				restrictLowSodiumVegOne: event.target.restrictLowSodiumVegOne.checked,
				restrictRenalVegOne: event.target.restrictRenalVegOne.checked,

				restrictLcsVegTwo: event.target.restrictLcsVegTwo.checked,
				restrictNasVegTwo: event.target.restrictNasVegTwo.checked,
				restrictLowSodiumVegTwo: event.target.restrictLowSodiumVegTwo.checked,
				restrictRenalVegTwo: event.target.restrictRenalVegTwo.checked,

				restrictLcsStarchOne: event.target.restrictLcsStarchOne.checked,
				restrictNasStarchOne: event.target.restrictNasStarchOne.checked,
				restrictLowSodiumStarchOne: event.target.restrictLowSodiumStarchOne.checked,
				restrictRenalStarchOne: event.target.restrictRenalStarchOne.checked,

				restrictLcsStarchTwo: event.target.restrictLcsStarchTwo.checked,
				restrictNasStarchTwo: event.target.restrictNasStarchTwo.checked,
				restrictLowSodiumStarchTwo: event.target.restrictLowSodiumStarchTwo.checked,
				restrictRenalStarchTwo: event.target.restrictRenalStarchTwo.checked
			};
		console.log(meal);
		Meteor.call('createMeal', meal);
		}
	}
});


//  if mainProtein.lcs == lcs and this.target.lcs == lcs, return {{altProtein}}

// {{#if mainProtein.canHave}} {{mainProtein}} {{/if}}, {{#else if altProtein.canHave}} {{altProtein}} {{/if}}
