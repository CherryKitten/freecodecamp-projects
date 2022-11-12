const grid = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45],
  [46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 58, 59, 60, 61, 62, 63],
  [64, 65, 66, 67, 68, 69, 70, 71, 72],
  [73, 74, 75, 76, 77, 78, 79, 80, 81],
];

class SudokuSolver {
  getPuzzleArray(puzzleString) {
    const puzzleArray = [];
    for (let i = 1; i <= 81; i++) {
      let value = puzzleString[i - 1];
      value === "." || !value
        ? (puzzleArray[Math.ceil(i / 9)][(i % 9) + 1] = " ")
        : (puzzleArray[Math.ceil(i / 9)][(i % 9) + 1] = value);
    }
  }

  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return {
        status: "error",
        error: "Expected puzzle to be 81 characters long",
      };
    } else if (!/^[1-9\.]+$/.test(puzzleString)) {
      return { status: "error", error: "Invalid characters in puzzle" };
    } else {
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {
    return { error: "test" };
  }
}

module.exports = SudokuSolver;
