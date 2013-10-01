define(['compose/compose'], function (compose) {
  
  describe('Compose should', function () {
    
    it ('return a composed function', function () {
      
      var square = function (n) { return n * n; };
      var square_dobble = compose.compose(square, square);

      var result = square_dobble(2);

      expect(result).toBe(16);
    });   
  
  });

});