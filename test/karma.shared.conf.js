var shared = function(config) {
    config.set({
        basePath: '../src/',
        reporters: ['progress'],
        browsers: ['Chrome'],
        singleRun: false,
        colors: true,
        captureTimeout: 60000,
        autoWatch: false,
        logLevel: config.LOG_INFO,
        port: 9876
    });
};

shared.files = [
    'common/vendor/angular/angular.js'
];

shared.frameworks = ['jasmine'];

module.exports = shared;