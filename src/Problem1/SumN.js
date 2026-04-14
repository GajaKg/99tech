var sum_to_n_a = function (n) {
  let sum = 0;

  while (n) {
    sum += n;
    n--;
  }

  return sum;
};
console.log(sum_to_n_a(5))

var sum_to_n_b = function (n, sum) {
  if (n === 0) return sum;

  sum += n;
  n--

  return sum_to_n_b(n, sum)
};
console.log(sum_to_n_b(5, 0))

var sum_to_n_c = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i
  }

  return sum
};
console.log(sum_to_n_c(5))
