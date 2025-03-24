import React from "react";
import arrow from "../assets/arrow.png";
import blogAppProject from "../assets/blog_app_project.png";
import warehouseProject from "../assets/warehouse.png";
import dataCapture from "../assets/data_capture.png";
import fitnessTracker from "../assets/fitness_tracker.png";
import { Lightbox } from "react-modal-image";

interface IProjectMetatData {
  name: string;
  imgSrc: string;
  gitUrl: string;
  liveDemoUrl: string;
  hasUrl: boolean;
}

const Projects = () => {
  const [modalImg, setModalImg] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");

  const onOpenImgInModal = (project: IProjectMetatData) => {
    setModalImg(project?.imgSrc);
    setModalTitle(project?.name);
  };

  const projectMetaData: IProjectMetatData[] = [
    {
      name: "Warehouse Layout Visualizer",
      imgSrc: warehouseProject,
      gitUrl: "",
      liveDemoUrl: "",
      hasUrl: false,
    },
    {
      name: "StoryHaven",
      imgSrc: blogAppProject,
      gitUrl: "https://github.com/AnupPendkar/blog_app",
      liveDemoUrl: "https://storyhavenblog.onrender.com/#/homepage",
      hasUrl: true,
    },
    {
      name: "RTSP CCTV Stream Capture & Monitoring Desktop App",
      imgSrc: dataCapture,
      gitUrl: "",
      liveDemoUrl: "",
      hasUrl: false,
    },
    {
      name: "Fitness Tracker App",
      imgSrc: fitnessTracker,
      gitUrl: "",
      liveDemoUrl: "",
      hasUrl: false,
    },
  ];

  function onUrlClk(url: string) {
    window.open(url, "_blank");
  }

  function onNextClk() {}

  return (
    <>
      <section id="projects">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">Projects</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            {projectMetaData?.map((project, idx) => (
              <div key={idx} className="details-container color-container">
                <div
                  onClick={() => onOpenImgInModal(project)}
                  className="article-container cursor-pointer"
                >
                  <img
                  style={{width: "272px", height: "130px", objectFit: "contain"}}
                    src={project?.imgSrc}
                    alt={project?.name}
                    className="project-img"
                  />
                </div>
                <h2 className="experience-sub-title project-title">
                  {project?.name}
                </h2>
                {project?.hasUrl && (
                  <div className="btn-container">
                    <button
                      className="btn btn-color-2 project-btn"
                      onClick={() => onUrlClk(project?.gitUrl)}
                    >
                      Github
                    </button>
                    <button
                      className="btn btn-color-2 project-btn"
                      onClick={() => onUrlClk(project?.liveDemoUrl)}
                    >
                      Live Demo
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <img
          src={arrow}
          alt="Arrow icon"
          className="icon arrow"
          onClick={onNextClk}
        />
      </section>

      {modalImg !== "" && (
        <Lightbox
          medium={modalImg}
          large={modalImg}
          small={modalImg}
          showRotate={true}
          alt={modalTitle}
          onClose={() => setModalImg("")}
        />
      )}
    </>
  );
};

export default Projects;
