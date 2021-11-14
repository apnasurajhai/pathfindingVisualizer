import React, { Component } from "react";
import "./Visualizer.css";
import Node from "./Node";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//Algorithms
import { dijkstras } from "../Algorithms/dijkstras";

import {
  BidirectionSearch,
  BSNodesInShortestPathOrder,
} from "../Algorithms/BidirectionSearch";

import { dfs } from "../Algorithms/depthFirstSearch";

import { bfs } from "../Algorithms/breadthFirstSearch";

import { Astar } from "../Algorithms/Astar";
import { GreedyBFS } from "../Algorithms/GreedyBFS";

//Mazes And Patterns
import { RandomWalls } from "../MazesAndPatterns/RandomWalls";
import { RecursiveDivision } from "../MazesAndPatterns/RecursiveDivision";
import { RecursiveHorizontal } from "../MazesAndPatterns/RecursiveHorizontal";
import { RecursiveVertical } from "../MazesAndPatterns/RecursiveVertical";
import Tutorial from "./Tutorial";

const initialNum = getInitialNum(window.innerWidth, window.innerHeight);
const initialNumRows = initialNum[0];
const initialNumCols = initialNum[1];

let startAndfinish = getStartFinishNode(initialNumRows - 9, initialNumCols);
const startNodeRow = startAndfinish[0];
const startNodeCol = startAndfinish[1];
const finishNodeRow = startAndfinish[2];
const finishNodeCol = startAndfinish[3];

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: "Visualize",
      grid: [],
      mouseIsPressed: false,
      visualizing: false,
      mazeGeneration: false,
      width: window.innerWidth,
      height: window.innerHeight,
      numRows: initialNumRows,
      numCols: initialNumCols,
      speed: 10,
      mazeSpeed: 10,
      maze: "",
      pathState: false,
      mazeState: false,
      sidebarSpeed: "Speed",
    };
  }

  nodesInShortestPathOrder = (finishNode) => {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  animateShortestPath = (nodesInShortestPathOrder, visitedNodesInOrder) => {
    if (nodesInShortestPathOrder.length === 1)
      this.setState({ visualizing: false });
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
            this.state.grid,
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
          this.setState({ grid: newGrid, visualizing: false });
        }, i * (3 * this.state.speed));
        return;
      }
      let node = nodesInShortestPathOrder[i];
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, i * (3 * this.state.speed));
    }
  };

  animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    let newGrid = this.state.grid.slice();
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    this.setState({ grid: newGrid });
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
        }, i * this.state.speed);
        return;
      }
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, i * this.state.speed);
    }
  };

  animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          this.clearGrid();
          let newGrid = newGridWithMaze(this.state.grid, walls);
          this.setState({ grid: newGrid, mazeGeneration: false });
        }, i * this.state.mazeSpeed);
        return;
      }
      let wall = walls[i];
      let node = this.state.grid[wall[0]][wall[1]];
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      }, i * this.state.mazeSpeed);
    }
  };

  generateRandomWalls() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ mazeGeneration: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const walls = RandomWalls(grid, startNode, finishNode, 29, 55);
      this.animateMaze(walls);
    }, this.state.mazeSpeed);
  }

  generateRecursiveDivision() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ mazeGeneration: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const walls = RecursiveDivision(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, this.state.mazeSpeed);
  }

  generateRecursiveHorizontal() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ mazeGeneration: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const walls = RecursiveHorizontal(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, this.state.mazeSpeed);
  }
  generateRecursiveVertical() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ mazeGeneration: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const walls = RecursiveVertical(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, this.state.mazeSpeed);
  }

  // Updating states section
  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  updateSpeed(pathSpeed, mazeSpeed) {
    this.setState({ speed: pathSpeed, mazeSpeed: mazeSpeed });
  }

  updateAlgorithmState(selection) {
    this.setState({ algorithm: selection });
  }
  updatePathState(value) {
    this.setState({ pathState: value });
  }
  updateMazeValueState(value) {
    this.setState({ mazeState: value }); // maze boolean value state
  }
  updateSidebarSpeed(selection) {
    this.setState({ sidebarSpeed: selection });
  }
  updateMazeState(selection) {
    this.setState({ maze: selection });
  }

  // Mouse Handling Events
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed) {
      const newGrid = getNewGridWithWalls(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const grid = getInitialGrid(this.state.numRows, this.state.numCols);
    this.setState({ grid });
  }

  clearGrid() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          !(
            (row === startNodeRow && col === startNodeCol) ||
            (row === finishNodeRow && col === finishNodeCol)
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getInitialGrid(this.state.numRows, this.state.numCols);
    this.setState({
      grid: newGrid,
      visualizing: false,
      mazeGeneration: false,
    });
  }

  clearPath() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    for (let row = 0; row < this.state.grid.length; row++) {
      for (let col = 0; col < this.state.grid[0].length; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    const newGrid = getGridWithoutPath(this.state.grid);
    this.setState({
      grid: newGrid,
      visualizing: false,
      mazeGeneration: false,
    });
  }
  clearGridPartially() {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    this.clearGrid();
    this.updateMazeValueState(false);
    this.updatePathState(false);
  }
  // Algorithm part
  visualizeDijkstra() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = dijkstras(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        this.nodesInShortestPathOrder(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, this.state.speed);
  }

  visualizeBidirectionalBFSSearch() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      let startNode = grid[startNodeRow][startNodeCol];
      let finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesOrder = BidirectionSearch(grid, startNode, finishNode);

      let visitedNodesInOrder = visitedNodesOrder[0];
      startNode = visitedNodesOrder[1];
      finishNode = visitedNodesOrder[2];
      let nodesInShortestPathOrder = BSNodesInShortestPathOrder(
        this.state.grid,
        startNode,
        finishNode
      );

      this.animateBidirectionalAlgorithm(
        visitedNodesInOrder,
        nodesInShortestPathOrder
      );
    }, this.state.speed);
  }

  animateBidirectionalAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    let newGrid = this.state.grid.slice();
    for (let row of newGrid) {
      for (let node of row) {
        let newNode = {
          ...node,
          isVisited: false,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    this.setState({ grid: newGrid });
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPathForBS(
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
        }, i * this.state.speed);

        return;
      }
      setTimeout(() => {
        for (let j = 0; j < visitedNodesInOrder[i].length; ++j) {
          const [row, col] = visitedNodesInOrder[i][j];

          document.getElementById(`node-${row}-${col}`).className =
            "node node-visited";
        }
      }, i * this.state.speed);
    }
  }

  animateShortestPathForBS(nodesInShortestPathOrder, visitedNodesInOrder) {
    if (nodesInShortestPathOrder.length === 1)
      this.setState({ visualizing: false });
    for (let i = 1; i <= nodesInShortestPathOrder.length - 1; i++) {
      const node = nodesInShortestPathOrder[i];
      if (i === nodesInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRenderBS(
            this.state.grid,
            nodesInShortestPathOrder,
            visitedNodesInOrder
          );
          this.setState({ grid: newGrid, visualizing: false });
        }, i * (3 * this.state.speed));
        return;
      }

      setTimeout(() => {
        // coloring the found path
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, i * (3 * this.state.speed));
    }
  }

  visualizeDFS() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = dfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        this.nodesInShortestPathOrder(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, this.state.speed);
  }

  visualizeBFS() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        this.nodesInShortestPathOrder(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, this.state.speed);
  }

  visualizeAstar() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = Astar(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        this.nodesInShortestPathOrder(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, this.state.speed);
  }
  visualizeGreedyBFS() {
    if (this.state.visualizing || this.state.mazeGeneration) {
      return;
    }
    this.setState({ visualizing: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      const visitedNodesInOrder = GreedyBFS(grid, startNode, finishNode);
      const nodesInShortestPathOrder =
        this.nodesInShortestPathOrder(finishNode);
      this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    }, this.state.speed);
  }
  render() {
    let { grid } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Sidebar
            algorithm={this.state.algorithm}
            maze={this.state.maze}
            sidebarSpeed={this.state.sidebarSpeed}
            pathState={this.state.pathState}
            mazeState={this.state.mazeState}
            mazeSpeed={this.state.mazeSpeed}
            visualizing={this.state.visualizing}
            updateAlgorithmState={this.updateAlgorithmState.bind(this)}
            updateMazeValueState={this.updateMazeValueState.bind(this)}
            updatePathState={this.updatePathState.bind(this)}
            updateSidebarSpeed={this.updateSidebarSpeed.bind(this)}
            updateMazeState={this.updateMazeState.bind(this)}
            updateSpeed={this.updateSpeed.bind(this)}
            clearPath={this.clearPath.bind(this)}
            generateRandomWalls={this.generateRandomWalls.bind(this)}
            generateRecursiveDivision={this.generateRecursiveDivision.bind(
              this
            )}
            generateRecursiveHorizontal={this.generateRecursiveHorizontal.bind(
              this
            )}
            generateRecursiveVertical={this.generateRecursiveVertical.bind(
              this
            )}
            clearGridPartially={this.clearGridPartially.bind(this)}
          />
          <Switch>
            <Route exact path="/tutorial">
              <Tutorial></Tutorial>
            </Route>
            <Route exact path="/">
              <div
                className={
                  this.state.visualizing || this.state.mazeGeneration
                    ? "visualizing-grid"
                    : "grid"
                }
              >
                {grid.map((row, currRow) => {
                  return (
                    <div key={currRow}>
                      {row.map((cell, currCell) => {
                        const {
                          row,
                          col,
                          isStart,
                          isFinish,
                          isVisited,
                          isShortest,
                          isWall,
                        } = cell;
                        return (
                          <Node
                            key={currCell}
                            row={row}
                            col={col}
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            isVisited={isVisited}
                            isShortest={isShortest}
                            onMouseDown={(row, col) =>
                              this.handleMouseDown(row, col)
                            }
                            onMouseEnter={(row, col) =>
                              this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                            width={this.state.width}
                            height={this.state.height}
                            numRows={this.state.numRows}
                            numCols={this.state.numCols}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <Footer
                algorithm={this.state.algorithm}
                maze={this.state.maze}
                sidebarSpeed={this.state.sidebarSpeed}
                pathState={this.state.pathState}
                mazeState={this.state.mazeState}
                clearGrid={this.clearGrid.bind(this)}
                visualizing={this.state.visualizing}
                algorithm={this.state.algorithm}
                updateAlgorithmState={this.updateAlgorithmState.bind(this)}
                updateMazeValueState={this.updateMazeValueState.bind(this)}
                updatePathState={this.updatePathState.bind(this)}
                updateMazeState={this.updateMazeState.bind(this)}
                visualizeDijkstra={this.visualizeDijkstra.bind(this)}
                visualizeBidirectionalBFSSearch={this.visualizeBidirectionalBFSSearch.bind(
                  this
                )}
                visualizeDFS={this.visualizeDFS.bind(this)}
                visualizeBFS={this.visualizeBFS.bind(this)}
                visualizeAstar={this.visualizeAstar.bind(this)}
                visualizeGreedyBFS={this.visualizeGreedyBFS.bind(this)}
                clearPath={this.clearPath.bind(this)}
                updateSidebarSpeed={this.updateSidebarSpeed.bind(this)}
                clearGridPartially={this.clearGridPartially.bind(this)}
              />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
function getInitialNum(width, height) {
  let numColumns;
  if (width > 1500) {
    numColumns = Math.floor(width / 25);
  } else if (width > 1250) {
    numColumns = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numColumns = Math.floor(width / 20);
  } else if (width > 750) {
    numColumns = Math.floor(width / 17.5);
  } else if (width > 500) {
    numColumns = Math.floor(width / 15);
  } else if (width > 250) {
    numColumns = Math.floor(width / 12.5);
  } else if (width > 0) {
    numColumns = Math.floor(width / 10);
  }
  let cellWidth = Math.floor(width / numColumns);
  let numRows = Math.floor(height / cellWidth);
  return [numRows, numColumns];
}

// Function to create grid using each node with rows and column
const getInitialGrid = (numRows, numCols) => {
  let grid = [];
  for (let row = 0; row < numRows - 9; row++) {
    let currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

// Function to create each cell of the grid
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isShortest: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWalls = (grid, row, col) => {
  let newGrid = grid.slice();
  let node = grid[row][col];
  let newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const newGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};

const getGridWithoutPath = (grid) => {
  let newGrid = grid.slice();
  for (let row of grid) {
    for (let node of row) {
      let newNode = {
        ...node,
        distance: Infinity,
        totalDistance: Infinity,
        isVisited: false,
        isShortest: false,
        previousNode: null,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  return newGrid;
};

function getRandomNums(num) {
  let randomNums1 = [];
  let temp = 2;
  for (let i = 5; i < num / 2; i += 2) {
    randomNums1.push(temp);
    temp += 2;
  }
  let randomNums2 = [];
  temp = -2;
  for (let i = num / 2; i < num - 5; i += 2) {
    randomNums2.push(temp);
    temp -= 2;
  }
  return [randomNums1, randomNums2];
}

function getStartFinishNode(numRows, numColumns) {
  let randomNums;
  let x;
  let y;
  let startNodeRow;
  let startNodeCol;
  let finishNodeRow;
  let finishNodeCol;
  if (numRows < numColumns) {
    randomNums = getRandomNums(numRows);
    x = Math.floor(numRows / 2);
    y = Math.floor(numColumns / 4);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow =
      x + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    startNodeCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    finishNodeRow =
      x + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
    finishNodeCol =
      numColumns - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    console.log(x, y);
  } else {
    randomNums = getRandomNums(numColumns);
    x = Math.floor(numRows / 4);
    y = Math.floor(numColumns / 2);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    startNodeCol =
      y + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    finishNodeRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    finishNodeCol =
      y + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
  }
  return [startNodeRow, startNodeCol, finishNodeRow, finishNodeCol];
}

const updateNodesForRender = (
  grid,
  nodesInShortestPathOrder,
  visitedNodesInOrder
) => {
  let newGrid = grid.slice();
  for (let node of visitedNodesInOrder) {
    if (
      (node.row === startNodeRow && node.col === startNodeCol) ||
      (node.row === finishNodeRow && node.col === finishNodeCol)
    )
      continue;
    let newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
  for (let node of nodesInShortestPathOrder) {
    if (node.row === finishNodeRow && node.col === finishNodeCol) {
      return newGrid;
    }
    let newNode = {
      ...node,
      isVisited: false,
      isShortest: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
};
const updateNodesForRenderBS = (
  grid,
  nodesInShortestPathOrder,
  visitedNodesInOrder
) => {
  let newGrid = grid.slice();
  for (let i = 0; i < visitedNodesInOrder; i++) {
    for (let j = 0; j < visitedNodesInOrder[i].length; j++) {
      const node = visitedNodesInOrder[i][j];
      if (
        (node.row === startNodeRow && node.col === startNodeCol) ||
        (node.row === finishNodeRow && node.col === finishNodeCol)
      )
        continue;
      let newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  for (let node of nodesInShortestPathOrder) {
    if (node.row === finishNodeRow && node.col === finishNodeCol) {
      return newGrid;
    }
    let newNode = {
      ...node,
      isVisited: false,
      isShortest: true,
    };
    newGrid[node.row][node.col] = newNode;
  }
};

export default Visualizer;
