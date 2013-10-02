module.exports = {

	build_directory: 'build',
	compiled_directory: 'compiled',

	karma_config: {
		unit: 'test/karma.unit.conf.js',
		e2e: 'test/karma.e2e.conf.js'
	},

	app_files: {
		js: ['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/test.main.js'],
		js_spec: ['src/app/**/*.spec.js'],

		less: 'src/stylesheets/less/main.less',

		templates: ['app/modules/**/*.tpl.html']
	},

	vendor_files: {
		js: [
			'common/vendor/requirejs/require.js',
			'common/vendor/angular/angular.js'
		],
		css: [
			'src/stylesheets/css/vendor/bootstrap.css',
			'src/stylesheets/css/vendor/normalize.css'
		]
	}
}