import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Header from "./comp/Header";
import About from "./comp/About";
import Experience from "./comp/Experience";
import Projects from "./comp/Projects";
import Contact from "./comp/Contact";

function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
