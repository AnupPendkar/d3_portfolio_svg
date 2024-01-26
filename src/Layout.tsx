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
    d3.select(".layout").remove();
    d3.select(".lay").append("g").attr("class", "layout");

    initDeskSvg();
    initLaptopSvg();
  }, []);

  React.useEffect(() => {});

  return <svg className="lay h-full w-screen"></svg>;
};

export default Layout;
