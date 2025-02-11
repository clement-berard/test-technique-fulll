import { describe, expect, it } from 'vitest';
import {isDivisibleByNumber, resolveFizzBuzzValue} from "../utils";

describe('isDivisibleByNumber', () => {
  it('should return good values', () => {
    const bags = [
      {
        test: { num: 2, divisor: 3 },
        expected: false,
      },
      {
        test: { num: 9, divisor: 3 },
        expected: true,
      },
      {
        test: { num: 5, divisor: 5 },
        expected: true,
      },
      {
        test: { num: 0, divisor: 5 },
        expected: true,
      },
    ];
    for (const bag of bags) {
      expect(isDivisibleByNumber(bag.test.num, bag.test.divisor)).toBe(bag.expected);
    }
  });
});

describe('resolveFizzBuzzValue', () => {
  it('should return good values', () => {
    const bags = [
      {
        test: [3, 6, 9, 12, 18, 21, 24, 27, 33, 36],
        expected: 'Fizz',
      },
      {
        test: [5, 10, 20, 25, 35, 40, 50, 55, 65, 70],
        expected: 'Buzz',
      },
      {
        test: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
        expected: 'FizzBuzz',
      },
      {
        test: [1],
        expected: 1,
      },
      {
        test: [2],
        expected: 2,
      },
    ];
    for (const bag of bags) {
      for (const num of bag.test) {
        expect(resolveFizzBuzzValue(num)).toEqual(bag.expected)
      }
    }
  });
});
