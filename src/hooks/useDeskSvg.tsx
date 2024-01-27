import React from "react";
import * as d3 from "d3";
import desk from "../assets/desk.svg";
import angular from "../assets/angular.svg";
import react from "../assets/react.svg";
import node from "../assets/node.svg";
import js from "../assets/js.png";
import { d3SelectionBase } from "../models";

const useDeskSvg = (onPosterClk: (skillName: string) => void) => {
  const parentImgWidth = 600;
  const parentImgHeight = 600;
  const parentImgX = 0;
  const parentImgY = 0;
  let parentSvgRef: d3SelectionBase;
  let parentGroupRef: d3SelectionBase;

  function createPosterCard(
    skillName: string,
    width: number,
    height: number,
    img: string,
    x: number,
    y: number,
    rotate: number = 0
  ) {
    const group = parentGroupRef
      .append("g")
      .attr("class", "desk_card_group")
      .datum({ x, y, rotate })
      .attr("width", width)
      .attr("height", height)
      .attr(
        "transform",
        `translate(${x + parentImgX}, ${y + parentImgY}) rotate(${rotate})`
      )
      .style("pointer-events", "all");

    const rect = group
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("box-shadow", "1px 9px 20px 6px #1a1a1a")
      .style("border-radius", "7")
      .attr("fill", "#596371")
      .on("click", () => {
        onPosterClk(skillName);
      })
      .on("mouseover", () => {
        rect.transition().duration(100).attr("fill", "#fff");
      })
      .on("mouseout", () => {
        rect.transition().duration(100).attr("fill", "#596371");
      });

    group
      .append("image")
      .attr("width", width - 15)
      .attr("height", height - 15)
      .attr("transform", "translate(7.5, 7.5)")
      .attr("xlink:href", img)
      .style("pointer-events", "none");
  }

  function createParentSvg() {
    const layout = d3.select(".layout").style("width", "100%").append("g");

    parentSvgRef = layout
      .append("svg")
      .attr("class", "desk_svg")
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

  function handleZoom(e) {
    parentGroupRef.attr("transform", e.transform);
  }

  const zoom = d3
    .zoom<SVGSVGElement, any>()
    .scaleExtent([0.5, 1.5])
    .on("zoom", (e) => handleZoom(e));

  const initialTransform = d3.zoomIdentity
    .translate(10, window.innerHeight - 800)
    .scale(1);

  function registerDragEvents() {
    parentSvgRef
      .call(zoom)
      .call(zoom.transform, initialTransform)
      .on("dblclick.zoom", null);
  }

  function createParentImg() {
    parentGroupRef = parentSvgRef.append("g").attr("class", "svg_group");

    parentGroupRef
      .append("image")
      .attr("x", parentImgX)
      .attr("y", parentImgY)
      .attr("width", parentImgWidth)
      .attr("height", parentImgHeight)
      .attr("xlink:href", desk)
      .attr("pointer-events", "all")
      .style("pointer-events", "all");

    registerDragEvents();
  }

  function createCardOverlays() {
    createPosterCard("angular", 67, 98, angular, 128, 3);
    createPosterCard("react", 70, 98, react, 200, 3);

    createPosterCard("nodeJs", 67, 98, node, 287, 3);
    createPosterCard("js", 67, 98, js, 358, 3);

    createPosterCard("js", 30, 30, js, 153, 176, -14);
    createPosterCard("js", 30, 35, js, 189, 198, 44);

    createPosterCard("js", 30, 30, js, 354, 164, -3);
    createPosterCard("js", 30, 35, js, 390, 168, 1);

    createPosterCard("js", 32, 45, js, 381, 212, 3.5);
  }

  function onInit() {
    createParentSvg();
    createParentImg();
    createCardOverlays();
  }

  return { initDeskSvg: onInit };
};

export default useDeskSvg;
