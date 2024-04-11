import React from "react";
import checkmark from "../assets/checkmark.png";
import arrow from "../assets/arrow.png";

const Experience = () => {
  const frontendSkills = [
    {
      name: "HTML",
      experience: "Experienced",
    },
    {
      name: "CSS",
      experience: "Experienced",
    },
    {
      name: "Sass",
      experience: "Experienced",
    },
    {
      name: "Javascipt",
      experience: "Experienced",
    },
    {
      name: "TypeScript",
      experience: "Intermediate",
    },
    {
      name: "React Js",
      experience: "Intermediate",
    },
    {
      name: "Angular",
      experience: "Intermediate",
    },
    {
      name: "Electron Js",
      experience: "Basic",
    },
  ];

  const backendSkills = [
    {
      name: "Node Js",
      experience: "Intermediate",
    },
    {
      name: "Express Js",
      experience: "Intermediate",
    },
    {
      name: "PostgreSQL",
      experience: "Basic",
    },
    {
      name: "Git",
      experience: "Intermediate",
    },
    {
      name: "Redis",
      experience: "Basic",
    },
    // {
    //   name: "",
    //   experience: "",
    // },
  ];

  function onNextClk() {}

  return (
    <>
      <section id="experience">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Experience</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container">
              <h2 className="experience-sub-title">Frontend Development</h2>
              <div className="article-container">
                {frontendSkills?.map((skill, idx) => (
                  <article key={idx}>
                    <img
                      src={checkmark}
                      alt="Experience icon"
                      className="icon"
                    />
                    <div>
                      <h3>{skill?.name}</h3>
                      <p>{skill?.experience}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="details-container">
              <h2 className="experience-sub-title">Backend Development</h2>
              <div className="article-container">
                {backendSkills?.map((skill, idx) => (
                  <article key={idx}>
                    <img
                      src={checkmark}
                      alt="Experience icon"
                      className="icon"
                    />
                    <div>
                      <h3>{skill?.name}</h3>
                      <p>{skill?.experience}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img
          src={arrow}
          alt="Arrow icon"
          className="icon arrow"
          onClick={onNextClk}
        />
      </section>
    </>
  );
};

export default Experience;
