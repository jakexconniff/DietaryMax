if(Meteor.isClient){

  var selectedDay = "";
  var selectedTime = "";
  Session.set("residentLimit", 8);

  lastScrollTop = 0;
  $(window).scroll(function(event) {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
    Session.set("residentLimit", Session.get("residentLimit") + 8);
    }
    lastScrollTop = scrollTop;
  }})


  Template.residentDashboard.helpers({
    resident : function() {
      return ResidentList.find({}, {limit: Session.get("residentLimit")});
    },
    meal : function() {
      console.log(MealList.find().fetch());
      return MealList.find();
    },
    protein : function() {
      console.log(MealList.find().fetch());
      if (this.nas == "nas ")
        this.protein = "Hot Dog"; 
      else
        this.protein = "Cheeseburger";
      return this.protein;
    },
    veg : function() {
      if (this.lcs == "lcs ")
        this.veg = "Green Beans";
      else
        this.veg = "Sweet Carrots";
      return this.veg;
    },
    starch : function() {
      if (this.nas == "nas " || this.renal == "renal ")
        this.starch = "Mashed Potatoes";
      else
        this.starch = "French Fries";
      return this.starch;
    },
    mealTimer : function() {
      console.log(this);
    },
    terms: function() {
      if (this.lcs == true) {
        this.terms.push("lcs");
      }
      if (this.nas == true) {
        this.terms.push("nas");
      }
      if (this.lowSodium == true) {
        this.terms.push("low sodium");
      }
      if (this.renal == true) {
        this.terms.push("renal");
      }
      console.log(this.terms);
      return this.terms.join(", ");
    }

  });
  Template.residentDashboard.events({

    'click .resident-card' : function (){
      if (this.name == "Joe Josephson")
        console.log("Test 1");
      else
        console.log("Test 2");
    }
  });

}