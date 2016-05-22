Meteor.methods({
    'createResident': function(resident){
        ResidentList.insert(resident);
    },
    'removeResident': function(resident){
        ResidentList.remove(resident);
    },
    'createMeal': function(meal){
    	MealList.insert(meal);
    },
    'editSelect': function(id, select, field) {
      console.log(select + " " + field);
      selector = {};
      selector[field] = select;
      ResidentList.update({_id: id}, {$set: selector});
    },
    'toggleTerm': function(resident, name) {
      console.log(name);
      id = resident._id;
      if (name == "lcs") status = resident.lcs;
      if (name == "nas") status = resident.nas;
      if (name == "lowSodium") status = resident.lowSodium;
      if (name == "renal") status = resident.renal;
      console.log(status);
      pushTerm = {};
      pushTerms = {};
      pushTerms["terms"] = name;
      if (status === false) {
        pushTerm[name] = true;
        ResidentList.update({_id: id}, {$push: pushTerms});
        ResidentList.update({_id: id}, {$set: pushTerm});
      }
      if (status === true) {
        pushTerm[name] = false;
        ResidentList.update({_id: id}, {$pull: pushTerms});
        ResidentList.update({_id: id}, {$set: pushTerm});
      }
    },
});
