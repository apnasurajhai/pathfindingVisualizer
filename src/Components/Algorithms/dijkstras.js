// TC -> O((N+E) logN ) where N is node and E Adjacent Node
// Sc -> O(N) for visitedNodesInOrder

export function dijkstras(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }

  startNode.distance = 0;
  let unvisitedNodes = getNodes(grid);
  let visitedNodesInOrder = [];

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbours(grid, closestNode);
  }
}

function updateUnvisitedNeighbours(grid, node) {
  let unvisitedNeighbours = getUnvisitedNeighbours(grid, node);
  for (let unvisitedNeighbour of unvisitedNeighbours) {
    unvisitedNeighbour.distance = node.distance + 1;
    unvisitedNeighbour.previousNode = node;
  }
}

function getUnvisitedNeighbours(grid, node) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
}

function getNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function dijkstraNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currNode = finishNode;
  while (currNode !== null) {
    nodesInShortestPathOrder.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
