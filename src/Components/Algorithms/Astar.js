export function Astar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return;
  }
  startNode.distance = 0;
  let visitedNodesInOrder = [];
  let unvisitedNodes = [];
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((x, y) => x.totalDistance - y.totalDistance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode === finishNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    let neighbours = getNeighbours(grid, closestNode);
    for (let neighbour of neighbours) {
      let distance = closestNode.distance + 1;

      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance =
          distance + manhattenDistance(neighbour, finishNode);
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance =
          distance + manhattenDistance(neighbour, finishNode);
        neighbour.previousNode = closestNode;
      }
    }
  }
  return visitedNodesInOrder;
}

function manhattenDistance(node, finishNode) {
  let x = Math.abs(node.row - finishNode.row);
  let y = Math.abs(node.col - finishNode.col);
  return x + y;
}

function getNeighbours(grid, node) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);

  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
}
