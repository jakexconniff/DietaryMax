Meteor.publish('Meals.public', function() {
  return MealList.find();	
});

Meteor.publish('Residents.public', function(residentLimit) {
 	return ResidentList.find({}, {limit: residentLimit});
});

Meteor.publish('Residents.all', function() {
 	return ResidentList.find();
});