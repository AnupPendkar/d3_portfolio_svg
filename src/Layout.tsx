import React from "react";
import useDeskSvg from "./hooks/useDeskSvg";
import useLaptopSvg from "./hooks/useLaptop";

const Layout = () => {
  const [skillName, setSkillName] = React.useState('');
  const { initDeskSvg } = useDeskSvg(onPosterClk);
  const { initLaptopSvg } = useLaptopSvg(skillName);

  function onPosterClk(skillName: string){
    setSkillName(skillName);
  }
  

  React.useEffect(() => {
    initDeskSvg();
    initLaptopSvg();
  }, []);

  return <div className="layout flex"></div>;
};

export default Layout;
