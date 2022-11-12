const chai = require("chai");
const assert = chai.assert;
import {
  puzzlesAndSolutions,
  invalidStrings,
  unsolvableStrings,
  wrongLengthStrings,
} from "../controllers/puzzle-strings";

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("Unit Tests", () => {
  suite("Validation", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      for (let i in puzzlesAndSolutions) {
        assert.isTrue(solver.validate(puzzlesAndSolutions[i][0]));
      }
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      for (let i in invalidStrings) {
        assert.equal(
          solver.validate(invalidStrings[i]).error,
          "Invalid characters in puzzle",
          invalidStrings[i]
        );
      }
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      for (let i in wrongLengthStrings) {
        assert.equal(
          solver.validate(wrongLengthStrings[i]).error,
          "Expected puzzle to be 81 characters long"
        );
      }
    });
  });
  suite("Placement Checks", () => {
    test("Login handles a valid row placement", () => {
      const checks = [
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], "A", 2, 3),
        solver.checkRowPlacement(puzzlesAndSolutions[0][1], "A", 2, 6),
        solver.checkRowPlacement(puzzlesAndSolutions[0][2], "A", 1, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid row placement", () => {
      const checks = [
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], "A", 2, 8),
        solver.checkRowPlacement(puzzlesAndSolutions[0][1], "A", 2, 1),
        solver.checkRowPlacement(puzzlesAndSolutions[0][2], "A", 1, 3),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
    test("Login handles a valid column placement", () => {
      const checks = [
        solver.checkColPlacement(puzzlesAndSolutions[0][0], "A", 2, 3),
        solver.checkColPlacement(puzzlesAndSolutions[0][1], "A", 2, 6),
        solver.checkColPlacement(puzzlesAndSolutions[0][2], "A", 1, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid column placement", () => {
      const checks = [
        solver.checkColPlacement(puzzlesAndSolutions[0][0], "B", 2, 9),
        solver.checkColPlacement(puzzlesAndSolutions[0][1], "B", 2, 8),
        solver.checkColPlacement(puzzlesAndSolutions[0][2], "C", 3, 2),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
    test("Logic handles a valid region (3x3 grid) placement", () => {
      const checks = [
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], "A", 2, 3),
        solver.checkRegionPlacement(puzzlesAndSolutions[0][1], "A", 2, 6),
        solver.checkRegionPlacement(puzzlesAndSolutions[0][2], "A", 1, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid region (3x3 grid) placement", () => {
      const checks = [
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], "C", 3, 5),
        solver.checkRegionPlacement(puzzlesAndSolutions[0][1], "C", 3, 5),
        solver.checkRegionPlacement(puzzlesAndSolutions[0][2], "C", 3, 5),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
  });
  suite("Solver", () => {
    test("Valid puzzle strings pass the solver", () => {
      for (let i in puzzlesAndSolutions) {
        assert.equal(
          solver.solve(puzzlesAndSolutions[i][1]),
          puzzlesAndSolutions[i][1]
        );
      }
    });
    test("Invalid puzzle strings fail the solver", () => {
      for (let i in invalidStrings) {
        assert.equal(
          solver.solve(invalidStrings[i]),
          { error: "Invalid characters in puzzle" },
          "invalid characters"
        );
      }
    });
    test("Solver returns the expected solution for an incomplete puzzle", () => {
      for (let i in puzzlesAndSolutions) {
        assert.equal(
          solver.solve(puzzlesAndSolutions[i][0]),
          puzzlesAndSolutions[i][1],
          puzzlesAndSolutions[i]
        );
      }
    });
  });
});
