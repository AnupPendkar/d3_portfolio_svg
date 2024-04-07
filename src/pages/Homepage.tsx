import React from "react";
import Layout from "../Layout";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center sm:items-center mt-[40px] lg:translate-y-10 w-[80vw]">
          <TypeAnimation
            sequence={[
              "I'm Frontend Developer.",
              1500,
              "I'm Backend Developer.",
              1500,
              // "Created Desktop Apps.",
              // 1500,
            ]}
            speed={30}
            style={{
              textWrap: "wrap",
              fontSize: "3rem",
              lineHeight: 1,
              fontWeight: 700,
              // textAlign: "center",
              marginBottom: "1rem",
            }}
            repeat={Infinity}
          />
          <p className="text-2xl text-[#B1A596]">
            I design and code beautifully simple things, and I love what I do.
          </p>
        </div>
      </div>
      <div className="w-full">
        <Layout />
      </div>
      {/* <div className="flex flex-col justify-center items-center mt-[80px] px-[30px] w-fit md:px-[100px] py-8">
        <h2 className="text-3xl font-bold text-center mb-4">About me</h2>
        <UserProfile />
      </div>

      <div className="mt-[150px]">
        <Projects />
      </div>

      <Footer /> */}
    </div>
  );
};

export default Homepage;
