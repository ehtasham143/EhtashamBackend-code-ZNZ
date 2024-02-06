const newUser = require("../model/newUser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sendRegistrationEmail } = require("../Utils/nodeMailer");
exports.Register = async (req, res) => {
  //destructring
  try {
    const { name, lastName, email } = req.body;
    const User = await newUser.create({
      name,
      lastName,
      email,
      password: null,
      rememberToken: uuidv4(),
    });
    const rememberToken = await newUser.findOne({
      where: { email: email },
    });
    await sendRegistrationEmail(email, rememberToken.rememberToken); // sending remembertoken and email to utils/nodemailer
    res.status(200).json({ message: "Registration Successful", data: User });
  } catch (err) {
    res.status(200).json({ message: "error", Error: err.message });
  }
};
exports.setPass = async (req, res) => {
  try {
    const { email, rememberToken } = req.params;
    const setpass = await newUser.findOne({
      where: { email, rememberToken },
    });
    const update = req.body;
    const passUpdate = update.password;
    const passConfirm = update.confirmpassword;
    if (passUpdate == passConfirm) {
      const hashedPassword = await bcrypt.hash(passUpdate, 10); //password bycryption
      const updatedPAss = setpass.update({
        password: hashedPassword,
        isVerified: true,
        rememberToken: null,
      });
      res.status(200).json({ message: "Password Update Succesfully" });
    } else {
      res
        .status(404)
        .json({ message: "password should be same in both fields" });
    }
  } catch (err) {
    res
      .status(404)
      .json({ message: "error:Password cannot set", Error: err.message });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await newUser.findOne({ where: { email } });
    console.log("user data", user)
    if (!user) {
      res.status(404).json({ message: "User not regestered please regester first" });
    } else {
      if (user.isVerified == false) {
        res.status(404).json({ message: "User not verefied please verify first" });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password); // debycryption
        if (!passwordMatch) {
          res.status(404).json({ message: "User password doesnot match" });
        } else {
          const token = jwt.sign({ userEmail: user.email,isAdmin:user.isAdmin  //JWT 
           }, process.env.JWT_SECRET, {
            expiresIn: "300m",
          });
          res.status(201).json({ message: "Login Successful", Token: token });
        }
      }
    }
  } catch (err) {
    console.log("error", err.message);
  }
};
exports.getAllData= async (req,res) =>{
  try {
  const data= await newUser.findAll();
  res.status(201).json({  Data: data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
