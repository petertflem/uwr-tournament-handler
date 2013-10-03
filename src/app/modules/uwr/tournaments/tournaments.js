define([], function () {
	var tournaments = {};

	tournaments.init = function () {
		this.tournaments_template = 'app/modules/uwr/tournaments/tournaments.tpl.html';

		this.tournaments_controller = 'tournaments_controller';

		this.controller(this.tournaments_controller, ['$scope', function ($scope) {
			console.log('Tournaments controller!');
		}]);
	};

	return tournaments;
});