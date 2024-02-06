const validateUpdateStatus = require("../joiSchemas/updateStatus");
const fileModel=require("../model/files")
const jwt = require("jsonwebtoken");
const cronJobs  = require("../Utils/cron/cron");



const uploadFile = async (req, res) => {
  const { phoneNumber, email, qualification, CNIC } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded. Please upload a file." });
  }
  if (!phoneNumber || !email ||! qualification||!CNIC) {
    return res.status(400).json({ message: "All feilds are required." });
  }
  const imagePath = req.file.path;
  // console.log("🚀 ~ uploadFile ~ imagePath:", imagePath);
  try {
    const fileRecord = await fileModel.create({
      phoneNumber,
      email,
      qualification,
      CNIC,
      File: imagePath,
      status: "pending",
      deleted:null
    });
    res.status(200).json({ message: "File uploaded successfully", file: fileRecord });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
  const admin = (req,res)=>{
    try {
      const token = jwt.sign({ userEmail: user.email  //JWT 
           }, process.env.JWT_SECRET, {
            expiresIn: "300m",
          });
    } catch (error) {
     }
  }
const updateStatus = async (req, res) => {
  try {
      const { error, value } = validateUpdateStatus(req.body);
      if (error) return res.status(400).send(error.message);
      const { postId } = req.params;
      const file = await fileModel.findByPk(postId);
      if (!file) return res.status(404).send('File not found');
       if(file.deleted == null  ) {
      file.status = value.status;
      if (file.status === 'rejected') {
          await cronJobs(file,postId)
          await file.save();
      } 
      else if(file.status === 'accepted')
      {
        await fileModel.update({ deleted: "0" ,status: "accepted"}, { where: { id: postId } });
      }
      // {
      //     return res.status(500).send('Server error');
      // }
      return res.status(200).send(file);
    }
    else{
      return res.status(404).send('You cannot edit the status once it is accepted or rejected');
    }
  } catch (error) {
      console.log(error);
      return res.status(500).send('Server error');
  }
};
  module.exports={uploadFile,updateStatus}


