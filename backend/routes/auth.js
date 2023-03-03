const router = require('express').Router();
const { response } = require('express');
const mongoose = require('mongoose')
const User = require('../models/User');

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).json("All input is required");
    } else {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).json("User Already Exist. Please Login");
      } else {
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: password,
          role: role
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
    console.log(email, password);
    const user = await User.aggregate([{ $match: { email: email } }]);
    console.log(user);
    if (!user || user.length < 1) {
      res.status(401).json("wrong email or password");
    } else if (user[0].password != password) {
      res.status(401).json("wrong email or password")
    }else if (user[0].role != role) {
      res.status(401).json("Not a valid user!")
    } else {
      const userDetails = {
        id: user[0]._id,
        email: user[0].email,
        name: user[0].name,
        role: user[0].role,
      }
      res.status(200).json(userDetails)
    }
  } catch (error) {
    console.log(error);
  }
})

router.put("/change/password/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    if (user.length > 0) {
      if (req.body.currpass == user[0].password) {
        console.log(req.body.currpass,user[0].password);
        const updateduser=await User.updateOne({ _id: req.params.id },{password:req.body.newpass},{new:true})
        res.status(200).json("Password Changed Successfully...");
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

module.exports = router;
