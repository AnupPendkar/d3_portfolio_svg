import React from "react";
import * as d3 from "d3";
import { d3SelectionBase } from "../models";
import angular from "../assets/angular.svg";
import react from "../assets/react.svg";
import node from "../assets/node.svg";
import desktop from "../assets/desktopc.png";
import chromeBar from "../assets/chrome_bar.png";
import chromeTab from "../assets/chrome_tab.png";
import js from "../assets/js.png";

const useFrame = () => {
  function createFrame(parentScreenRef: d3SelectionBase, skillName: string) {
    const defs = parentScreenRef
      .append("defs")
      .append("g")
      .attr("id", "myCustomShape")
      .attr("class", "frame__group");

    defs
      .append("image")
      .attr("class", "def__img")
      .attr("width", 407)
      .attr("height", 251)
      .attr("xlink:href", getIconBySkillName(skillName)?.icon);
  }

  function getIconBySkillName(skillName: string) {
    switch (skillName) {
      case "angular":
        return { icon: angular, name: "Angular" };

      case "react":
        return { icon: react, name: "React" };

      case "js":
        return { icon: js, name: "Javascript" };

      case "nodeJs":
        return { icon: node, name: "Node Js" };

      default:
        return { icon: desktop, name: "Desktop" };
    }
  }

  function createChromeFrame() {
    const defs = d3.select(".frame__group");

    const chrome_bar = d3.select(".chrome_bar")?.empty();
    if (!chrome_bar) {
      return;
    }

    defs
      .append("image")
      .attr("class", "chrome_bar")
      .attr("width", 407)
      .attr("xlink:href", chromeBar);

    const chromeBarGr = defs.append("g");

    chromeBarGr
      .append("image")
      .attr("class", "chrome_tab")
      .attr("width", 76)
      .attr("xlink:href", chromeTab);

    chromeBarGr
      .append("image")
      .attr("class", "skill_icon")
      .attr("width", 7)
      .attr("height", 5)
      .attr("transform", "translate(5, 3)")
      .attr("xlink:href", angular);

    chromeBarGr
      .append("text")
      .attr("class", "chrome_tab_text")
      .attr("x", 0)
      .attr("transform", "translate(14, 7)")
      .style("fill", "white")
      .style("font-size", 5);
  }

  function updateFrame(skillName: string) {
    createChromeFrame();

    d3.select(".def__img")
      .attr("transform", "translate(0, 24)")
      .attr("height", 242)
      .attr("xlink:href", getIconBySkillName(skillName)?.icon);

    d3.select(".skill_icon").attr(
      "xlink:href",
      getIconBySkillName(skillName)?.icon
    );

    d3.select(".chrome_tab_text").text(getIconBySkillName(skillName)?.name);
  }

  return {
    createFrame,
    updateFrame,
  };
};

export default useFrame;
