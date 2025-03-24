import React from "react";
import experience from "../assets/experience.png";
import pic from "../assets/mee.png";
import education from "../assets/education.png";
import arrow from "../assets/arrow.png";

const About = () => {
  function onNextClk() { }

  return (
    <>
      <section className="mt-1" id="about">
        <p className="section__text__p1">Get To Know More</p>
        <h1 className="title">About Me</h1>
        <div className="section-container">
          <div className="section__pic-container">
            <img src={pic} style={{ objectFit: "contain" }} alt="Profile picture" className="about-pic" />
          </div>
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img src={experience} alt="Experience icon" className="icon" />
                <h3>Experience</h3>
                <p>
                  3 years <br />
                </p>
              </div>
              <div className="details-container">
                <img src={education} alt="Education icon" className="icon" />
                <h3>Education</h3>
                <p>B.E Bachelors Degree</p>
              </div>
            </div>
            <div className="text-container">
              <p>
                As a Senior Software Engineer specializing in frontend development, I bring expertise in Angular 11+, Electron, Node, React
                and React native. I excel in building scalable solutions with desktop App, while also driving innovation through modern
                architectures. Passionate about mentoring developers, optimizing performance, and delivering production-grade applications
                that meet business goals.
              </p>
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

export default About;
