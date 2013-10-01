require.config({
	paths: {},
	shim: {}
});

require(['functions/compute'], function (compute) {

	alert(compute.run(2));

});