var selectedDay = "";
var selectedTime = "";
var swapEdit = 0;
var termsOpp = [];
Session.set("helper", 0);
Session.set("residentLimit", 8);
Session.set("searchBy", "letter");

// Infinite Scroll Code
lastScrollTop = 0;
$(window).scroll(function(event) {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      globe.applyEdits(swapEdit);
      Session.set("residentLimit", Sxession.get("residentLimit") + 8);

    }
    lastScrollTop = scrollTop;
  }});
  Template.residentDashboard.helpers({
    resident : function() {
      Meteor.subscribe('Residents.public');
      var searchParam = Session.get("search");
      var searchQuery = new RegExp(searchParam, "i");
      //var searchQuery = new RegExp('^' + searchParam, "i");
      if (Session.get("searchBy") == "numeric") {
        var residents = ResidentList.find({rmNum: searchQuery}, { sort: { 'rmNum' : 1 }},
        {limit: Session.get("residentLimit")});
        return residents;
      }
      if (Session.get("searchBy") == "letter") {return ResidentList.find({name: searchQuery},
        { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});}
    },
    displayDislikes: function() {
      return this.dislikes;
    },

    residentId: function() {
      return this._id;
    },
    meal : function() {
      return MealList.find();
    },
    mealTimer : function() {
    },
    terms: function() {
      return this.terms.join(", ");
    },

    showLcsInit: function() {
      if (this.lcs) return "lcs ";
    },
    showNasInit: function() {
      if (this.nas) return "nas ";
    },
    showLowSodiumInit: function() {
      if (this.lowSodium) return "low sodium ";
    },
    showRenalInit: function() {
      if (this.renal) return "renal ";
    },

    showLcs: function() {
      return globe.removeTerm(this, "lcs" , "red glyphicon glyphicon-remove", true);
    },
    showNas: function() {
      return globe.removeTerm(this, "nas", "red glyphicon glyphicon-remove", true);
  },
    showLowSodium: function() {
        return globe.removeTerm(this, "low sodium", "red glyphicon glyphicon-remove", true);
    },
    showRenal: function() {
        return globe.removeTerm(this, "renal", "red glyphicon glyphicon-remove", true);
    },
    addLcs: function() {
      return globe.removeTerm(this, "lcs", "green glyphicon glyphicon-plus", false);
    },
    addNas: function() {
      return globe.removeTerm(this, "nas", "green glyphicon glyphicon-plus", false);
    },
    addLowSodium: function() {
      return globe.removeTerm(this, "low sodium", "green glyphicon glyphicon-plus", false);
    },
    addRenal: function() {
      return globe.removeTerm(this, "renal", "green glyphicon glyphicon-plus", false);
    },
  });

  Template.residentDashboard.events({
    'click #toggleEditSpan': function (){
      swapEdit++;
      Session.set("swapEdit", swapEdit);
      globe.applyEdits(swapEdit);
    },
    'click .selector': function() {
      if (event.target.text) {
        Meteor.call('editSelect', this._id, event.target.text, event.target.parentNode.className);
      }
    },

    'click #removeResident': function() {
      Meteor.call('removeResident', this);
    },
    
    'click .rest': function() {
      term = event.target.innerHTML;
      if (term == "low sodium") term = "lowSodium";
      console.log(this);
      Meteor.call('toggleTerm', this, term);
    },
  });
