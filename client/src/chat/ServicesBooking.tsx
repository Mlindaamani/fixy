import React, { useState, useRef, useEffect } from "react";

export const ServicesBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Welcome to RepairPro! How can we help you today?",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      sender: "agent",
      text: "Hi, I'm Sarah, your customer service representative. Feel free to ask any questions about our services.",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      sender: "provider",
      text: "Hello, I'm Christopher Wilson, your assigned plumber. I'll be handling your repair request today.",
      timestamp: "10:02 AM",
      avatar:
        "https://public.readdy.ai/ai/img_res/6b3cd94ee6fa17d20ee4fa3a4b88aed9.jpg",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "user",
          text: newMessage.trim(),
          timestamp: currentTime,
        },
      ]);
      setNewMessage("");

      setTimeout(() => {
        const agentResponses = [
          "I'll check that for you right away.",
          "Thank you for your question. Let me help you with that.",
          "I understand your concern. Here's what we can do.",
          "We typically handle these situations promptly.",
          "I'd be happy to assist you with that request.",
        ];

        const providerResponses = [
          "Based on your description, I can fix this issue quickly.",
          "I've handled similar problems before. Let me explain the process.",
          "I'll bring the necessary tools for this repair.",
          "This is a common issue that I can resolve efficiently.",
          "I can be there within the scheduled time window.",
        ];

        const isProviderResponse = Math.random() > 0.5;
        const responses = isProviderResponse
          ? providerResponses
          : agentResponses;
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: isProviderResponse ? "provider" : "agent",
            text: randomResponse,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            avatar: isProviderResponse
              ? "https://readdy.ai/api/search-image?query=professional confident male plumber in uniform standing against clean modern background natural lighting professional headshot&width=200&height=200&seq=5&orientation=squarish"
              : undefined,
          },
        ]);
      }, 1000);
    }
  };
  const services = [
    {
      id: "plumbing",
      title: "Plumbing Services",
      description: "Professional plumbing repairs and installations",
      price: 85,
      image:
        "https://public.readdy.ai/ai/img_res/89abc6309edc3c53750c16632d134162.jpg",
    },
    {
      id: "electrical",
      title: "Electrical Services",
      description: "Expert electrical repairs and upgrades",
      price: 95,
      image:
        "https://public.readdy.ai/ai/img_res/fb6f359952252de325e15304a39ea342.jpg",
    },
    {
      id: "hvac",
      title: "HVAC Services",
      description: "Complete heating and cooling solutions",
      price: 110,
      image:
        "https://public.readdy.ai/ai/img_res/d72c977309271169e4951763c4386b59.jpg",
    },
    {
      id: "carpentry",
      title: "Carpentry Services",
      description: "Custom woodworking and repairs",
      price: 75,
      image:
        "https://public.readdy.ai/ai/img_res/ba9e92203b4f513edd7f0c3e150e431e.jpg",
    },
  ];
  const professionals = [
    {
      id: 1,
      name: "Christopher Wilson",
      specialty: "Master Plumber",
      experience: "12 years",
      rating: 4.9,
      reviews: 156,
      image:
        "https://readdy.ai/api/search-image?query=professional confident male plumber in uniform standing against clean modern background natural lighting professional headshot&width=200&height=200&seq=5&orientation=squarish",
    },
    {
      id: 2,
      name: "Alexandra Martinez",
      specialty: "Senior Electrician",
      experience: "8 years",
      rating: 4.8,
      reviews: 124,
      image:
        "https://public.readdy.ai/ai/img_res/4150e9059613bbe89f675d0d53e91cd3.jpg",
    },
    {
      id: 3,
      name: "David Thompson",
      specialty: "HVAC Expert",
      experience: "15 years",
      rating: 4.9,
      reviews: 198,
      image:
        "https://public.readdy.ai/ai/img_res/3b30f2a02ecd06681ccfa07e589ee76e.jpg",
    },
  ];
  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`w-24 h-1 ${
                  currentStep > step ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-sm">Service</span>
        <span className="text-sm">Schedule</span>
        <span className="text-sm">Professional</span>
        <span className="text-sm">Details</span>
        <span className="text-sm">Payment</span>
      </div>
    </div>
  );
  const renderServiceSelection = () => (
    <div className="grid grid-cols-2 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedService === service.id
              ? "border-indigo-600 bg-indigo-50"
              : "border-gray-200 hover:border-indigo-300"
          }`}
          onClick={() => setSelectedService(service.id)}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <p className="text-indigo-600 font-semibold">${service.price}/hour</p>
        </div>
      ))}
    </div>
  );
  const renderScheduling = () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`p-3 rounded-lg text-center ${
                  selectedTime === time
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Location
        </label>
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
  const renderProfessionalSelection = () => (
    <div className="grid grid-cols-3 gap-6">
      {professionals.map((pro) => (
        <div
          key={pro.id}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedProfessional === pro.id.toString()
              ? "border-indigo-600 bg-indigo-50"
              : "border-gray-200 hover:border-indigo-300"
          }`}
          onClick={() => setSelectedProfessional(pro.id.toString())}
        >
          <img
            src={pro.image}
            alt={pro.name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-center mb-2">{pro.name}</h3>
          <p className="text-indigo-600 text-center mb-2">{pro.specialty}</p>
          <div className="flex justify-center items-center mb-2">
            <i className="fas fa-star text-yellow-400 mr-1"></i>
            <span>{pro.rating}</span>
            <span className="text-gray-500 ml-2">({pro.reviews} reviews)</span>
          </div>
          <p className="text-gray-600 text-center">
            {pro.experience} experience
          </p>
        </div>
      ))}
    </div>
  );
  const renderCustomerDetails = () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Instructions
        </label>
        <textarea
          name="notes"
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.notes}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
  const renderPayment = () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="123"
              value={formData.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Service Type</span>
            <span className="font-medium">
              {services.find((s) => s.id === selectedService)?.title}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time</span>
            <span className="font-medium">
              {selectedDate} {selectedTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Professional</span>
            <span className="font-medium">
              {
                professionals.find(
                  (p) => p.id.toString() === selectedProfessional
                )?.name
              }
            </span>
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Estimate</span>
            <span>
              ${services.find((s) => s.id === selectedService)?.price}.00/hour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <i className="fas fa-tools text-2xl text-indigo-600 mr-2"></i>
              <span className="text-xl font-bold">RepairPro</span>
            </div>
            <a
              href="https://readdy.ai/home/a69c032c-c222-4d02-8907-58beb7bee794/fdbcff18-bd0e-49c5-b6e2-5580b3e09de0"
              data-readdy="true"
              className="text-gray-600 hover:text-indigo-600"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </a>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {renderProgressBar()}
          <div className="mb-8">
            {currentStep === 1 && renderServiceSelection()}
            {currentStep === 2 && renderScheduling()}
            {currentStep === 3 && renderProfessionalSelection()}
            {currentStep === 4 && renderCustomerDetails()}
            {currentStep === 5 && renderPayment()}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className={`!rounded-button px-6 py-2 ${
                currentStep === 1
                  ? "invisible"
                  : "bg-gray-100 hover:bg-gray-200"
              } cursor-pointer whitespace-nowrap`}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Previous
            </button>
            <button
              onClick={handleNext}
              className="!rounded-button bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 cursor-pointer whitespace-nowrap"
            >
              {currentStep === 5 ? "Confirm Booking" : "Next"}
              {currentStep !== 5 && <i className="fas fa-arrow-right ml-2"></i>}
            </button>
          </div>
        </div>
      </main>
      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 !rounded-button"
      >
        <i
          className={`fas ${isChatOpen ? "fa-times" : "fa-comments"} text-xl`}
        ></i>
      </button>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl transition-all transform ${
          isChatOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <i className="fas fa-headset text-indigo-600 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">Customer Support</h3>
              <p className="text-sm opacity-90">Online</p>
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } items-start gap-2`}
            >
              {message.sender !== "user" && message.avatar && (
                <img
                  src={message.avatar}
                  alt="Provider"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : message.sender === "provider"
                    ? "bg-green-100 text-gray-800"
                    : message.sender === "agent"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {message.sender === "provider" && (
                  <p className="text-xs font-semibold text-green-600 mb-1">
                    Service Provider
                  </p>
                )}
                {message.sender === "agent" && (
                  <p className="text-xs font-semibold text-indigo-600 mb-1">
                    Customer Support
                  </p>
                )}
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
              {message.sender === "user" && message.avatar && (
                <img
                  src={message.avatar}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
