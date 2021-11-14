import React, { Component, useState } from "react";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
    };
  }
  showSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };
  selectAlgorithm(selection) {
    if (this.props.visualizing) {
      return;
    }

    if (
      this.props.algorithm === "Visualize" ||
      this.props.algorithm === selection ||
      this.props.algorithm === "Select Algorithm!"
    ) {
      this.props.updateAlgorithmState(selection);
      console.log(this.props.algorithm);
    } else if (this.props.pathState) {
      this.props.clearPath();
      this.props.updateAlgorithmState(selection);
    } else {
      console.log("y u clicking me again and again? please");
      this.props.updateAlgorithmState(selection);
    }
  }

  // selectMaze(selection) {
  //   if (this.props.visualizing || this.props.mazeGeneration) {
  //     return;
  //   }
  //   if (selection === this.props.maze || this.props.maze === "") {
  //     this.props.updateMazeState(selection);
  //   } else if (this.props.mazeState) {
  //     this.clearGrid();
  //     this.props.updateMazeState(selection);
  //   } else {
  //     this.props.updateMazeState(selection);
  //   }
  // }

  generateMaze(selection) {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    if (this.props.mazeState || this.props.pathState) {
      this.props.clearGridPartially();
      console.log("are we ?");
    }
    this.props.updateMazeValueState(true);
    if (selection === "Random Walls") {
      console.log("are we ?");
      this.props.generateRandomWalls();
    } else if (selection === "Recursive Division")
      this.props.generateRecursiveDivision();
    else if (selection === "Recursive Vertical")
      this.props.generateRecursiveVertical();
    else if (selection === "Recursive Horizontal")
      this.props.generateRecursiveHorizontal();
  }

  changeSpeed(sidebarSpeed) {
    if (this.props.visualizing || this.props.mazeGeneration) {
      return;
    }
    let speedVal = [];
    if (sidebarSpeed === "Slow") speedVal = [60, 40];
    else if (sidebarSpeed === "Medium") speedVal = [30, 25];
    else if (sidebarSpeed === "Fast") speedVal = [5, 5];
    this.props.updateSidebarSpeed(sidebarSpeed);
    this.props.updateSpeed(speedVal[0], speedVal[1]);
  }

  myFunction1 = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };
  myFunction2 = () => {
    document.getElementById("myDropdown1").classList.toggle("show1");
  };
  myFunction3 = () => {
    document.getElementById("myDropdown2").classList.toggle("show2");
  };

  // The below function is executed when you click on dropdown buttons, it will display dropdown content or will remove if you click it again.
  componentDidMount() {
    window.onclick = (event) => {
      if (!event.target.matches(".dropdown-button")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          } else if (openDropdown.classList.contains("show1")) {
            openDropdown.classList.remove("show1");
          } else if (openDropdown.classList.contains("show2")) {
            openDropdown.classList.remove("show2");
          }
        }
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="main-nav">
          <div className="logo">
            <h3>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Pathfinding Visualizer
              </Link>
            </h3>
          </div>
          <div className={this.state.sidebar ? "menu mobile-menu" : "menu"}>
            <div className="dropdown1">
              <button
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="dropdown-button"
                onClick={() => {
                  this.myFunction1();
                }}
              >
                <span>Algorithm</span>
              </button>
              <div className="dropdown-content" id="myDropdown">
                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize Dijkstra");
                  }}
                >
                  Dijkstra's Algorithm
                </button>
                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize A*");
                  }}
                >
                  A* Algorithm
                </button>

                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize Greedy BFS");
                  }}
                >
                  Greedy Best First Search
                </button>
                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize BFS");
                  }}
                >
                  Breadth First Search
                </button>
                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize DFS");
                  }}
                >
                  Depth First Search
                </button>
                <button
                  onClick={() => {
                    this.selectAlgorithm("Visualize Bidirectional");
                  }}
                >
                  Bidirectional Search
                </button>
              </div>
            </div>
            <div className="dropdown2">
              <button
                className="dropdown-button"
                onClick={() => {
                  this.myFunction2();
                }}
              >
                <span>Mazes</span>
              </button>
              <div className="dropdown-content" id="myDropdown1">
                <button
                  onClick={() => {
                    this.generateMaze("Recursive Division");
                  }}
                >
                  Recursive Division
                </button>
                <button
                  onClick={() => {
                    this.generateMaze("Recursive Vertical");
                  }}
                >
                  Recursive Vertival Division
                </button>
                <button
                  onClick={() => {
                    this.generateMaze("Recursive Horizontal");
                  }}
                >
                  Recursive Horizontal Division
                </button>
                <button
                  onClick={() => {
                    this.generateMaze("Random Walls");
                  }}
                >
                  Random Walls
                </button>
              </div>
            </div>

            <div className="tutorial">
              <Link to="/tutorial">Tutorials</Link>
            </div>
            <div className="dropdown3">
              <button
                className="dropdown-button"
                onClick={() => {
                  this.myFunction3();
                }}
              >
                <span>{this.props.sidebarSpeed}</span>
              </button>
              <div className="dropdown-content" id="myDropdown2">
                <button
                  onClick={() => {
                    this.changeSpeed("Slow");
                  }}
                >
                  Slow
                </button>
                <button
                  onClick={() => {
                    this.changeSpeed("Medium");
                  }}
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    this.changeSpeed("Fast");
                  }}
                >
                  Fast{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="hamburger-menu">
            <a href="#" onClick={this.showSidebar}>
              <FaBars></FaBars>
            </a>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Sidebar;
