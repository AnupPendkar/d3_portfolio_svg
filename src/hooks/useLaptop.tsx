/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as d3 from "d3";
import laptop from "../assets/laptop.svg";
import { d3SelectionBase } from "../models";
import useFrame from "./useFrame";

const useLaptopSvg = (skillName: string) => {
  const frame = useFrame();

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
    .scaleExtent([0.5, 2])
    .on("zoom", (e) => handleZoom(e));

  const initialTransform = d3.zoomIdentity
    .translate(window.innerWidth - 900, window.innerHeight - 900)
    .scale(1.3);

  function registerDragEvents() {
    parentSvgRef
      .call(zoom)
      .call(zoom.transform as any, initialTransform)
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

  function performAction(className: string) {
    switch (className) {
      case "close_btn":
        d3.select(".chrome__group").remove();
        d3.select(".action_btn_group").remove();
        break;

      case "window_btn":
        console.log("window");
        break;

      case "min_btn":
        console.log("min");
        break;
    }
  }

  function createActionBtn(
    btnGroupSelection: d3SelectionBase,
    className: string,
    color: string,
    x: number
  ) {
    const btn = btnGroupSelection
      .append("rect")
      .attr("class", className)
      .attr("width", 12)
      .attr("height", 10)
      .attr("x", x)
      .attr("y", 1)
      .style("opacity", 0.4)
      .style("pointer-events", "all")
      .on("click", () => {
        performAction(className);
      })
      .on("mouseover", () => {
        btn.attr("fill", color);
      })
      .on("mouseout", () => {
        btn.attr("fill", "transparent");
      });
  }

  function createActionBtns() {
    if (!d3.select(".action_btn_group").empty()) {
      return;
    }

    const actionBtnGroup = d3
      .select(".parent_group")
      .append("g")
      .attr("class", "action_btn_group")
      .attr("transform", "translate(93, 132)");

    createActionBtn(actionBtnGroup, "close_btn", "red", 395);
    createActionBtn(actionBtnGroup, "window_btn", "grey", 383);
    createActionBtn(actionBtnGroup, "min_btn", "grey", 371);
  }

  function createLaptopScreen() {
    parentScreenRef = parentGroup
      .append("g")
      .attr("class", "laptop__screen")
      .attr("transform", "translate(93, 132)");

    frame.createFrame(parentScreenRef);

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
      createActionBtns();
    }
  }, [skillName]);

  return { initLaptopSvg: init };
};

export default useLaptopSvg;
