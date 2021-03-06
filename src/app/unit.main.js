var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/unit.spec.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    paths: {
        angular: 'common/vendor/angular/angular',
        angular_mocks: 'common/vendor/angular-mocks/angular-mocks'
    },

    shim: {
        angular: { exports: 'angular' },
        angular_mocks: { exports: 'angular_mocks' }
    },

    baseUrl: 'base/',
    deps: tests,
    callback: window.__karma__.start
});