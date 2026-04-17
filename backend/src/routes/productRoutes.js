const express = require("express")
const { createProduct, getAlldata, deleteProduct, updateProduct } = require("../controllers/productController");
const upload = require("../middleware/multer");

const Router = express.Router()

Router.post(
  "/createdata",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createProduct
);
Router.get("/getData",getAlldata)

// UPDATE
Router.put(
  "/update/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateProduct
);
//delete
Router.delete("/delete/:id", deleteProduct);


module.exports = Router