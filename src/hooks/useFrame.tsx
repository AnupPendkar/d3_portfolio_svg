import React from "react";
import * as d3 from "d3";
import { d3SelectionBase } from "../models";
import angular from "../assets/angular.svg";
import react from "../assets/react.svg";
import node from "../assets/node.svg";
import desktop from "../assets/desktop.png";
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
      .attr("height", 252)
      .attr(
        "xlink:href",
        skillName === "js" ? js : skillName === "react" ? react : desktop
      );
  }

  function updateFrame(skillName: string) {
    d3.select(".def__img").attr(
      "xlink:href",
      skillName === "js" ? js : skillName === "react" ? react : angular
    );
  }

  return {
    createFrame,
    updateFrame,
  };
};

export default useFrame;
