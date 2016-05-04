Meteor.methods({
    'createResident': function(resident){
        ResidentList.insert(resident);
    },
    'removeResident': function(resident){
        ResidentList.remove(resident);
    },
    'createMeal': function(meal){
    	console.log(meal);

    	MealList.insert(meal);
    },
    'toggleLcs': function(id, lcs) {
      if (lcs == false) {
    	   ResidentList.update({_id: id}, {$push: {terms: "lcs"}});
         ResidentList.update({_id: id}, {$set: {lcs: true}});
      }
      else if(lcs == true) {
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
