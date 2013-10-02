var shared = function(config) {
    config.set({
        basePath: '../src/',
        frameworks: ['jasmine', 'requirejs'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        singleRun: false,
        colors: true,
        captureTimeout: 60000,
        autoWatch: false,
        logLevel: config.LOG_INFO,
        exclude: ['app/main.js'],
        port: 9876
    });
};

shared.files = [
    'app/test.main.js',
    'common/vendor/angular/angular.js'
];

module.exports = shared;