 const asyncHandler = require("express-async-handler")
 const User = require("../models/user.model")
 const bcrypt = require("bcrypt")
 
 const registerUser = asyncHandler ( async (req, res) => {
      const {name, email, password} = req.body
      //validation
      if (!name || !email || !password) {     
      res.status(400)
      throw new Error("Please fill in all required fields")
  }
  if (password.length < 6) {
      res.status(400)
      throw new Error("Password must be a minimum of 6 characters")
  }





    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("duplicate email")
    }

    // create new user
    const user = await User.create({
        name,
        email, 
        password
        })
        if (user) {
            const {_id, name, email, photo, phone, bio} = user
            res.status(201).json({
                _id, name, email, photo, phone, bio
        })
        }else {
            res.status(400)
            throw new Error("invalid data")
        }

 });

    
 module.exports = {
    registerUser,
 }