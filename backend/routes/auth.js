const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/User');

router.post("/register", async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password ,role} = req.body;

      // Validate user input
      if (!(email && password && name)) {
        res.status(400).json("All input is required");
      }else{
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return res.status(409).json("User Already Exist. Please Login");
        }else{
          // Create user in our database
          const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: password,
            role:role
          });
  
          // return new user
          res.status(201).json("Registered Successfully!");
        }
      }

      
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/login",async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password);
        const user = await User.aggregate([{ $match : { email:email } }]);
        console.log(user);
        if(!user || user.length<1)
        {
            res.status(401).json("wrong email or password");
        }else if(user[0].password != password)
        {
            res.status(401).json("wrong email or password")
        }else{
            const userDetails = {
                id : user[0]._id,
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

module.exports = router;
