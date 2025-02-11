import {resolveFizzBuzzValue} from "./utils";

function fizzBuzz(n: number): void {
  for (let i = 1; i <= n; i++) {
    console.log(resolveFizzBuzzValue(i));
  }
}


fizzBuzz(100);
