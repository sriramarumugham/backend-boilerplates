import { Client } from 'basic-ftp';

// FTP Credentials
const FTP_CREDENTIALS = {
  host: process.env.HOST,          // FTP server IP or hostname
  user: process.env.USER,       // FTP username
  password: process.env.PASSWORD,        // FTP password
  port: process.env.PORT,                        // FTP port (21 for standard FTP)
  directory: process.env.DIRECTORY  as unknown as string// FTP directory path to upload images
};

export const fileUpload = async (body: any) => {
  let imagesArray = body.images;

  // Ensure imagesArray is an array, even if a single image is passed
  if (!Array.isArray(imagesArray)) {
    imagesArray = [imagesArray];
  }

  console.log("IMAGES TO UPLOAD:", imagesArray);

  if (!imagesArray || imagesArray.length === 0) {
    console.error("No images found");
    return [];
  }

  const client = new Client(); // FTP client instance
  const uploadedImageUrls: string[] = []; // Array to store uploaded image URLs

  try {
    // Connect to the FTP server using the credentials provided
    await client.access({
      host: FTP_CREDENTIALS.host,
      user: FTP_CREDENTIALS.user,
      password: FTP_CREDENTIALS.password,
      port: 21,
    });

    // Change to the directory where images should be uploaded
    await client.cd(FTP_CREDENTIALS.directory as unknown as any);

    // Loop through each image and upload
    for (const image of imagesArray) {
      const { file, filename } = image;

      // Check if the image has both file and filename properties
      if (!file || !filename) {
        console.error("Invalid image object, missing file or filename");
        continue; // Skip to the next image
      }

      console.log(`STARTING TO Uploaded file: ${filename}`);
        
      // Upload the file to the FTP server
      await client.uploadFrom(file, filename);
      console.log(`ENDED Uploaded file: ${filename}`);

      // Construct the URL of the uploaded image
      const imageUrl = `ftp://${FTP_CREDENTIALS.host}${FTP_CREDENTIALS.directory.replace(/^\//, '')}/${filename}`;
      uploadedImageUrls.push(imageUrl); // Add the URL to the array
    }
  } catch (error) {
    console.error("Error during FTP upload:", error); // Log errors if any
  } finally {
    // Close the FTP connection
    client.close();
  }

  // Return the list of uploaded image URLs
  return uploadedImageUrls;
};
