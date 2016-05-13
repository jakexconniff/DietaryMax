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
      var searchQuery = new RegExp(searchParam, "i");
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
        temp = '<span>lcs</span> <span class="red glyphicon glyphicon-remove"></span>';
      }
      if (this.terms.indexOf("lcs") == -1) {
        temp = "";

      }
      return temp + " ";
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

    /*toggleAddGlyph: function(term) {
        if (term == "lcs") {
          if (!this.lcs)
            return "glyphicon glyphicon-plus shown";
        }
        else if (term == "nas") {
          if (!this.nas)
            return "glyphicon glyphicon-plus shown";
        }
        else if (term == "low sodium") {
          if (!this.lowSodium)
            return "glyphicon glyphicon-plus shown";
        }
        else if (term == "renal") {
          if (!this.renal)
            return "glyphicon glyphicon-plus shown";
        }
        else {
          return "glyphicon glyphicon-plus hidden";
        }
    },

    toggleRemoveGlyph: function(term) {
      var glyph = "glyphicon glyphicon-remove hidden";
          if (term == "lcs") {
            if (this.lcs) {
              glyph = "glyphicon glyphicon-remove shown";
            }
            else return "";
          }
          if (term == "nas") {
            if (this.nas == true) {
              glyph ="glyphicon glyphicon-remove shown";
            }
          }
          if (term == "low sodium") {
            if (this.lowSodium == true) {
              glyph = "glyphicon glyphicon-remove shown";
            }
          }
          if (term == "renal") {
            if (this.renal == true) {
              glyph = "glyphicon glyphicon-remove shown";
            }
          }
          return glyph;
          globe.applyEdits(swapEdit);
    }, */
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
      console.log(document.getElementsByClassName("removeLcsIcon"));
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
