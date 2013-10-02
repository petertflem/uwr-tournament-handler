var shared = require('./karma.shared.conf');

module.exports = function (config) {
    shared(config);

    config.files = shared.files.concat([
        {pattern: 'app/**/*.js', included: false},
        {pattern: 'app/**/*.spec.js', included: false}
    ]);
};