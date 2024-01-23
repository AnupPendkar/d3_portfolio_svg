import React from "react";
import * as d3 from "d3";
import desk from "./assets/desk.svg";
import angular from "./assets/angular.svg";
import react from "./assets/react.svg";
import node from "./assets/node.svg";
import js from "./assets/js.png";
import { d3SelectionBase } from "./models";

const Layout = () => {
  const w = React.useRef(600);
  const h = React.useRef(600);
  let svg: d3SelectionBase;

  function createDeskCard(
    width: number,
    height: number,
    img: string,
    transform: string
  ) {
    const group = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", transform)
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
  }

  function createParentSvg() {
    svg = d3
      .select(".layout")
      .append("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
      .attr("width", w.current)
      .attr("height", h.current)
      .attr("viewBox", `0 0 ${w.current} ${h.current}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .style("background-color", "transparent")
      .style("border-radius", "inherit");
  }

  function onInit() {
    createParentSvg();

    svg
      .append("image")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w.current)
      .attr("height", h.current)
      .attr("xlink:href", desk)
      .style("pointer-events", "none");

    createDeskCard(67, 98, angular, "translate(128, 3)");
    createDeskCard(70, 98, react, "translate(200, 3)");

    createDeskCard(67, 98, node, "translate(287, 3)");
    createDeskCard(67, 98, js, "translate(358, 3)");

    createDeskCard(30, 30, js, "translate(153, 176) rotate(-14)");
    createDeskCard(30, 35, js, "translate(189, 198) rotate(44)");

    createDeskCard(30, 30, js, "translate(354, 164) rotate(-3)");
    createDeskCard(30, 35, js, "translate(390, 168) rotate(1)");

    createDeskCard(32, 45, js, "translate(381, 212) rotate(3.5)");
  }

  React.useEffect(() => {
    onInit();
  }, []);

  return <div className="layout"></div>;
};

export default Layout;
