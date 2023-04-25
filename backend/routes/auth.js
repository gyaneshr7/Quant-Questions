const router = require('express').Router();
const { response } = require('express');
const mongoose = require('mongoose')
const User = require('../models/User');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password,phoneNo,role } = req.body;
    
    // Validate user input
    if (!(email && password && name )) {
      res.status(400).json("All input is required");
    } else {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).json("User Already Exist. Please Login");
      } else {
        // localStorage.setItem(process.env.JWT_SecretKey)
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SecretKey).toString(),
          role: role,
          phoneNo:phoneNo
        });

        // return new user
        res.status(201).json("Registered Successfully!");
      }
    }


  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const user = await User.aggregate([{ $match: { email: email } }]);
    console.log(user[0].password);
    console.log(user[0].email);
    var bytes = CryptoJS.AES.decrypt(user[0].password, process.env.JWT_SecretKey);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
 
    if (!user || user.length < 1) {
      res.status(401).json("wrong email or password");
    } else if (originalPassword !== password || !user[0].email) {
      res.status(401).json("wrong email or password")
    } else if (user[0].role != role) {
      res.status(401).json("Not a valid user!")
    } 
    else {
      const userDetails = {
        id: user[0]._id,
        email: user[0].email,
        name: user[0].name,
        role: user[0].role,
      }
      res.status(200).json(userDetails)
    }
  }catch (error) {
    console.log(error);
  }
})

router.put("/change/password/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    var bytes = CryptoJS.AES.decrypt(user[0].password, process.env.JWT_SecretKey);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(originalPassword)

    if (user.length > 0) {
      if (req.body.currpass === originalPassword) {
        if (req.body.newpass !== "") {
          // console.log(req.body.newpass, user[0].password);
          const updatedPassword = CryptoJS.AES.encrypt(req.body.newpass, process.env.JWT_SecretKey).toString()
          // console.log(updatedPassword)
          await User.updateOne({ _id: req.params.id }, { password: updatedPassword }, { new: true })
          res.status(200).json("Password Changed Successfully...");
        } else {
          res.status(200).json("Please Provide New Password!");
        }
      } else {
        res.status(200).json("Your current password is wrong...");
      }
    } else {
      res.status(200).json("This user doesn't exists...")
    }
  } catch (error) {
    res.status(500).json(error);
  }
})


router.put("/update/new/password/:phoneNo", async (req, res) => {
  try {
    const user = await User.findOne({ phoneNo: req.params.phoneNo });
    // console.log(user);
    if (user) {
      const updateduser = await User.updateOne({ phoneNo: req.params.phoneNo }, { password: req.body.password }, { new: true })
      console.log(updateduser, "updateduser");
      res.status(200).json("Password Changed Successfully...");
    } else {
      res.status(200).json("This user doesn't exists...")
    }
  } catch (error) {
    res.status(500).json(error);
  }
})




module.exports = router;
