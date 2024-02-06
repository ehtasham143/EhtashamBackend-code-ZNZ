const fs = require('fs');
const cron = require('node-cron');
const fileModel=require("../../model/files")


const cronJobs = async (file,postId)=>{
    return cron.schedule('*/1 * * * *', 
          async () => {
              const filePath = file.File;
              console.log("🚀 ~ filePath:", filePath)
              fs.unlink(filePath, async (err) => {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log(`${filePath} is deleted.`);
                      try {
                          await fileModel.update({ deleted: "1",status: "rejected" }, { where: { id: postId } });
                      } catch (updateError) {
                          console.error(`Error updating database for file ${postId}:`, updateError);
                      }
                  }
              });
             // job.stop();  to stop the cron
          }, {
              scheduled: true,
              timezone: "Asia/Karachi"
          });
}

module.exports = cronJobs;