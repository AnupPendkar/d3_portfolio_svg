import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import DeskPersonSVG from "./components/DeskPersonSVG";
import LaptopSVG from "./components/LaptopSVG";
import close from "./assets/close.svg";
// import help from "./assets/help.svg";
import { useTheme } from "./ThemeContext";

const CONTAINER_COLORS = {
  dark: {
    bg: "#121212",
    svgBg: "#1e1e1e",
    buttonBg: "#333333",
    buttonHover: "#444444",
    text: "#e0e0e0",
    secondaryText: "#b0b0b0",
    cardBg: "#252525",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
  },
  light: {
    bg: "#f5f5f5",
    svgBg: "#ffffff",
    buttonBg: "#ffffff",
    buttonHover: "#f0f0f0",
    text: "#333333",
    secondaryText: "#555555",
    cardBg: "#ffffff",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
};

const Layout = () => {
  const [skillName, setSkillName] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const { theme } = useTheme();

  const onPosterClick = (skillName: string) => {
    setSkillName(skillName);
  };

  useEffect(() => {
    if (!svgRef.current || !groupRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(groupRef.current);

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .translateExtent([
        [-100, -100],
        [window.innerWidth + 100, window.innerHeight + 100],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);
  }, []);

  return (
    <div 
      className="relative w-screen h-[800px] overflow-hidden"
      style={{ 
        backgroundColor: CONTAINER_COLORS[theme].bg,
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          ref={svgRef} 
          className="h-full md:max-h-[600px] lg:max-h-[600px] w-full"
          style={{
            backgroundColor: CONTAINER_COLORS[theme].svgBg,
            transition: 'background-color 0.3s ease',
            borderRadius: "8px",
            boxShadow: CONTAINER_COLORS[theme].shadow
          }}
        >
          <g ref={groupRef} className="layout_group">
            <DeskPersonSVG onPosterClk={onPosterClick} />
            <LaptopSVG skillName={skillName} />
          </g>
        </svg>
      </div>

      {showTutorial && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            transition: 'background-color 0.3s ease'
          }}
        >
          <div 
            className="p-6 rounded-lg max-w-sm text-center"
            style={{
              backgroundColor: CONTAINER_COLORS[theme].cardBg,
              color: CONTAINER_COLORS[theme].text,
              boxShadow: CONTAINER_COLORS[theme].shadow,
              transition: 'all 0.3s ease'
            }}
          >
            <p className="text-xl font-semibold mb-3">How to Navigate</p>
            <ul 
              className="space-y-2 text-left pl-4"
              style={{ color: CONTAINER_COLORS[theme].secondaryText }}
            >
              <li>🔍 <strong>Scroll</strong> to Zoom</li>
              <li>✋ <strong>Drag</strong> to Pan</li>
              <li>🖱️ <strong>Click</strong> on Skills to View</li>
            </ul>
            <button
              className="mt-4 px-5 py-2 rounded-lg shadow-md transition-all"
              style={{
                backgroundColor: theme === 'dark' ? '#3a4750' : '#2563eb',
                color: '#ffffff'
              }}
              onClick={() => setShowTutorial(false)}
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}

      {!showTutorial && (
        <button
          onClick={() => setShowTutorial(true)}
          className="absolute top-4 right-5 z-50 p-2 rounded-full shadow-md transition"
          style={{
            backgroundColor: CONTAINER_COLORS[theme].buttonBg,
            boxShadow: CONTAINER_COLORS[theme].shadow
          }}
        >
          <img 
            src={close} 
            alt="Show help" 
            className="w-6 h-6"
            style={{
              filter: theme === 'dark' ? 'invert(90%)' : 'none'
            }}
          />
        </button>
      )}
    </div>
  );
};

export default Layout;