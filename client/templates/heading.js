Template.heading.helpers({

});

Template.heading.events({
	'click #residentRoute' : function() {
		document.getElementById("residentRoute").className = "active";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown";

	},
	'click #cardRoute' : function() {
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "active";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown";
	},
	'click #mealListRoute' : function() {
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "active";
		document.getElementById("addCardRoute").className = "dropdown";
	},
	'click #addDropdown' : function() {
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown active";
	}
})