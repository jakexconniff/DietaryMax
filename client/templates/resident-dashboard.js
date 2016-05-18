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
      Session.set("residentLimit", Session.get("residentLimit") + 8);

    }
    lastScrollTop = scrollTop;
  }});
  Template.residentDashboard.helpers({
    resident : function() {
      Meteor.subscribe('Residents.public');
      var searchParam = Session.get("search");
      //var searchQuery = new RegExp(searchParam, "i");
      var searchQuery = new RegExp('^' + searchParam, "i");
      console.log()
      if (Session.get("searchBy") == "numeric") {
        var residents = ResidentList.find({rmNum: searchQuery}, { sort: { 'rmNum' : 1 }},
        {limit: Session.get("residentLimit")});
        return residents;
      }
      if (Session.get("searchBy") == "letter") {return ResidentList.find({name: searchQuery},
        { sort: { 'rmNum' : 1 }} ,{limit: Session.get("residentLimit")});}
    },
    displayDislikes: function() {
      outputDislikes = this.dislikes;
      console.log(outputDislikes);
      return outputDislikes;
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

    showLcs: function() {
      if (this.terms.indexOf("lcs") >= 0) {
        temp = '<span>lcs</span> <span class="red glyphicon glyphicon-remove"></span> ';
      }
      if (this.terms.indexOf("lcs") == -1) {
        temp = " ";

      }
      return temp;
    },
    showLcsInit: function() {
      if (this.lcs) {
        return "lcs ";
      }
    },
    showNasInit: function() {
      if (this.nas) {
        return "nas ";
      }
    },
    showLowSodiumInit: function() {
      if (this.lowSodium) {
        return "low sodium ";
      }
    },
    showRenalInit: function() {
      if (this.renal) {
        return "renal ";
      }
    },

    showNas: function() {
      if (this.terms.indexOf("nas") >= 0) {
        temp = '<span>nas</span> <span class="red glyphicon glyphicon-remove"></span>';
      }
      if (this.terms.indexOf("nas") == -1) {
        temp = "";

      }
    return temp + " ";
  },
    showLowSodium: function() {
        if (this.terms.indexOf("low sodium") >= 0) {
          temp = '<span>low sodium</span> <span class="red glyphicon glyphicon-remove"></span>';
        }
        if (this.terms.indexOf("low sodium") == -1) {
          temp = "";

        }
      return temp + " ";
    },
    showRenal: function() {
        if (this.terms.indexOf("renal") >= 0) {
          temp = '<span>renal</span> <span class="red glyphicon glyphicon-remove"></span>';
        }
        if (this.terms.indexOf("renal") == -1) {
          temp = "";

        }
      return temp + " ";
    },
    addLcs: function() {
      if (this.terms.indexOf("lcs") == -1) {
        temp = '<span>lcs</span> <span class="green glyphicon glyphicon-plus"></span>';
      }
      if (this.terms.indexOf("lcs") >= 0) {
        temp = "";
        for(var i = termsOpp.length-1; i > -1; i--){
          if (termsOpp[i] === "lcs") termsOpp.splice(i, 1);
        }
      }
      return temp;
    },
    addNas: function() {
      if (this.terms.indexOf("nas") == -1) {
        temp = '<span>nas</span> <span class="green glyphicon glyphicon-plus"></span>';
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
      if (this.terms.indexOf("low sodium") == -1) {
        temp = '<span>low sodium</span> <span class="green glyphicon glyphicon-plus"></span>';
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
      if (this.terms.indexOf("renal") == -1) {
        temp = '<span>renal</span> <span class="green glyphicon glyphicon-plus"></span>';
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
      Session.set("swapEdit", swapEdit);
      console.log(this);
      console.log(swapEdit);
      globe.applyEdits(swapEdit);
      console.log(document.getElementsByClassName("termsedit"));
    },
    'click #editLiquidToggle': function() {
      console.log(this);
      console.log(event.target.text);
      if (event.target.text) {
        Meteor.call('editConsistency', this._id, event.target.text);
      }

    },

    'click #editHotBevToggle': function() {
      if (event.target.text) {
        Meteor.call('editHotBev', this._id, event.target.text);
      }
    },

    'click #editColdBevToggle': function() {
      if (event.target.text) {
        Meteor.call('editColdBev', this._id, event.target.text);
      }
    },

    'click #removeResident': function() {
      Meteor.call('removeResident', this);
    },

    'click .removelcs': function() {
      if (swapEdit % 2 == 1) {
        console.log(this._id);
        console.log(this.lcs);
        Meteor.call('toggleTerm', this._id, this.lcs, "lcs");
      }
    },
    'click #removeNas': function() {
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleTerm', this._id, this.nas, "nas");
      }
    },
    'click #removeLowSodium': function() {
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleTerm', this._id, this.lowSodium, "low sodium");
      }
    },
    'click #removeRenal': function() {
      if (swapEdit % 2 == 1) {
        Meteor.call('toggleTerm', this._id, this.renal, "renal");
      }
    },

    'click #addLcs': function() {
      console.log(document.getElementById("addLcs"));
      console.log(this._id);
      console.log(this.lcs);
        Meteor.call('toggleTerm', this._id, this.lcs, "lcs");
    },

    'click #addNas': function() {
      console.log(document.getElementById("addNas"));
        Meteor.call('toggleTerm', this._id, this.nas, "nas");
    },

    'click #addLowSodium': function() {
      console.log(document.getElementById("addLowSodium"));
        Meteor.call('toggleTerm', this._id, this.lowSodium, "low sodium");
    },

    'click #addRenal': function() {
      console.log(document.getElementById("addRenal"));
              Meteor.call('toggleTerm', this._id, this.renal, "renal");
    },
  });
