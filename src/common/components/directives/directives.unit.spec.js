define(['common/components/directives/directives', 'angular'], function (directives, ng) {

	describe('The directives module', function () {

		beforeEach(function () {
			ng.mock.module('directives');
		});

		describe('The tabset directive', function () {
			var scope;
			var elm;
			var links;
			
			beforeEach(inject(function($rootScope, $compile) {
				elm =   ng.element('<tabset>' +
								'<tab data-route="/home" data-title="Home"></tab>' +
								'<tab data-route="/tournaments" data-title="Tournaments"></tab>' +
								'<tab data-route="/about" data-title="About"></tab>' +
							'</tabset>');

				
				var scope = $rootScope;
				$compile(elm)(scope);
				scope.$digest();

				links = elm.find('a');
			}));

			it ('should create 3 tabs', function () {
				expect(links.length).toBe(3);
			});

			it ('should create clickable titles', function () {
				expect(links.eq(0).text()).toBe('Home');
				expect(links.eq(1).text()).toBe('Tournaments');
				expect(links.eq(2).text()).toBe('About');
			});

			it ('should create correct links', function () {
				expect(links.eq(0).attr('href')).toBe('#/home');
				expect(links.eq(1).attr('href')).toBe('#/tournaments');
				expect(links.eq(2).attr('href')).toBe('#/about');
			});
		});
	});
});