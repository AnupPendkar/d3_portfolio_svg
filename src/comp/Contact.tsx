import React from "react";
import email from "../assets/email.png";
import linkedin from "../assets/linkedin.png";

const Contact = () => {
  return (
    <>
      <section id="contact">
        <p className="section__text__p1">Get in Touch</p>
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <img
              src={email}
              alt="Email icon"
              className="icon contact-icon email-icon"
            />
            <p>
              <a href="mailto:anuppendkar@gmail.com">anuppendkar@gmail.com</a>
            </p>
          </div>
          <div className="contact-info-container">
            <img
              src={linkedin}
              alt="LinkedIn icon"
              className="icon contact-icon"
            />
            <p>
              <a
                onClick={() =>
                  window.open("https://www.linkedin.com/in/anup-pendkar-8a9826196/", "_blank")
                }
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
