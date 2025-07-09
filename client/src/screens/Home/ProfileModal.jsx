import React from "react";

const ProfileModal = ({ selectedProfessional, setShowProfileModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <img
              src={selectedProfessional?.user?.profileImage}
              alt={selectedProfessional?.user?.fullName}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {selectedProfessional?.user?.fullName}
              </h2>
              <p className="text-indigo-600 font-medium">
                {selectedProfessional.title}
              </p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Math.floor(selectedProfessional.rating)
                          ? ""
                          : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({selectedProfessional.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowProfileModal(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close profile modal"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-600 mb-1">Hourly Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              Tsh {selectedProfessional.hourlyRate}/hr
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-600 mb-1">Experience</div>
            <div className="text-2xl font-bold text-gray-900">
              {selectedProfessional.yearsOfExperience}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-600 mb-1">Location</div>
            <div className="text-2xl font-bold text-gray-900">
              {selectedProfessional.location}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-gray-600">{selectedProfessional.bio}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProfessional.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
