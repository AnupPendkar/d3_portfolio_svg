import React from "react";
import useDeskSvg from "./hooks/useDeskSvg";

const Layout = () => {
  const { initDeskSvg } = useDeskSvg();

  React.useEffect(() => {
    initDeskSvg();
  }, []);

  return <div className="layout"></div>;
};

export default Layout;
