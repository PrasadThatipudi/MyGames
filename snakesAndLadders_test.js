import { getNumberSymbol } from "./snakesAndLadders.js";
import { padWithZero } from "./snakesAndLadders.js";
import { put } from "./snakesAndLadders.js";
import { assertEquals } from "jsr:@std/assert/equals";

Deno.test("getNumberSymbol: single digit", () => {
  assertEquals(getNumberSymbol(0), "0️⃣");
});

Deno.test("getNumberSymbol: double digit", () => {
  assertEquals(getNumberSymbol(10), undefined);
});

Deno.test("getNumberSymbol: last digit", () => {
  assertEquals(getNumberSymbol(9), "9️⃣");
});

Deno.test("numberInString:single digit", () =>
  assertEquals(padWithZero(1, 3), "001")
);

Deno.test("numberInString:double digit", () =>
  assertEquals(padWithZero(10, 3), "010")
);

Deno.test("numberInString:string length zero", () =>
  assertEquals(padWithZero(10, 0), "10")
);

Deno.test("put: replace from start", () =>
  assertEquals(put("hello", "ka", 0), "kallo")
);

Deno.test("put: replace string's length is less than strings length", () =>
  assertEquals(put("hello", "le", 1), "hlelo")
);

Deno.test("put: replace string's length is greater than strings length", () =>
  assertEquals(put("hello", "alium", 2), "healium")
);
