require.config({

	baseUrl: './',

	paths: {
		angular: 'common/vendor/angular/angular'
	},

	shim: {
		angular: {
			exports: 'angular'
		}
	}

});

require(['angular', 'app/modules/uwr/uwr'], function (ng, uwr) {

	/* Bootstrap the angular app on the html element */
	ng.bootstrap(document.documentElement, ['uwr']);
});