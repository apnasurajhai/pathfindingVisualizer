export function RecursiveDivision(grid, startNode, finishNode) {
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
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let dir;
  let num;
  if (vertical.length < horizontal.length) {
    dir = 0; //Horizontal
    num = getRandomIndex(horizontal);
  }
  if (vertical.length >= horizontal.length) {
    dir = 1; //Vertical
    num = getRandomIndex(vertical);
  }

  if (dir === 0) {
    addIntoWalls(dir, num, vertical, horizontal, startNode, finishNode, walls);
    recursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      grid,
      startNode,
      finishNode,
      walls
    );
    recursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      grid,
      startNode,
      finishNode,
      walls
    );
  } else {
    addIntoWalls(dir, num, vertical, horizontal, startNode, finishNode, walls);
    recursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      grid,
      startNode,
      finishNode,
      walls
    );
    recursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      grid,
      startNode,
      finishNode,
      walls
    );
  }
}

function addIntoWalls(
  dir,
  num,
  vertical,
  horizontal,
  startNode,
  finishNode,
  walls
) {
  let removeRandomNode = false;
  let tempWalls = [];
  if (dir === 0) {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if (
        (temp === startNode.row && num === startNode.col) ||
        (temp === finishNode.row && num === finishNode.col)
      ) {
        removeRandomNode = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  } else {
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
  }
  if (!removeRandomNode) {
    tempWalls.splice(randomNumbers(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}
function randomNumbers(len) {
  let random =
    Math.floor((Math.random() * len) / 2) +
    Math.floor((Math.random() * len) / 2);
  if (random % 2 !== 0) {
    if (random === len) {
      random -= 1;
    } else {
      random += 1;
    }
  }
  return random;
}

function scale(len) {
  let ans = [];
  for (let i = 1; i < len; i++) {
    ans.push(i);
  }
  return ans;
}

function getRandomIndex(arr) {
  let len = arr.length - 1;
  let random =
    Math.floor((Math.random() * len) / 2) +
    Math.floor((Math.random() * len) / 2);
  if (random % 2 === 0) {
    if (random === len) {
      random -= 1;
    } else {
      random += 1;
    }
  }
  return arr[random];
}
