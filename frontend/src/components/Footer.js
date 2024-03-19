import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import {Link} from "react-router-dom";
import ContactUs from "../page/Contact";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2"><Link to={"contact"}>Contact Us</Link></h3>
            <p>Email: karthik@gmail.com</p>
            <p>Phone: +917032362829</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gray-400 ">
                <FaFacebookSquare size={28}/>
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-400">
                <FaXTwitter size={28}/>
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-400">
                <FaInstagram size={28}/>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-700" />
        <p className="text-sm text-gray-500">© 2024 EasyEatsMart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
