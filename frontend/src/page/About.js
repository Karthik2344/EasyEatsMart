import React from "react";
import Footer from "../components/Footer";
import img1 from "../assets/Faces/img1.png";
import img2 from "../assets/Faces/img2.png";
import img3 from "../assets/Faces/img3.png";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-600 mb-6">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-600 mb-4">Our Company</h2>
          <p className="text-lg mb-4">
            Welcome to EasyEatSmart, where convenience meets culinary excellence. We pride ourselves on providing a seamless food ordering experience that caters to your taste buds and lifestyle.
          </p>
          <h2 className="text-2xl font-semibold text-slate-600 mb-4">Our Mission</h2>
          <p className="text-lg text-slate-600 mb-4">
            At EasyEatSmart, our mission is simple: to redefine the way you eat. We believe that enjoying delicious, high-quality meals shouldn't be a hassle. That's why we've curated a diverse menu of mouthwatering options, from wholesome classics to innovative gourmet creations.
          </p>
        </div>
        <div>
          <h2 className="text-2xl text-slate-600 font-semibold mb-4">Our Team</h2>
          <div className="flex space-x-4 mb-4">
            <div>
              <img
                src={img1}
                alt="Team Member"
                className="rounded-full w-24 h-24"
              />
              <p className="text-lg font-semibold mt-2">John</p>
              <p>CEO</p>
            </div>
            <div>
              <img
                src={img3}
                alt="Team Member"
                className="rounded-full w-24 h-24"
              />
              <p className="text-lg font-semibold mt-2">Jane</p>
              <p>COO</p>
            </div>
            <div>
              <img
                src={img2}
                alt="Team Member"
                className="rounded-full w-24 h-24"
              />
              <p className="text-lg font-semibold mt-2">David</p>
              <p>CFO</p>
            </div>
          </div>
          <h2 className="text-2xl text-slate-600 font-semibold mb-4">Join Us Today</h2>
          <p className="text-lg">
            Experience the ease and joy of eating smart with EasyEatSmart. Whether you're a busy professional, a health enthusiast, or a food lover, we invite you to discover a world of delicious possibilities with us.
            <br/>Thank you for choosing EasyEatSmart – where convenience meets culinary delight!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
