import React from "react";
import * as d3 from "d3";
import laptop from "../assets/laptop.svg";
import { d3SelectionBase } from "../models";
import useFrame from "./useFrame";

const useLaptopSvg = (skillName: string) => {
  const frame = useFrame();
  const svgW = 700;
  const svgH = window.innerHeight;

  const parentImgWidth = 600;
  const parentImgHeight = 600;
  const parentImgX = 0;
  const parentImgY = 0;

  let parentSvgRef: d3SelectionBase;
  let parentImgRef: d3SelectionBase;
  let parentScreenRef: d3SelectionBase;

  function handleZoom(e: any) {
    parentGroup.attr("transform", e.transform);
  }

  const zoom = d3
    .zoom<SVGSVGElement, any>()
    .scaleExtent([0.8, 2])
    .on("zoom", (e) => handleZoom(e));

  const initialTransform = d3.zoomIdentity
    .translate(window.innerWidth - 900, window.innerHeight - 900)
    .scale(1.3);

  function registerDragEvents() {
    parentSvgRef
      .call(zoom)
      .call(zoom.transform, initialTransform)
      .on("dblclick.zoom", null);
  }

  let parentGroup: d3SelectionBase;

  function createParentImg() {
    parentGroup = parentSvgRef
      .append("g")
      .attr("class", "parent_group")
      .attr(
        "transform",
        `translate(${window.innerWidth - 700}, ${window.innerHeight - 800})`
      );

    parentImgRef = parentGroup
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
    console.log(window.innerWidth);
    const layout = d3
      .select(".layout")
      // .style("width", "100%")
      .append("g");

    parentSvgRef = layout
      .append("svg")
      .attr("class", "laptop_svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
      // .attr("width", "100%")
      // .attr("height", svgH)
      // .attr("viewBox", `0 0 ${svgW} ${svgH}`)
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
    parentScreenRef = parentGroup
      .append("g")
      .attr("class", "laptop__screen")
      .attr("transform", "translate(93, 132)");

    frame.createFrame(parentScreenRef, "desktop");

    drawTaperedRect(0, 0, 407, 252, 4);

    parentScreenRef.append("use").attr("xlink:href", "#myCustomShape");

    parentImgRef.raise();
  }

  function onSkillPosterClk() {
    parentSvgRef = d3.select(".laptop_svg");
    parentScreenRef = parentSvgRef.select(".laptop__screen");

    frame.updateFrame(skillName);
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
