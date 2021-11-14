import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  clearGrid() {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    this.props.clearGrid();
    this.props.updateAlgorithmState("Visualize");
    this.props.updatePathState(false);
    this.props.updateMazeValueState(false);
    this.props.updateMazeState("");
    this.props.updateSidebarSpeed("Speed");
  }

  clearPath() {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    this.props.clearPath();
    this.props.updatePathState(false);
    this.props.updateMazeValueState(false);
    this.props.updateSidebarSpeed("Speed");
  }

  visualizeAlgorithm() {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    if (this.props.pathState) {
      this.props.clearGridPartially();
      console.log("why?");
      return;
    }

    if (
      this.props.algorithm === "Visualize" ||
      this.props.algorithm === "Select Algorithm!"
    ) {
      this.props.updateAlgorithmState("Select Algorithm!");
    } else {
      this.props.updatePathState(true);
      console.log(this.props.algorithm);
      if (this.props.algorithm === "Visualize Dijkstra") {
        console.log("are u here?");
        this.props.visualizeDijkstra();
      } else if (this.props.algorithm === "Visualize A*")
        this.props.visualizeAstar();
      else if (this.props.algorithm === "Visualize Greedy BFS")
        this.props.visualizeGreedyBFS();
      else if (this.props.algorithm === "Visualize Bidirectional")
        this.props.visualizeBidirectionalBFSSearch();
      else if (this.props.algorithm === "Visualize BFS")
        this.props.visualizeBFS();
      else if (this.props.algorithm === "Visualize DFS")
        this.props.visualizeDFS();
    }
  }

  render() {
    return (
      <div className="footer">
        <button id="clearPath" onClick={() => this.clearPath()}>
          Clear Path
        </button>
        <button id="visualize" onClick={() => this.visualizeAlgorithm()}>
          {this.props.algorithm}
        </button>
        <button id="clearGrid" onClick={() => this.clearGrid()}>
          Clear Grid
        </button>
      </div>
    );
  }
}

export default Footer;
