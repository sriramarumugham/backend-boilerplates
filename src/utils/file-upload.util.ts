import { Client } from 'basic-ftp';
import path from 'path';
import * as fs from 'fs';

// FTP Credentials
const FTP_CREDENTIALS = {
  host: process.env.FTP_HOST,          // FTP server IP or hostname
  user: process.env.FTP_USER,          // FTP username
  password: process.env.FTP_PASSWORD,  // FTP password
  port: process.env.FTP_PORT || 21,    // FTP port (default to 21 for standard FTP)
  directory: process.env.FTP_DIRECTORY as string, // FTP directory path to upload images
};


export const fileUpload = async (filePath: string) => {
  // console.log("LOCAL FILE PATH____", filePath);

  const client = new Client(); 
  const uploadedImageUrls: string[] = []; 

  try {
    // Connect to the FTP server
    await client.access({
      host: FTP_CREDENTIALS.host,
      user: FTP_CREDENTIALS.user,
      password: FTP_CREDENTIALS.password,
      port: 21,
    });
    console.log("FTP CONNECTION SUCCESSFUL");

    const filename = path.basename(filePath);  // Get filename from file path

    console.log(`STARTING TO UPLOAD: ${filename}`);

    // Check if file exists locally
    if (fs.existsSync(filePath)) {
     const response= await client.uploadFrom(filePath, filename);  // Upload the file to FTP
      console.log(`UPLOADED: ${filename}` ,response);
      
      const imageUrl = `ftp://${FTP_CREDENTIALS.host}/${filename}`;
      uploadedImageUrls.push(imageUrl);
    } else {
      console.error("File not found on the server:", filePath);
    }
    
  } catch (error) {
    console.error("ERROR DURING FTP UPLOAD:", error);
  } finally {
    // Close the FTP connection
    console.log("CLOSING FTP CONNECTION");
    client.close();
  }

  // Return the list of uploaded image URLs
  return uploadedImageUrls;
};
