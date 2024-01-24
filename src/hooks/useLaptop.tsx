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

  let textNode: d3SelectionBase;
  let parentScreenRef: d3SelectionBase;

  function handleDrag(x: number, y: number) {
    const newX = parentImgStartCoord?.xCoordinate + x;
    const newY = parentImgStartCoord?.yCoordinate + y;
    // Update the position of the dragged element
    parentImgRef.attr("x", newX).attr("y", newY);
    parentScreenRef.attr(
      "transform",
      `translate(${95 + newX + parentImgX}, ${134 + newY + parentImgY})`
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

  function createLaptopScreen() {
    parentScreenRef = parentSvgRef
      .append("g")
      .attr("class", "laptop__screen")
      .attr("transform", "translate(95, 134)");

    parentScreenRef
      .append("rect")
      .attr("width", "403")
      .attr("height", "247")
      .attr("fill", "black");

    // textNode = parentScreenRef
    // .append("text").text("dkjk")
    // parentScreenRef
    // .append("text").text("dkjk").attr('x', 50);
  }

  function init() {
    createParentSvg();
    createParentImg();
    createLaptopScreen();
  }

  React.useEffect(() => {
    if (skillName !== "") {
      console.log(skillName);
      //   textNode.text("sff").attr("x", 20).attr("y", 20);
    }
  }, [skillName]);

  return { initLaptopSvg: init };
};

export default useLaptopSvg;
