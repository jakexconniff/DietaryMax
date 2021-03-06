var swapEdit = 0;

Template.mealList.helpers({
	meal: function() {
		Meteor.subscribe("Meals.public");
		var searchParam = Session.get("search");
    var searchQuery = new RegExp(searchParam, "i");
		if (MealList.find({mealDay: searchQuery})) {
			return MealList.find({mealDay: searchQuery}, { sort: { 'mealDay' : 1 }});
		}
		else {
			console.log("YOLO");
		}

	},

	restrictionsMainProtein: function() {
		let restrictionsList = [];
		if (this.restrictLcsMainProtein == true) restrictionsList.push("LCS");
		if (this.restrictNasMainProtein == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumMainProtein == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalMainProtein == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	restrictionsAltProtein: function() {
		let restrictionsList = [];
		if (this.restrictLcsAltProtein == true) restrictionsList.push("LCS");
		if (this.restrictNasAltProtein == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumAltProtein == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalAltProtein == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	restrictionsVegOne: function() {
		let restrictionsList = [];
		if (this.restrictLcsVegOne == true) restrictionsList.push("LCS");
		if (this.restrictNasVegOne == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumVegOne == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalVegOne == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	restrictionsVegTwo: function() {
		let restrictionsList = [];
		if (this.restrictLcsVegTwo == true) restrictionsList.push("LCS");
		if (this.restrictNasVegTwo == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumVegTwo == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalVegTwo == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	restrictionsStarchOne: function() {
		let restrictionsList = [];
		if (this.restrictLcsStarchOne == true) restrictionsList.push("LCS");
		if (this.restrictNasStarchOne == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumStarchOne == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalStarchOne == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	restrictionsStarchTwo: function() {
		let restrictionsList = [];
		if (this.restrictLcsStarchTwo == true) restrictionsList.push("LCS");
		if (this.restrictNasStarchTwo == true) restrictionsList.push("NAS");
		if (this.restrictLowSodiumStarchTwo == true) restrictionsList.push("Low Sodium");
		if (this.restrictRenalStarchTwo == true) restrictionsList.push("Renal");
		return restrictionsList.join(", ");
	},
	addedOn: function() {
		return moment(this.addedOn).format("ddd, MMMM Do YYYY (h:mma)");
	}
});

Template.mealList.events({
	'click #toggleEditMealsSpan': function() {
		swapEdit++;
		globe.applyMealEdits(swapEdit);
	}
})
