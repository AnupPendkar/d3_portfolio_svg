import React from "react";
import * as d3 from "d3";
import laptop from "../assets/laptop.svg";
import { ICoordinates, d3SelectionBase } from "../models";

const useLaptopSvg = (skillName: string) => {
  const svgW = 700;
  const svgH = 700;

  const parentImgWidth = 600;
  const parentImgHeight = 600;
  const parentImgX = 0;
  const parentImgY = 0;

  let parentImgStartCoord: ICoordinates;
  let parentSvgRef: d3SelectionBase;
  let parentImgRef: d3SelectionBase;

  let parentScreenRef: d3SelectionBase;

  function handleDrag(x: number, y: number) {
    const newX = parentImgStartCoord?.xCoordinate + x;
    const newY = parentImgStartCoord?.yCoordinate + y;
    // Update the position of the dragged element
    parentImgRef.attr("x", newX).attr("y", newY);

    parentScreenRef.attr(
      "transform",
      `translate(${93 + newX + parentImgX}, ${132 + newY + parentImgY})`
    );
  }

  function registerDragEvents() {
    let initialCoord: ICoordinates;
    parentImgRef.call(
      d3
        .drag()
        .on("start", (e) => {
          parentImgStartCoord = {
            xCoordinate: +parentImgRef?.attr("x"),
            yCoordinate: +parentImgRef?.attr("y"),
          };
          initialCoord = { xCoordinate: e?.x, yCoordinate: e?.y };
        })
        .on("drag", (e) => {
          handleDrag(
            e?.x - initialCoord?.xCoordinate,
            e?.y - initialCoord?.yCoordinate
          );
        })
    );
  }

  function createParentImg() {
    parentImgRef = parentSvgRef
      .append("image")
      .attr("x", parentImgX)
      .attr("y", parentImgY)
      .attr("width", parentImgWidth)
      .attr("height", parentImgHeight)
      .attr("xlink:href", laptop)
      .attr("pointer-events", "all")
      .style("pointer-events", "all");

    registerDragEvents();
  }

  function createParentSvg() {
    const layout = d3.select(".layout").style("width", "100%");

    parentSvgRef = layout
      .append("svg")
      .attr("class", "laptop_svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
      .attr("width", "100%")
      .attr("height", svgH)
      .attr("viewBox", `0 0 ${svgW} ${svgH}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .style("background-color", "transparent")
      .style("border-radius", "inherit");
  }

  function drawTaperedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    taper: number
  ) {
    // Calculate the points for the tapered rectangle
    const points: { x: number; y: number }[] = [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width + taper, y: y + height },
      { x: x - taper, y: y + height },
    ];

    // Create a line function
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y);

    // Draw the tapered rectangle
    parentScreenRef
      .append("path")
      .attr("d", line(points))
      .attr("fill", "black");
  }

  function createLaptopScreen() {
    parentScreenRef = parentSvgRef
      .append("g")
      .attr("class", "laptop__screen")
      .attr("transform", "translate(93, 132)");

    drawTaperedRect(0, 0, 407, 252, 4);

    parentScreenRef.append("text").attr("class", "screen_text");
  }

  function onSkillPosterClk() {
    parentSvgRef = d3.select(".laptop_svg");
    parentScreenRef = parentSvgRef.select(".laptop__screen");
    parentScreenRef.select(".screen_text").text(skillName);
  }

  function init() {
    createParentSvg();
    createParentImg();
    createLaptopScreen();
  }

  React.useEffect(() => {
    if (skillName !== "") {
      onSkillPosterClk();
    }
  }, [skillName]);

  return { initLaptopSvg: init };
};

export default useLaptopSvg;
