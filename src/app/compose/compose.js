define([], function () {
	var compose = function (fn1, fn2) {
		return function (x) {
			return fn2(fn1(x));
		};
	};
	 
	return {
		compose: compose
	};
});