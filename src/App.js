import React, { Component } from "react";
import "./App.css";
import Visualizer from "./Components/PathfindingVisualizer/Visualizer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Tutorial from "./Components/PathfindingVisualizer/Tutorial";

class App extends Component {
  render() {
    return (
      <>
        <Visualizer></Visualizer>
      </>
    );
  }
}

export default App;
