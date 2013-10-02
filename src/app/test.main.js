var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/',

    paths: {
        angular: 'common/vendor/angular/angular',
        angular_mocks: 'common/vendor/angular-mocks/angular-mocks.js'
    },

    shim: {
        angular: {
            exports: 'angular'
        },
        angular_mocks: {
            exports: 'angular_mocks'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});