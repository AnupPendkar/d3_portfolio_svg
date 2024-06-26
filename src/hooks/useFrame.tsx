import React from "react";
import * as d3 from "d3";
import { d3SelectionBase } from "../models";
import angular from "../assets/angular.svg";
import react from "../assets/react.svg";
import node from "../assets/node.svg";
import docker from "../assets/docker.svg";
import redis from "../assets/redis.svg";
import postgres from "../assets/postgres.svg";
import ts from "../assets/typescript.svg";
import electronJs from "../assets/electronJs.svg";
import express from "../assets/express.svg";
import desktop from "../assets/desktopc.png";
import chromeBar from "../assets/chrome_bar.png";
import chromeTab from "../assets/chrome_tab.png";
import js from "../assets/js.svg";
import git from "../assets/git.svg";
import tailwind from "../assets/tailwind.svg";
import materialUI from "../assets/materialUI.svg";

const useFrame = () => {
  function createFrame(parentScreenRef: d3SelectionBase) {
    const defs = parentScreenRef
      .append("defs")
      .append("g")
      .attr("id", "myCustomShape")
      .attr("class", "frame__group");

    defs
      .append("image")
      .attr("class", "desktop__img")
      .attr("width", 407)
      .attr("height", 251)
      .attr("xlink:href", desktop);
  }

  function getIconBySkillName(skillName: string) {
    switch (skillName) {
      case "angular":
        return { icon: angular, name: "Angular" };

      case "react":
        return { icon: react, name: "React" };

      case "js":
        return { icon: js, name: "Javascript" };

      case "express":
        return { icon: express, name: "Express Js" };

      case "nodeJs":
        return { icon: node, name: "Node Js" };

      case "electronJs":
        return { icon: electronJs, name: "Electron Js" };

      case "tailwind":
        return { icon: tailwind, name: "Tailwind" };

      case "docker":
        return { icon: docker, name: "Docker" };

      case "materialUI":
        return { icon: materialUI, name: "Material UI" };

      case "git":
        return { icon: git, name: "Git" };

      case "redis":
        return { icon: redis, name: "Redis" };

      case "postgres":
        return { icon: postgres, name: "Postgres" };

      case "ts":
        return { icon: ts, name: "Typescript" };

      default:
        return { icon: desktop, name: "Desktop" };
    }
  }

  function createChromeFrame(skillName: string) {
    const defs = d3.select(".frame__group");

    const chrome_bar = d3.select(".chrome__img")?.empty();

    if (!chrome_bar) {
      d3.select(".chrome__img")
        .attr("height", 210)
        .attr("xlink:href", getIconBySkillName(skillName)?.icon);

      d3.select(".skill_icon").attr(
        "xlink:href",
        getIconBySkillName(skillName)?.icon
      );

      d3.select(".chrome_tab_text").text(getIconBySkillName(skillName)?.name);
      return;
    }

    const chromeGroup = defs.append("g").attr("class", "chrome__group");

    chromeGroup
      .append("rect")
      .attr("width", 407)
      .attr("height", 242)
      .attr("transform", "translate(0, 24)")
      .style("pointer-events", "visible")
      .attr("fill", "white");

    chromeGroup
      .append("image")
      .attr("class", "chrome__img")
      .attr("width", 390)
      .attr("height", 210)
      .attr("transform", "translate(0, 24)")
      .style("pointer-events", "visible")
      .attr("xlink:href", getIconBySkillName(skillName)?.icon);

    chromeGroup
      .append("image")
      .attr("class", "chrome__bar")
      .attr("width", 407)
      .style("pointer-events", "visible")
      .attr("xlink:href", chromeBar);

    const chromeBarGr = chromeGroup.append("g");

    chromeBarGr
      .append("image")
      .attr("class", "chrome_tab")
      .attr("width", 76)
      .style("pointer-events", "visible")
      .attr("xlink:href", chromeTab);

    chromeBarGr
      .append("image")
      .attr("class", "skill_icon")
      .attr("width", 7)
      .attr("height", 5)
      .attr("transform", "translate(5, 3)")
      .style("pointer-events", "visible")
      .attr("xlink:href", getIconBySkillName(skillName)?.icon);

    chromeBarGr
      .append("text")
      .attr("class", "chrome_tab_text")
      .attr("x", 0)
      .attr("transform", "translate(14, 7)")
      .style("fill", "white")
      .style("pointer-events", "visible")
      .style("font-size", 5)
      .text(getIconBySkillName(skillName)?.name);
  }

  function updateFrame(skillName: string) {
    createChromeFrame(skillName);
  }

  return {
    createFrame,
    updateFrame,
  };
};

export default useFrame;
