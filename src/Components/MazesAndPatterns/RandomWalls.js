export function RandomWalls(grid, startNode, finishNode, rows, cols) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return;
  }
  let walls = [];
  const wallsToPutOnNodes = Math.floor((rows * cols) / 5);

  for (let i = 0; i < wallsToPutOnNodes; ++i) {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);

    if (
      grid[x][y] !== startNode &&
      grid[x][y] !== finishNode &&
      !grid[x][y].isWall
    ) {
      walls.push([x, y]);
    }
  }
  return walls;
}
