define(['functions/compute'], function (compute) {

	describe('Compute should', function () {

		it ('run calculations on given number', function () {

			var result = compute.run(2);

			expect(result).toBe(32);
		});

	});

});