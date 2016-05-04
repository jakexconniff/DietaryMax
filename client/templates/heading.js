Template.heading.helpers({

});

Template.heading.events({
	'click #residentRoute' : function() {
		window.scrollTo(0,0);
		document.getElementById("residentRoute").className = "active";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown";
		Session.set("residentLimit", 8);

	},
	'click #cardRoute' : function() {
		window.scrollTo(0,0);
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "active";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown";
		Session.set("residentLimit", 8);
	},
	'click #mealListRoute' : function() {
		window.scrollTo(0,0);
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "active";
		document.getElementById("addCardRoute").className = "dropdown";
		Session.set("residentLimit", 8);
	},
	'click #addDropdown' : function() {
		document.getElementById("residentRoute").className = "";
		document.getElementById("cardRoute").className = "";
		document.getElementById("mealListRoute").className = "";
		document.getElementById("addCardRoute").className = "dropdown active";
	}
})
