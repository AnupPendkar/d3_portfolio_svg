import React from "react";
import * as d3 from "d3";
import desk from "./assets/desk.svg";
import angular from "./assets/angular.svg";
import react from "./assets/react.svg";
import node from "./assets/node.svg";
import js from "./assets/js.png";
import { d3SelectionBase } from "./models";

const Layout = () => {
  const svgW = 1200;
  const svgH = 800;

  const w = React.useRef(600);
  const h = React.useRef(600);

  let parentImgStartCoord;

  const parentImgX = React.useRef(0);
  const parentImgY = React.useRef(0);

  let parentSvgRef: d3SelectionBase;
  let parentImgRef: d3SelectionBase;

  const deskCardCollections: d3SelectionBase[] = [];

  function createDeskCard(
    width: number,
    height: number,
    img: string,
    x: number,
    y: number,
    rotate: number = 0
  ) {
    const group = parentSvgRef
      .append("g")
      .attr("class", "desk_card_group")
      .datum({ x, y, rotate })
      .attr("width", width)
      .attr("height", height)
      .attr(
        "transform",
        `translate(${x + parentImgX.current}, ${
          y + parentImgY.current
        }) rotate(${rotate})`
      )
      .style("pointer-events", "all");

    const rect = group
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("box-shadow", "1px 9px 20px 6px #1a1a1a")
      .style("border-radius", "7")
      .attr("fill", "#596371")
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

    deskCardCollections.push(group);
  }

  function setDeskCardWidthHeight(x: number, y: number) {
    deskCardCollections.forEach((val) => {
      const b = val?.["_groups"]?.[0]?.[0]?.__data__;
      val.attr(
        "transform",
        `translate(${b?.x + x + parentImgX.current}, ${
          b?.y + y + parentImgY.current
        }) rotate(${b?.rotate})`
      );
    });
  }

  function handleDrag(x: number, y: number) {
    const newX = parentImgStartCoord?.x + x;
    const newY = parentImgStartCoord?.y + y;
    // Update the position of the dragged element
    parentImgRef.attr("x", newX).attr("y", newY);
    setDeskCardWidthHeight(newX, newY);
  }

  function createParentSvg() {
    const layout = d3.select(".layout").style("width", "100%");

    parentSvgRef = layout
      .append("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
      .attr("width", svgW)
      .attr("height", svgH)
      .attr("viewBox", `0 0 ${svgW} ${svgH}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .style("background-color", "transparent")
      .style("border-radius", "inherit");
  }

  function createParentImg() {
    parentImgRef = parentSvgRef
      .append("image")
      .attr("x", parentImgX.current)
      .attr("y", parentImgY.current)
      .attr("width", w.current)
      .attr("height", h.current)
      .attr("xlink:href", desk)
      .attr("pointer-events", "all")
      .style("pointer-events", "all");

    let initialCoord;
    parentImgRef.call(
      d3
        .drag()
        .on("start", (e) => {
          parentImgStartCoord = {
            x: +parentImgRef?.attr("x"),
            y: +parentImgRef?.attr("y"),
          };
          initialCoord = { x: e?.x, y: e?.y };
        })
        .on("drag", (e) => {
          // console.log(parentImgRef?.x)
          handleDrag(e?.x - initialCoord?.x, e?.y - initialCoord?.y);
        })
    );
  }

  function createCardOverlays() {
    createDeskCard(67, 98, angular, 128, 3);
    createDeskCard(70, 98, react, 200, 3);

    createDeskCard(67, 98, node, 287, 3);
    createDeskCard(67, 98, js, 358, 3);

    createDeskCard(30, 30, js, 153, 176, -14);
    createDeskCard(30, 35, js, 189, 198, 44);

    createDeskCard(30, 30, js, 354, 164, -3);
    createDeskCard(30, 35, js, 390, 168, 1);

    createDeskCard(32, 45, js, 381, 212, 3.5);
  }

  function onInit() {
    createParentSvg();
    createParentImg();
    createCardOverlays();
  }

  React.useEffect(() => {
    onInit();
  }, []);

  return <div className="layout"></div>;
};

export default Layout;
