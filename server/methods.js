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
    	console.log(meal);

    	MealList.insert(meal);
    },
    'editConsistency': function(id, newConsistency) {
    console.log({_id: id});
    console.log(newConsistency);
      ResidentList.update({_id: id}, {$set: {consistency: newConsistency}});
    },

    'editHotBev': function(id, newHotBev) {
      ResidentList.update({_id: id}, {$set: {hotBev: newHotBev}});
    },

    'editColdBev': function(id, newColdBev) {
      ResidentList.update({_id: id}, {$set: {coldBev: newColdBev}});
    },

    'toggleLcs': function(id, lcs) {
      if (lcs == false) {
    	   ResidentList.update({_id: id}, {$push: {terms: "lcs"}});
         ResidentList.update({_id: id}, {$set: {lcs: true}});
      }
      else {
        ResidentList.update({_id: id}, {$pull: {terms: "lcs"}});
        ResidentList.update({_id: id}, {$set: {lcs: false}});
      }
    },
    'toggleNas': function(id, nas) {
      if (nas == false) {
    	   ResidentList.update({_id: id}, {$push: {terms: "nas"}});
         ResidentList.update({_id: id}, {$set: {nas: true}});
      }
      else if(nas == true) {
        ResidentList.update({_id: id}, {$pull: {terms: "nas"}});
        ResidentList.update({_id: id}, {$set: {nas: false}});
      }
    },
    'toggleLowSodium': function(id, lowSodium) {
      if (lowSodium == false) {
    	   ResidentList.update({_id: id}, {$push: {terms: "low sodium"}});
         ResidentList.update({_id: id}, {$set: {lowSodium: true}});
      }
      else if(lowSodium == true) {
        ResidentList.update({_id: id}, {$pull: {terms: "low sodium"}});
        ResidentList.update({_id: id}, {$set: {lowSodium: false}});
      }
    },
    'toggleRenal': function(id, renal) {
      if (renal == false) {
    	   ResidentList.update({_id: id}, {$push: {terms: "renal"}});
         ResidentList.update({_id: id}, {$set: {renal: true}});
      }
      else if(renal == true) {
        ResidentList.update({_id: id}, {$pull: {terms: "renal"}});
        ResidentList.update({_id: id}, {$set: {renal: false}});
      }
    }
});
