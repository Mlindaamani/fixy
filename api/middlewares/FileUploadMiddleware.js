const multer = require("multer");
const path = require("path");

// Storage for services
const servicesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/services/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },

  limits: { fileSize: 5 * 1024 * 1024 },
});

// Storage for profiles
const profilesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },

  limits: { fileSize: 5 * 1024 * 1024 },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Only images (jpeg, jpg, png, gif) are allowed"));
};

const uploadServices = multer({
  storage: servicesStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadProfiles = multer({
  storage: profilesStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { uploadProfiles, uploadServices };
