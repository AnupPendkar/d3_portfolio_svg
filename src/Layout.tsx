import React from "react";
import useDeskSvg from "./hooks/useDeskSvg";
import useLaptopSvg from "./hooks/useLaptop";
import * as d3 from "d3";
import DeskPersonSVG from "./components/DeskPersonSVG";
import LaptopSVG from "./components/LaptopSVG";

const Layout = () => {
  const [skillName, setSkillName] = React.useState("");
  const { initDeskSvg } = useDeskSvg(onPosterClk);
  const { initLaptopSvg } = useLaptopSvg(skillName);

  function onPosterClk(skillName: string) {
    setSkillName(skillName);
  }

  React.useEffect(() => {
    // d3.select(".layout").remove();
    // d3.select(".lay").append("g").attr("class", "layout");

    // if (!d3.select(".svg_group").empty()) {
    //   d3.select(".svg_group")?.remove();
    // }
    // if (!d3.select(".laptop_svg_group").empty()) {
    //   d3.select(".laptop_svg_group")?.remove();
    // }

    // initDeskSvg();
    // initLaptopSvg();
  }, []);

  React.useEffect(() => {});

  return (
    <svg className="layout h-full w-screen">
      <g className="layout_group">
        <DeskPersonSVG onPosterClk={onPosterClk} />
        <LaptopSVG skillName={skillName} />
      </g>
    </svg>
  );
};

export default Layout;
