module.exports = [
  {
    name: "isFibonacci",
    logic: function(value) {
      if (value == 0) {
        return 0;
      } else if (value == 1) {
        return 1;
      }
      return fibonacci(value - 1) + fibonacci(value - 2);
    }
  }
];
