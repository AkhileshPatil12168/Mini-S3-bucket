import React, { useContext, useState } from "react";
import { LoginContext } from "../../Context/loginContext";
import { Form } from "react-router-dom";
import axios from "axios";

const ContactPage = () => {
  const { whoLogedIn } = useContext(LoginContext);
  const [data, setData] = useState(null);
  const [successfull, setsuccessfull] = useState("Send Message");
  const [responseMessage, setResponseMessage] = useState(null);
  const [color, setColor] = useState("bg-yellow-400 hover:bg-yellow-500");

  const handleChanges = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data)
  };

  function changeText() {
    setsuccessfull("Send Successfully");
    setColor("bg-green-400");

    setTimeout(() => {
      setsuccessfull("Send Message");
      setColor("bg-yellow-400 hover:bg-yellow-600");
      setData(null);
    }, 2000);
  }

  const sendMessage = async (e) => {
    try {
      const formData = new FormData();

      e.preventDefault();
      if (whoLogedIn) formData.append("userId", whoLogedIn.id);
      for (let key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(process.env.BACKENDAPI + "/contactus", formData, {
        withCredentials: true,
      });
      if (response.status == 200) changeText();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="max-w-md mx-auto">
          <p className="mb-4">
            Feel free to reach out to us with any questions, feedback, or inquiries. We're here to
            help!
          </p>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:minis3bucket@gmail.com" className="text-yellow-500">
              minis3bucket@gmail.com
            </a>
          </p>
          <p className="mb-4">Phone: xxx-xxx-xxxx</p>
          <p className="mb-4 text-red-500 text-center">Please do not spam.</p>
          <form className="space-y-4" method="POST">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={handleChanges}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChanges}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Your Subject"
                onChange={handleChanges}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                onChange={handleChanges}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={sendMessage}
              className={`w-full ${color} text-white  py-2 rounded-md  transition-colors duration-300`}
            >
              {successfull}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
