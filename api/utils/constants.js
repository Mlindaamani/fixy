const IMAGE_TRANSFORMATIONS = {
  width: 800,
  height: 600,
  crop: "limit",
  quality: "auto",
};

const USERROLE = {
  SERVICEPROVIDER: "serviceProvider",
  CUSTOMER: "customer",
  ADMIN: "admin",
};

const SERVICE_CATEGORIES = [
  "plumbing",
  "electrical",
  "hvac",
  "carpentry",
  "cleaning",
  "gardening",
  "pest control",
  "painting",
  "roofing",
  "masonry",
  "welding",
  "landscaping",
  "flooring",
  "remodeling",
  "construction",
  "handyman",
  "appliance repair",
  "moving",
  "security",
  "locksmith",
  "car wash",
  "car detailing",
  "carpentry",
  "home improvement",
  "home repair",
  "home cleaning",
  "home maintenance",
  "home organization",
  "other",
];

module.exports = { USERROLE, IMAGE_TRANSFORMATIONS, SERVICE_CATEGORIES };
