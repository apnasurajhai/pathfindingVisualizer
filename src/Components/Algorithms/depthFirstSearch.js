export function dfs(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return;
  }
  let visitedNodesInOrder = [];
  let row = startNode.row;
  let col = startNode.col;
  let finishCol = finishNode.col;
  let finishRow = finishNode.row;
  depthFirstSearch(
    grid,
    row,
    col,
    finishRow,
    finishCol,
    visitedNodesInOrder,
    finishNode
  );
  return visitedNodesInOrder;
}

function depthFirstSearch(
  grid,
  row,
  col,
  finishRow,
  finishCol,
  visitedNodesInOrder,
  finishNode
) {
  let node = grid[row][col];
  node.isVisited = true;
  if (node === finishNode) return;
  visitedNodesInOrder.push(node);
  let dirx = [-1, 0, 1, 0];
  let diry = [0, 1, 0, -1];

  for (
    let i = 0;
    i < dirx.length && !grid[finishRow][finishCol].isVisited;
    ++i
  ) {
    const newRow = row + dirx[i];
    const newCol = col + diry[i];

    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      !grid[newRow][newCol].isVisited &&
      !grid[newRow][newCol].isWall
    ) {
      grid[newRow][newCol].previousNode = node;
      depthFirstSearch(
        grid,
        newRow,
        newCol,
        finishRow,
        finishCol,
        visitedNodesInOrder,
        finishNode
      );
    }
  }
}

export function DFSNodesInShortestPathOrder(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
