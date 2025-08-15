import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// file upload

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    // Fixed: Added proper return and error handling
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Remove the locally saved temporary file after successful upload
    fs.unlinkSync(localFilePath);
    
    console.log("File uploaded Successfully", response.url);
    return response;
    
  } catch (error) {
    // Remove the locally saved temporary file if upload failed
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.log("Error uploading to Cloudinary:", error);
    return null;
  }
};

export default uploadCloudinary;