import { calcBowlingScore } from "../src/calc";
describe("test bowling scoring function", () => {
  it("should handle all possibilities of the last turn", () => {
    expect(calcBowlingScore([1, "/", 5])).toBe(15);
    expect(calcBowlingScore([1, "/", "X"])).toBe(20);
    expect(calcBowlingScore(["X", 1, 2])).toBe(13);
    expect(calcBowlingScore(["X", 1, "/"])).toBe(20);
    expect(calcBowlingScore(["X", "X", 2])).toBe(22);
    expect(calcBowlingScore(["X", "X", "X"])).toBe(30);
  });
  it("should add up all simple numbers", () => {
    const score = [
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
      9,
      "-",
    ];
    expect(calcBowlingScore(score)).toBe(90);
  });
  it("should correctly handle spares", () => {
    const score = [
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
      "/",
      5,
    ];
    expect(calcBowlingScore(score)).toBe(150);
  });
  it("should handle a spare+strike ending", () => {
    expect(
      calcBowlingScore([
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        "/",
        "X",
      ])
    ).toBe(18 + 10 + 10);
  });
  it("should correctly handle strikes", () => {
    const score = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"];
    expect(calcBowlingScore(score)).toBe(300);
  });
  it("should handle strikes that don't finish so well", () => {
    const score = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", 1, 2];
    expect(calcBowlingScore(score)).toBe(274);
  });
  it("should handle a mix of scores", () => {
    const score = ["X", 4, 3, "X", 4, "/", 7, "/", "X", "X", "X", 2, 3, 4, 5];
    const calcdTotal = 17 + 7 + 20 + 17 + 20 + 30 + 22 + 15 + 5 + 9;
    expect(calcBowlingScore(score)).toBe(calcdTotal);
  });
});
