import { useEffect } from "react";
import "./App.css";
import img from "./assets/desk.svg";
import angular from "./assets/angular-14a0f6532f.png";
import * as d3 from "d3";

function App() {
  useEffect(() => {
    const overlayData = {
      x: '50%',
      y: '10%',
      width: 100,
      height: 100,
    };

    // Create D3 selection
    const svg = d3.select("#overlay");

    // Draw overlay rectangle
    svg
      .append("image")
      .attr("x", overlayData.x)
      .attr("y", overlayData.y)
      .attr("width", overlayData.width)
      .attr("height", overlayData.height)
      .attr("fill", 'black')
      .attr('xlink:href', angular)
      .on('mouseover', function () {
        d3.select()
          .attr('fill', 'red');  // Change fill color on hover
      })
      // .attr("fill", "rgba(255, 0, 0, 0.5)"); // Red semi-transparent fill
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={img} style={{ width: "400px" }} alt="" />
      <svg
        id="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

export default App;
