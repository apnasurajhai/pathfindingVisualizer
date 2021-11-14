import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isStart,
      isFinish,
      isWall,
      row,
      col,
      isVisited,
      isShortest,
      onMouseEnter,
      onMouseDown,
      onMouseUp,
      width,
      height,
      numRows,
      numCols,
    } = this.props;

    const classes = isStart
      ? "node node-start"
      : isFinish
      ? "node node-finish"
      : isWall
      ? "node node-wall"
      : isShortest
      ? "node node-shortest-path"
      : isVisited
      ? "node node-visited"
      : "node";

    // This below values are each individual nodes widht and height.
    let cellWidth = Math.floor((width - 15) / numCols);
    let cellHeight;
    if (width > 1500) {
      cellHeight = Math.floor((height - 70) / numRows);
    } else if (width > 1000) {
      cellHeight = Math.floor((height - 70) / numRows);
    } else if (width > 500) {
      cellHeight = Math.floor((height - 60) / numRows);
    } else if (width > 0) {
      cellHeight = Math.floor((height - 50) / numRows);
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${classes}`}
        style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
      ></div>
    );
  }
}

export default Node;
