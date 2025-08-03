import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

// config

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

// file upload

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    //uploadation
    await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        fs.unlinkSync(localFilePath); // removes the locally saved file as the upload is failed

        console.log(`Error: File can not be uploaded, ${error}`);
      });

    console.log("File uploaded Successfully", response.url);
    return response;
  } catch (error) {
    console.log("Server not responding");
  }
};

export {uploadCloudinary}