define(['angular', 'app/modules/uwr/uwr'], function (ng, uwr) {

	describe('UWR Module', function () {

		beforeEach(function () {
			ng.mock.module('uwr');
		});

		describe('should have a route to', function () {
			var routes;

			beforeEach(inject(function($route) {
				routes = $route.routes;
			}));

			it('/home', function() {
				check_route('home');
			});

			it('/tournaments', function() {
				check_route('tournaments');
			});

			it('/about', function() {
				check_route('about');
			});

			it('/404', function () {
				check_route('404');
			});

			function check_route(route) {
				expect(routes['/' + route].controller).toBe(uwr[route + '_controller']);
				expect(routes['/' + route].templateUrl).toEqual(uwr[route + '_template']);
			}
		});
		
	});

});