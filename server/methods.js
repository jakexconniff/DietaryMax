Meteor.methods({
    'createResident': function(resident){
        ResidentList.insert(resident);
    },
    'removeResident': function(resident){
        ResidentList.remove(resident);
    },
    'refresh': function(id) {
      ResidentList.find({_id: id});
    },

    'createMeal': function(meal){
    	MealList.insert(meal);
    },
    'editConsistency': function(id, newConsistency) {
      ResidentList.update({_id: id}, {$set: {consistency: newConsistency}});
    },

    'editHotBev': function(id, newHotBev) {
      ResidentList.update({_id: id}, {$set: {hotBev: newHotBev}});
    },

    'editColdBev': function(id, newColdBev) {
      ResidentList.update({_id: id}, {$set: {coldBev: newColdBev}});
    },
    'toggleTerm': function(id, term, name) {
      pushTerm = {};
      pushTerms = {};
      pushTerms["terms"] = name;
      if (term === false) {
        if (name == "low sodium") {
          name = "lowSodium";
        }
        pushTerm[name] = true;
        ResidentList.update({_id: id}, {$push: pushTerms});
        ResidentList.update({_id: id}, {$set: pushTerm});
      }
      if (term === true) {
        if (name == "low sodium")
          name = "lowSodium";
        pushTerm[name] = false;
        ResidentList.update({_id: id}, {$pull: pushTerms});
        ResidentList.update({_id: id}, {$set: pushTerm});
      }
    }
});
