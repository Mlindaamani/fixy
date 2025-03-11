import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

export const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const mapChart = echarts.init(document.getElementById("locationMap"));
    const mapOption = {
      animation: false,
      bmap: {
        center: [-122.4194, 37.7749],
        zoom: 12,
        roam: true,
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "bmap",
          data: [["-122.4194", "37.7749", 100]],
          symbolSize: 20,
          itemStyle: {
            color: "#4F46E5",
          },
        },
      ],
    };
    mapChart.setOption(mapOption);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mapChart.dispose();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  const faqItems = [
    {
      question: "What are your business hours?",
      answer:
        "Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM PST. Emergency support is available 24/7.",
    },
    {
      question: "How quickly can I expect a response?",
      answer:
        "We aim to respond to all inquiries within 2 business hours during regular business hours. Emergency requests are handled immediately.",
    },
    {
      question: "Do you offer emergency support?",
      answer:
        "Yes, we provide 24/7 emergency support for urgent matters. Our emergency hotline is always available at 1-800-EMERGENCY.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, bank transfers, and digital wallets. All payments are processed securely.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-tools text-3xl text-indigo-600 mr-2"></i>
              <span className="text-2xl font-bold text-gray-800">
                RepairPro
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                How It Works
              </a>
              <a
                href="https://readdy.ai/home/a69c032c-c222-4d02-8907-58beb7bee794/3438f6b0-2c6e-4a2b-a991-502723e7bee8"
                data-readdy="true"
                className="text-gray-600 hover:text-indigo-600"
              >
                Professionals
              </a>
              <a href="#" className="text-indigo-600 font-semibold">
                Contact
              </a>
              <button className="!rounded-button bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">
                Get Started
              </button>
            </div>
            <button className="md:hidden text-gray-600">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              We're here to help and answer any questions you might have
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-phone-alt text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-4">
                Available Mon-Fri, 9am-6pm PST
              </p>
              <p className="text-indigo-600 font-semibold">+1 (800) 123-4567</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-envelope text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Email Support</h3>
              <p className="text-gray-600 mb-4">24/7 Email Support</p>
              <p className="text-indigo-600 font-semibold">
                support@repairpro.com
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-map-marker-alt text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Office Location</h3>
              <p className="text-gray-600 mb-4">San Francisco Headquarters</p>
              <p className="text-indigo-600 font-semibold">
                123 Market St, SF, CA 94105
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-none text-sm"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border-none text-sm"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border-none text-sm cursor-pointer"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border-none text-sm h-32"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>
                <button className="!rounded-button w-full bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">
                  Send Message
                </button>
              </form>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div
                id="locationMap"
                className="w-full h-[400px] rounded-lg"
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((faq, index) => (
                <div key={index} className="mb-4">
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <span className="font-medium">{faq.question}</span>
                    <i
                      className={`fas fa-chevron-down transition-transform ${
                        activeFaq === index ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 bg-gray-50 mt-2 rounded-lg">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-xl shadow-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Emergency Support?</h2>
            <p className="text-xl mb-6">
              Our emergency support team is available 24/7
            </p>
            <div className="flex justify-center space-x-4">
              <button className="!rounded-button bg-white text-indigo-600 px-8 py-3 hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                <i className="fas fa-phone-alt mr-2"></i>
                Call Now
              </button>
              <button className="!rounded-button bg-indigo-500 text-white px-8 py-3 hover:bg-indigo-400 transition-colors whitespace-nowrap cursor-pointer">
                <i className="fas fa-comment-alt mr-2"></i>
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-2xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              We'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="!rounded-button bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
