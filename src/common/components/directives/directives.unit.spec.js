define(['common/components/directives/directives', 'angular'], function (directives, ng) {

	describe('The directives module', function () {

		beforeEach(function () {
			ng.mock.module('directives');
		});

		describe('The tabset directive', function () {
			var scope;
			var elm;
			
			beforeEach(inject(function($rootScope, $compile) {
				elm =   ng.element('<tabset>' +
								'<tab data-route="/home" data-title="Home"></tab>' +
								'<tab data-route="/tournaments" data-title="Tournaments"></tab>' +
								'<tab data-route="/about" data-title="About"></tab>' +
							'</tabset>');

				
				var scope = $rootScope;
				$compile(elm)(scope);
				scope.$digest();
			}));

			it ('should create clickable titles', function () {
				var titles = elm.find('a');
				
				expect(titles.length).toBe(3);
				expect(titles.eq(0).text()).toBe('Home');
				expect(titles.eq(1).text()).toBe('Tournaments');
				expect(titles.eq(2).text()).toBe('About');
			});
		});
	});
});