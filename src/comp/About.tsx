import React from "react";
import experience from "../assets/experience.png";
import pic from "../assets/me.png";
import education from "../assets/education.png";
import arrow from "../assets/arrow.png";

const About = () => {
  function onNextClk() {}

  return (
    <>
      <section className="mt-10" id="about">
        <p className="section__text__p1">Get To Know More</p>
        <h1 className="title">About Me</h1>
        <div className="section-container">
          <div className="section__pic-container">
            <img src={pic} alt="Profile picture" className="about-pic" />
          </div>
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img src={experience} alt="Experience icon" className="icon" />
                <h3>Experience</h3>
                <p>
                  1.5+ years <br />
                  Frontend + Backend Development
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
                Experienced frontend developer proficient in React.js and
                Angular, with a successful history of leading projects through
                migrations. Strong focus on delivering optimal user experiences.
                Ready to contribute expertise to innovative endeavors
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
