module.exports = {

	build_directory: 'build',
	compiled_directory: 'compiled',

	karma_config: {
		unit: 'test/karma.unit.conf.js'
	},

	app_files: {
		js: ['src/app/**/*.js', 
			'src/common/components/**/*.js',
			'!src/app/**/*.spec.js', 
			'!src/app/unit.main.js'],
		js_unit: ['src/app/**/*.unit.spec.js'],
		
		less_main: 'src/stylesheets/less/main.less',
		less: 'src/app/**/*.less',

		templates: ['app/**/*.tpl.html', 'common/components/**/*.tpl.html']
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