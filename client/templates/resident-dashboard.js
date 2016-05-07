var selectedDay = "";
var selectedTime = "";
var swapEdit = 0;
var termsOpp = [];
Session.set("residentLimit", 8);
Session.set("searchBy", "letter");

// Infinite Scroll Code
lastScrollTop = 0;
$(window).scroll(function(event) {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      applyEdits();
      Session.set("residentLimit", Session.get("residentLimit") + 8);

    }
    lastScrollTop = scrollTop;
    console.log("Hello");
    console.log("World");
  }});

  console.log(swapEdit);
  console.log(swapEdit % 2);
  Template.residentDashboard.helpers({
    resident : function() {
      Meteor.subscribe('Residents.public');
      var searchParam = Session.get("search");
      var searchQuery = new RegExp(searchParam, "i");
      console.log(searchQuery);
      if (Session.get("searchBy") == "numeric") {return ResidentList.find({rmNum: searchQuery}, { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});}
      if (Session.get("searchBy") == "letter") {return ResidentList.find({name: searchQuery}, { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});}
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
    termsOpp: function() {
      if (this.terms.indexOf("nas") == -1 && termsOpp.indexOf("nas") == -1) {
        termsOpp.push("nas");
      }
      if (this.terms.indexOf("low sodium") <= 1 && termsOpp.indexOf("low sodium") == -1) {
        termsOpp.push("low sodium");
      }
      if (this.terms.indexOf("renal") == -1 && termsOpp.indexOf("renal") == -1) {
        termsOpp.push("renal");
      }
      if (this.terms.indexOf("nas") >= 0) {
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "nas") termsOpp.splice(i, 1);
        }
      }
      if (this.terms.indexOf("low sodium") >= 0) {
        for(var i = termsOpp.length-1; i > -1; i--){
          console.log("We out here");
          if (termsOpp[i] === "low sodium") termsOpp.splice(i, 1);
        }
      }
      if (this.terms.indexOf("renal") >= 0) {
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "renal") termsOpp.splice(i, 1);
        }
      }

      return termsOpp.join(", ");
    },

    showLcs: function() {
      if (this.lcs == true) {
        return "lcs ";
      }
    },
    showNas: function() {
      if (this.nas == true) {
        return "nas ";
      }
    },
    showLowSodium: function() {
      if (this.lowSodium == true) {
        return "low sodium ";
      }
    },
    showRenal: function() {
      if (this.renal == true) {
        return "renal ";
      }
    },

    addLcs: function() {
      if (this.terms.indexOf("lcs") == -1 && termsOpp.indexOf("lcs") == -1) {
        temp = "lcs";
      }
      if (this.terms.indexOf("lcs") >= 0) {
        temp = "";
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "lcs") termsOpp.splice(i, 1);
        }
      }
      return temp + " ";
    },
    addNas: function() {
      if (this.terms.indexOf("nas") == -1 && termsOpp.indexOf("nas") == -1) {
        temp = "nas";
      }
      if (this.terms.indexOf("nas") >= 0) {
        temp = "";
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "nas") termsOpp.splice(i, 1);
        }
      }
      return temp + " ";
    },
    addLowSodium: function() {
      if (this.terms.indexOf("low sodium") == -1 && termsOpp.indexOf("low sodium") == -1) {
        temp = "low sodium";
      }
      if (this.terms.indexOf("low sodium") >= 0) {
        temp = "";
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "low sodium") termsOpp.splice(i, 1);
        }
      }
      return temp + " ";
    },
    addRenal: function() {
      if (this.terms.indexOf("renal") == -1 && termsOpp.indexOf("renal") == -1) {
        temp = "renal";
      }
      if (this.terms.indexOf("renal") >= 0) {
        temp = "";
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "renal") termsOpp.splice(i, 1);
        }
      }
      return temp + " ";
    },


  });

  Template.residentDashboard.events({
    'click #toggleEditSpan': function (){
      swapEdit++;
      console.log(this);
      console.log(swapEdit);
      applyEdits();
      console.log(document.getElementsByClassName("termsedit"));
    },

    'click #removeResident': function() {
      if(swapEdit % 2 == 1) {
        Meteor.call('removeResident', this);
      }
    },

    'click #removeLcs': function() {
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleLcs', this._id, this.lcs);
      }
    },
    'click #removeNas': function() {
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleNas', this._id, this.nas);
      }
    },
    'click #removeLowSodium': function() {
      console.log("Hello!");
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleLowSodium', this._id, this.lowSodium);
      }
    },
    'click #removeRenal': function() {
      console.log("Hello World!");
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleRenal', this._id, this.renal);
      }
    },

    'click #addLcs': function() {
      console.log(document.getElementById("addLcs"));
      Meteor.call('toggleLcs', this._id, this.lcs);
    },

    'click #addNas': function() {
      console.log(document.getElementById("addNas"));
      Meteor.call('toggleNas', this._id, this.nas);
    },

    'click #addLowSodium': function() {
      console.log(document.getElementById("addLowSodium"));
      Meteor.call('toggleLowSodium', this._id, this.lowSodium);
    },

    'click #addRenal': function() {
      console.log(document.getElementById("addRenal"));
      Meteor.call('toggleRenal', this._id, this.renal);
    },
  });

  function applyEdits() {
    console.log(swapEdit);
    console.log(document.getElementsByClassName("termsedit"));
    if (swapEdit % 2 == 0) {
      for (var i=0; i<document.getElementsByClassName("termsedit").length; i++) {
        document.getElementsByClassName("termsedit")[i].className = "termsedit hidden";
        document.getElementsByClassName("glyphicon-remove")[i].className = "glyphicon glyphicon-remove hidden";
      }
    }
    else if (swapEdit % 2 == 1) {
      for (var i=0; i<document.getElementsByClassName("termsedit").length; i++) {
        document.getElementsByClassName("termsedit")[i].className = "termsedit shown";
        document.getElementsByClassName("glyphicon-remove")[i].className = "glyphicon glyphicon-remove shown";
      }
    }

  }
