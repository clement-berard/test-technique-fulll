export function isDivisibleByNumber(num: number, divisor: number): boolean {
  return num % divisor === 0;
}

export function resolveFizzBuzzValue(num: number): string | number {
  if (isDivisibleByNumber(num, 3) && isDivisibleByNumber(num, 5)) {
    return "FizzBuzz";
  } else if (isDivisibleByNumber(num, 3)) {
    return "Fizz";
  } else if (isDivisibleByNumber(num, 5)) {
    return "Buzz";
  } else {
    return num;
  }
}
