define([
	'angular', 
	'app/modules/uwr/home/home',
	'app/modules/uwr/tournaments/tournaments',
	'app/modules/uwr/about/about'
], function (ng, home, tournaments, about) {

	var uwr = ng.module('uwr', []);

	/* Initialize sections */
	home.init.call(uwr);
	tournaments.init.call(uwr);
	about.init.call(uwr);

	/* Set up 404 */
	uwr['404_template'] = 'app/modules/uwr/404.tpl.html';
	uwr['404_controller'] = '404_controller';
	uwr.controller('404_controller', function () {
		console.log('404 controller!');
	});

	/* Bind routes */
	uwr.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', { redirectTo: '/home' })
			.when('/home', 
				{  
					controller: uwr.home_controller,
					templateUrl: uwr.home_template
				})
			.when('/tournaments', 
				{  
					controller: uwr.tournaments_controller,
					templateUrl: uwr.tournaments_template
				})
			.when('/about',
				{  
					controller: uwr.about_controller,
					templateUrl: uwr.about_template
				})
			.when('/404', 
				{
					controller: uwr['404_controller'],
					templateUrl: uwr['404_template']
				})
			.otherwise({ redirectTo: '/404' });
	}]);

	uwr.controller('uwr_controller', function () {

	});

	return uwr;
});