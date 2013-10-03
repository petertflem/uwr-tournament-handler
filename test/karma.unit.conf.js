var shared = require('./karma.shared.conf');

module.exports = function (config) {
    shared(config);

    config.exclude = ['app/main.js'];

    config.files = shared.files.concat([
		'app/unit.main.js',
		'common/vendor/angular-mocks/angular-mocks.js',
        {pattern: 'app/**/*.js', included: false},
        {pattern: 'common/components/**/*.js', included: false},
        {pattern: 'app/**/*.unit.spec.js', included: false}
    ]);

    config.frameworks = shared.frameworks.concat(['requirejs']);
};