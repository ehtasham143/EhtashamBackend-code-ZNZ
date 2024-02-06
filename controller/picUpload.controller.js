const picModel=require("../model/picModel")

const cloudinary = require('cloudinary').v2;
// const uploadPic = async (req, res) => {
//     try {
//       const { text } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded. Please upload a file." });
//     }
//     res.status(200).json({ message: "Pics uploaded successfully" });

//     } catch (error) {
      
//     }
    

// }

const cloudinaryImg=  (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  cloudinary.uploader.upload_stream({ resource_type: 'auto' },async(error, result) => {
    if (error) return res.status(500).send('Failed to upload to Cloudinary.');
    const { text } = req.body;
    const pics = await picModel.create({
      text,
      picAddress:result.url
    });
    res.send({ message: 'Successfully uploaded to Cloudinary.', url: result.url });
  }).end(req.file.buffer);
  
};

module.exports={cloudinaryImg}