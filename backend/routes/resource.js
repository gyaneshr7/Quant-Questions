const router = require('express').Router();
const mongoose = require('mongoose')
const Resources = require('../models/Resources');
const cloudinary = require('cloudinary');
const multer = require('multer');
const path = require("path")

console.log(process.env.cloud_name)
console.log(process.env.api_key)
console.log(process.env.api_secret)

cloudinary.config({
  cloud_name: "damv4gxcs",
  api_key: "959848926367614",
  api_secret: "aaLhga9HAArYEc3iDb16Rx2YT2I"
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      cb(new Error("File typr is not supported"), false);
      return;
    }
    cb(null, true);
  },
})


router.post("/add/pdf", upload.single("pdf"), async (req, res) => {
  console.log(req.body);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const val = {
      name: req.body.name,
      pdf: result.secure_url,
      cloudinary_id: result.public_id
    }
    const resource = await Resources.create(val);
    res.json(resource);
  } catch (err) {
    console.log(err, "error");
  }
})

router.get("/", async (req, res) => {
  try {
     let user = await Resources.find({});
     res.json(user);
   } catch (err) {
    console.log(err);
   }
 });

 router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Resources.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", upload.single("pdf"), async (req, res) => {
  try {
    let resource = await Resources.find({name:req.body.name});
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(resource[0].cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    console.log(result);
    const data = {
      name: req.body.name ,
      pdf: result.secure_url ,
      cloudinary_id: result.public_id ,
    };
    user = await Resources.findOneAndUpdate({name:req.body.name}, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find resource by id
    let resource = await Resources.findById(req.params.id);
    res.json(resource);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;