import React from "react";
import * as d3 from "d3";
import desk from "../assets/desk.svg";
import angular from "../assets/angular.svg";
import react from "../assets/react.svg";
import node from "../assets/node.svg";
import js from "../assets/js.png";
import { d3SelectionBase } from "../models";

const DeskPersonSVG = ({
  onPosterClk,
}: {
  onPosterClk: (skillName: string) => void;
}) => {
  const parentImgWidth = 600;
  const parentImgHeight = 600;
  const parentImgX = 0;
  const parentImgY = 0;

  let deskPersonSVGRef: d3SelectionBase;
  let posterSkillsGrRef: d3SelectionBase;

  function assignDeskPersonSVGAttr() {
    deskPersonSVGRef = d3
      .select(".desk_person_svg")
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

  function handleZoom(e) {
    posterSkillsGrRef.attr("transform", e.transform);
  }

  const zoomNPanEvent = d3
    .zoom<SVGSVGElement, any>()
    .scaleExtent([0.5, 1.5])
    .on("zoom", (e) => handleZoom(e));

  function getInitLayout() {
    if (window.innerWidth < 500) {
      return {
        width: (window.innerWidth - 360) / 2,
        height: 20,
        scale: 0.6,
      };
    } else if (window.innerWidth < 800) {
      return {
        width: (window.innerWidth - 450) / 2,
        height: 20,
        scale: 0.6,
      };
    } else if (window.innerWidth < 1000) {
      return {
        width: -20,
        height: (window.innerHeight - 600) / 2,
        scale: 0.7,
      };
    } else if (window.innerWidth < 1200) {
      return {
        width: 20,
        height: (window.innerHeight - 600) / 2,
        scale: 0.75,
      };
      // return { width: (window.innerWidth - 600) / 2, height: 20, scale: 0.7 };
    } else if (window.innerWidth < 1700) {
      return {
        width: -20,
        height: (window.innerHeight - 600) / 2,
        scale: 0.9,
      };
    } else {
      return {
        width: 100,
        height: (window.innerHeight - 650) / 2,
        scale: 1.1,
      };
    }
  }

  const initialScaleNTransform = d3.zoomIdentity
    .translate(getInitLayout()?.width, getInitLayout()?.height)
    .scale(getInitLayout()?.scale);

  function registerEvent() {
    deskPersonSVGRef
      .call(zoomNPanEvent)
      .call(zoomNPanEvent.transform, initialScaleNTransform)
      .on("dblclick.zoom", null);
  }

  function appendDeskPersonImageAndRegisterEvent() {
    posterSkillsGrRef = deskPersonSVGRef.append("g").attr("class", "svg_group");

    posterSkillsGrRef
      .append("image")
      .attr("x", parentImgX)
      .attr("y", parentImgY)
      .attr("width", parentImgWidth)
      .attr("height", parentImgHeight)
      .attr("xlink:href", desk)
      .attr("pointer-events", "all")
      .style("pointer-events", "all");

    registerEvent();
  }

  function createPosterCard(
    skillName: string,
    width: number,
    height: number,
    img: string,
    x: number,
    y: number,
    rotate: number = 0
  ) {
    const skillGroup = posterSkillsGrRef
      .append("g")
      .attr("class", `${skillName}_poster_group`)
      .datum({ x, y, rotate })
      .attr("width", width)
      .attr("height", height)
      .attr(
        "transform",
        `translate(${x + parentImgX}, ${y + parentImgY}) rotate(${rotate})`
      )
      .style("pointer-events", "all");

    const rect = skillGroup
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

    skillGroup
      .append("image")
      .attr("width", width - 15)
      .attr("height", height - 15)
      .attr("transform", "translate(7.5, 7.5)")
      .attr("xlink:href", img)
      .style("pointer-events", "none");
  }

  function createSkillPosterCardOverlays() {
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

  function initializeDeskPersonSvg() {
    assignDeskPersonSVGAttr();
    appendDeskPersonImageAndRegisterEvent();
    createSkillPosterCardOverlays();
  }

  React.useEffect(() => {
    initializeDeskPersonSvg();
  }, []);

  return <svg className="desk_person_svg"></svg>;
};

export default DeskPersonSVG;
