require.config({

	paths: {
		angular: '../common/vendor/angular/angular'
	},

	shim: {
		angular: {
			exports: 'angular'
		}
	}

});

require(['angular'], function (ng) {

	/* Bootstrap the angular app on the html element */
	ng.bootstrap(document.documentElement, ['uwr_module']);
});