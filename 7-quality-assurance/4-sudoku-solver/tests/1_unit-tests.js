const chai = require("chai");
const assert = chai.assert;
import { puzzlesAndSolutions } from "../controllers/puzzle-strings";

const invalidStrings = [
  "135762984946-8125772845961369451783281293674535B82419647329856158167342926:145378",
  '56891372434268751"%=7254386685479231219538467734162895926345178473891652851726943',
  "/////////////////////////////////////////////////////////////////////////////////",
  "NyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyanNyan.",
];

const unsolvableStrings = [
  "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.420..8..1..16....926969.37.",
  "4206942069.......................................................................",
  "111111111111111111111111111111111111111111111111111111111111111111111111111111111",
];

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
      assert.equal(
        solver.validate("135762984946145378").error,
        "Expected puzzle to be 81 characters long"
      );
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
        console.log(i);
        assert.equal(
          solver.solve(puzzlesAndSolutions[i][1]),
          puzzlesAndSolutions[i][1]
        );
      }
    });
    test("Invalid puzzle strings fail the solver", () => {
      for (let i in invalidStrings) {
        assert.equal(
          solver.solve(invalidStrings[i].error),
          "Invalid characters in puzzle",
          "invalid characters" + invalidStrings[i]
        );
      }
      assert.equal(
        solver.solve("135762984946145378").error,
        "Expected puzzle to be 81 characters long",
        "wrong length"
      );
      for (let i in unsolvableStrings) {
        assert.equal(
          solver.solve().error,
          "Puzzle cannot be solved",
          "not solvable" + unsolvableStrings[i]
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

/*
TODO:




    Valid puzzle strings pass the solver
 */
