import React, { Component } from "react";
import video1 from "./select_algorithm.mp4";
import video2 from "./select_mazes.mp4";
import video3 from "./select_speed.mp4";
import video4 from "./visualize.mp4";
import video5 from "./clearGrid.mp4";
import video6 from "./clearPath.mp4";
import video7 from "./drawMaze.mp4";
import video8 from "./createWalls.mp4";
import "./Tutorial.css";
class Tutorial extends Component {
  // This below function gets executed when you click on videos.
  componentDidMount() {
    var video = document.querySelectorAll("video");
    video.forEach((play) =>
      play.addEventListener("click", () => {
        play.classList.toggle("active");
        if (play.paused) {
          play.play();
        } else {
          play.pause();
          play.currentTime = 0;
        }
      })
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="heading">Pathfinding Visualizer Tutorial</div>
          <div className="video-container">
            <div className="video">
              <video src={video1}></video>
              <div className="content">
                <h2>Select Algorithm</h2>
                <p>
                  Choose Algorithms of your choice before visualizing for
                  finding the shortest path
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video2}></video>
              <div className="content">
                <h2>Select Mazes</h2>
                <p>
                  Choose Different Mazes And Patterns to add some obstacles or
                  walls in between the source and destination.
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video3}></video>
              <div className="content">
                <h2>Select Speed</h2>
                <p>
                  Your increase or decrease the speed of visualizing to get the
                  proper understanding of how visualization is happening behind
                  the scenes.
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video4}></video>
              <div className="content">
                <h2>Visualize</h2>
                <p>
                  After selecting the algorithm, mazes and speed you can now
                  click on Visualize button to start visualizing the selected
                  algorithm.
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video5}></video>
              <div className="content">
                <h2>Clear Grid</h2>
                <p>Clear Grid button will reset the whole application.</p>
              </div>
            </div>
            <div className="video">
              <video src={video6}></video>
              <div className="content">
                <h2>Clear Path</h2>
                <p>
                  Clear Path button will clear the board or grid without
                  changing any options.
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video7}></video>
              <div className="content">
                <h2>Draw Mazes</h2>
                <p>
                  As soon as you click on any of the mazes it will start
                  appearing on the grid.
                </p>
              </div>
            </div>
            <div className="video">
              <video src={video8}></video>
              <div className="content">
                <h2>Create Walls</h2>
                <p>
                  You can create walls on grid by pressing the mouse button
                  while hover on the grid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tutorial;
