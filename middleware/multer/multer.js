const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});
module.exports=upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads/pics/')
//   },
//   filename: function (req, file, cb) {    // working for images
//       console.log(file);
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       const fileExtension = file.mimetype.split('/')[1];   
//  const allowedExtensions = ['jpg' ,'png', 'gif', 'svg', 'WebP','WDP']; // Adjust based on your needs
// if (allowedExtensions.includes(fileExtension)) {
//           cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
//       } else {
//           cb(new Error('File type not allowed'), false);
//       }
//   }
// });







// const storagePic = multer.diskStorage({
//     destination: function (req, pic, cb) {
//         cb(null, 'uploads/pics')
//     },
//     picName: function (req, pic, cb) {
//         console.log(pic);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const picExtension = pic.mimetype.split('/')[1];
//         const allowedExtensions = ['JPG' ,'PNG', 'GIF', 'BMP', 'TIFF', 'ICO', 'PDF', 'EPS', 'PSD', 'SVG', 'WebP', 'JXR','WDP']; // Adjust based on your needs
//         if (allowedExtensions.includes(picExtension)) {
//             cb(null, `${pic.fieldname}-${uniqueSuffix}.${picExtension}`);
//         } else {
//             cb(new Error('Picture type not allowed'), false);
//         }
//     }
//   });
//const upload = multer({ storage: storage }); //working with images
// const uploadPic = multer({ storage: storagePic });





  