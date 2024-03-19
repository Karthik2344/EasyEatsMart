import React from "react";
import { contactConfig } from "./content_option";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-5 mt-3">
        <h1 className="text-4xl mb-4 text-slate-800">Contact Us</h1>
        <hr className="border-t-2 border-black my-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="mb-5">
          <h3 className="text-xl font-bold mb-4 text-slate-800">Get in touch</h3>
          <address className="leading-relaxed">
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />
            {contactConfig.hasOwnProperty("YOUR_FONE") && (
              <p>
                <strong>Phone:</strong> {contactConfig.YOUR_FONE}
              </p>
            )}
          </address>
          <p className="mt-4">{contactConfig.description}</p>
        </div>
        <div className="d-flex align-items-center">
          <form className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="form-group py-2">
                <input
                  className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:border-black focus:outline-none"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                />
              </div>
              <div className="form-group py-2">
                <input
                  className="form-input w-full px-4 py-2 rounded border border-gray-400 focus:border-black focus:outline-none"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
            </div>
            <textarea
              className="form-textarea w-full px-4 py-2 rounded border border-gray-400 focus:border-black focus:outline-none"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              required
            ></textarea>
            <div className="text-center mt-4">
              <button className="btn bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
