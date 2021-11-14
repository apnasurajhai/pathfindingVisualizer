export function RecursiveHorizontal(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return;
  }

  let walls = [];
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[0][i] !== startNode && grid[0][i] !== finishNode) {
      walls.push([0, i]);
    }
  }
  for (let i = 0; i < grid.length; i++) {
    if (
      grid[i][grid[0].length - 1] !== startNode &&
      grid[i][grid[0].length - 1] !== finishNode
    ) {
      walls.push([i, grid[0].length - 1]);
    }
  }
  for (let i = grid[0].length - 1; i >= 0; i--) {
    if (
      grid[grid.length - 1][i] !== startNode &&
      grid[grid.length - 1][i] !== finishNode
    ) {
      walls.push([grid.length - 1, i]);
    }
  }
  for (let i = grid.length - 1; i >= 0; i--) {
    if (grid[i][0] !== startNode && grid[i][0] !== finishNode) {
      walls.push([i, 0]);
    }
  }

  let horizontal = scale(grid[0].length - 1);
  let vertical = scale(grid.length);
  recursiveWalls(vertical, horizontal, grid, startNode, finishNode, walls);
  return walls;
}

function recursiveWalls(
  vertical,
  horizontal,
  grid,
  startNode,
  finishNode,
  walls
) {
  if (vertical.length < 2) {
    return;
  }

  let breakRow = Math.floor(Math.random() * 2);
  for (let num of vertical) {
    if (breakRow === 0 && num % 2 !== 0) {
      addIntoWalls(num, horizontal, startNode, finishNode, walls);
    }
    if (breakRow === 1 && num % 2 === 0) {
      addIntoWalls(num, horizontal, startNode, finishNode, walls);
    }
  }
}

function addIntoWalls(num, horizontal, startNode, finishNode, walls) {
  let removeRandomNode = false;
  let tempWalls = [];

  if (horizontal.length === 2) return;
  for (let temp of horizontal) {
    if (
      (num === startNode.row && temp === startNode.col) ||
      (num === finishNode.row && temp === finishNode.col)
    ) {
      removeRandomNode = true;
      continue;
    }
    tempWalls.push([num, temp]);
  }

  if (!removeRandomNode) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

function scale(len) {
  let ans = [];
  for (let i = 1; i < len; i++) {
    ans.push(i);
  }
  return ans;
}
