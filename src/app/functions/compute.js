define(['compose/compose', 'functions/add'], function (compose, add) {
	
	var compute = function (n) {
		var square = function (n) { return n * n; };
	
		var composed_function = compose.compose(square, square);
		
		var result = add.add(composed_function(n), composed_function(n));

		return result;
	};
	
	return {
		run: compute
	};
});