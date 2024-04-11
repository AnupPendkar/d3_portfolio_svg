/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as d3 from "d3";
import laptop from "../assets/laptop.svg";
import { d3SelectionBase } from "../models";
import useFrame from "../hooks/useFrame";

const LaptopSVG = ({ skillName }: { skillName: string }) => {
  const frame = useFrame();
  //   const svgW = 700;
  //   const svgH = window.innerHeight;

  const parentImgWidth = 600;
  const parentImgHeight = 600;
  const parentImgX = 0;
  const parentImgY = 0;

  let laptopSVGRef: d3SelectionBase;
  let laptopSVGGr: d3SelectionBase;
  let laptopImgRef: d3SelectionBase;
  let laptopSVGScreenRef: d3SelectionBase;

  function assignLaptopSVGAttr() {
    laptopSVGRef = d3
      .select(".laptop_svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
      // .attr("width", "100%")
      // .attr("height", parentImgHeight)
      // .attr("viewBox", `0 0 ${parentImgWidth} ${parentImgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .style("background-color", "transparent")
      .style("border-radius", "inherit");
  }

  function handleZoom(e: any) {
    laptopSVGGr.attr("transform", e.transform);
  }

  const zoom = d3
    .zoom<SVGSVGElement, any>()
    .scaleExtent([0.5, 2])
    .on("zoom", (e) => handleZoom(e));

  function getInitLayout() {
    if (window.innerWidth < 500) {
      return { width: (window.innerWidth - 350) / 2, height: 380, scale: 0.6 };
    } else if (window.innerWidth < 800) {
      return { width: (window.innerWidth - 500) / 2, height: 380, scale: 0.7 };
    } else if (window.innerWidth < 1000) {
      return {
        width: window.innerWidth - 430,
        height: (window.innerHeight - 600) / 2,
        scale: 0.7,
      };
    } else if (window.innerWidth < 1200) {
      return {
        width: window.innerWidth - 490,
        height: (window.innerHeight - 600) / 2,
        scale: 0.75,
      };
    } else if (window.innerWidth < 1600) {
      return {
        width: window.innerWidth - 600,
        height: (window.innerHeight - 630) / 2,
        scale: 1,
      };
    } else if (window.innerWidth < 1800) {
      return {
        width: window.innerWidth - 750,
        height: (window.innerHeight - 700) / 2,
        scale: 1.1,
      };
    } else {
      return {
        width: window.innerWidth - 850,
        height: (window.innerHeight - 700) / 2,
        scale: 1.2,
      };
    }
  }

  const initialTransform = d3.zoomIdentity
    .translate(getInitLayout()?.width, getInitLayout()?.height)
    .scale(getInitLayout()?.scale);

  function registerDragEvents() {
    console.log(window.innerWidth);
    laptopSVGRef
      .call(zoom)
      .call(zoom.transform as any, initialTransform)
      .on("dblclick.zoom", null);
  }

  function appendLaptopImgAndRegisterEvent() {
    laptopSVGGr = laptopSVGRef
      .append("g")
      .attr("class", "laptop_svg_group")
      .attr(
        "transform",
        `translate(${window.innerWidth - 700}, ${window.innerHeight - 800})`
      );

    laptopImgRef = laptopSVGGr
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
    laptopSVGScreenRef
      .append("path")
      .attr("d", line(points))
      .attr("fill", "black");
  }

  function createLaptopScreen() {
    laptopSVGScreenRef = laptopSVGGr
      .append("g")
      .attr("class", "laptop_screen")
      .attr("transform", "translate(93, 132)");

    frame.createFrame(laptopSVGScreenRef);

    drawTaperedRect(0, 0, 407, 252, 4);

    laptopSVGScreenRef.append("use").attr("xlink:href", "#myCustomShape");

    laptopImgRef.raise();
  }

  function initializeLaptopSvg() {
    if (!d3.select(".laptop_svg_group")?.empty()) {
      return;
    }

    assignLaptopSVGAttr();
    appendLaptopImgAndRegisterEvent();
    createLaptopScreen();
  }

  function onSkillPosterClk() {
    laptopSVGRef = d3.select(".laptop_svg");
    laptopSVGScreenRef = laptopSVGRef.select(".laptop_screen");

    frame.updateFrame(skillName);
  }

  function performActionByChromeBtnType(className: string) {
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

  function createActionBtnByType(
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
        performActionByChromeBtnType(className);
      })
      .on("mouseover", () => {
        btn.attr("fill", color);
      })
      .on("mouseout", () => {
        btn.attr("fill", "transparent");
      });
  }

  function createChromeActionBtns() {
    if (!d3.select(".action_btn_group").empty()) {
      return;
    }

    const actionBtnGroup = d3
      .select(".laptop_svg_group")
      .append("g")
      .attr("class", "action_btn_group")
      .attr("transform", "translate(93, 132)");

    createActionBtnByType(actionBtnGroup, "close_btn", "red", 395);
    createActionBtnByType(actionBtnGroup, "window_btn", "grey", 383);
    createActionBtnByType(actionBtnGroup, "min_btn", "grey", 371);
  }

  React.useEffect(() => {
    initializeLaptopSvg();
  }, []);

  React.useEffect(() => {
    if (skillName !== "") {
      onSkillPosterClk();
      createChromeActionBtns();
    }
  }, [skillName]);

  return <svg className="laptop_svg"></svg>;
};

export default LaptopSVG;
