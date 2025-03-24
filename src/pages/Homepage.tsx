import Layout from "../Layout";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center mt-2 lg:mt-5">
        <TypeAnimation
          sequence={[
            "Frontend Developer.",
            1500,
            "Creating smooth UIs.",
            1500,
            "Writing clean code.",
            1500,
          ]}
          speed={40}
          style={{
            fontSize: "2.4rem",
            fontWeight: 700,
            marginBottom: "1rem",
            whiteSpace: "nowrap",
          }}
          repeat={Infinity}
        />

        <p className="text-xl text-gray-500 max-w-xl">
          I specialize in designing and developing intuitive, high-performance web applications.
        </p>
      </div>
      <div className="w-full mt-5 md:mt-5 lg:mt-5">
        <Layout />
      </div>
    </div>
  );
};

export default Homepage;
