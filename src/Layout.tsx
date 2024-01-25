import React from "react";
import useDeskSvg from "./hooks/useDeskSvg";
import useLaptopSvg from "./hooks/useLaptop";
import * as d3 from "d3";

const Layout = () => {
  const [skillName, setSkillName] = React.useState("");
  const { initDeskSvg } = useDeskSvg(onPosterClk);
  const { initLaptopSvg } = useLaptopSvg(skillName);

  function onPosterClk(skillName: string) {
    setSkillName(skillName);
  }

  React.useEffect(() => {
    d3.select(".laptop_svg").remove();
    d3.select(".desk_svg").remove();

    initDeskSvg();
    initLaptopSvg();
  }, []);

  React.useEffect(() => {});

  return <div className="layout flex"></div>;
};

export default Layout;
