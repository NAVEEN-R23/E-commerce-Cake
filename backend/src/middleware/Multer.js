// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary"); // make sure you created this

// // storage config (Cloudinary)
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads", // same as your old folder name
//     format: async (req, file) => {
//       return "png"; // or keep original if you want
//     },
//     public_id: (req, file) => {
//       return Date.now() + "-" + file.originalname;
//     },
//   },
// });

// // file filter (same as your old one)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png/;
//   const ext = allowedTypes.test(file.mimetype);

//   if (ext) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// module.exports = upload;







const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// storage config (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      return "png";
    },
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname;
    },
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const ext = allowedTypes.test(file.mimetype);

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;