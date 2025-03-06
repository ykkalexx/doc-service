import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
      <p className="mb-4">
        We would love to hear from you! Please reach out with any questions or
        feedback.
      </p>
      <form className="w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-lg"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
