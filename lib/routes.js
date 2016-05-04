Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'residentDashboard'
	});
	this.route('cards', {
		path: '/cardsList',
		template: 'cardDashboard'
	});
	this.route('residents', {
		path: '/residentList',
		template: 'residentDashboard'
	});
	this.route('addResident', {
		path: '/addResident',
		template: 'addResident'
	});
	this.route('mealList', {
		path: '/mealList',
		template: 'mealList'
	});
	this.route('addMeal', {
		path: '/addMeal',
		template: 'add-meal'
	});
});