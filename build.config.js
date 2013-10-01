module.exports = {

	build_directory: 'build',
	compiled_directory: 'compiled',

	karma_config: 'test/karma.conf.js',

	app_files: {
		js: ['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/test.main.js'],
		js_spec: ['src/app/**/*.spec.js'],

		less: 'src/stylesheets/less/main.less'
	},

	vendor_files: {
		js: [
			'src/common/vendor/requirejs/require.js'
		],
		css: [
			'src/stylesheets/css/vendor/bootstrap.css',
			'src/stylesheets/css/vendor/normalize.css'
		]
	}
}