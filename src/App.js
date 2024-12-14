import React from "react";
import RobotList from "./components/RobotList";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <RobotList />
      <Footer />
    </div>
  );
}

export default App;
