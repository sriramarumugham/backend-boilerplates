"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const basic_ftp_1 = require("basic-ftp");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
// FTP Credentials
const FTP_CREDENTIALS = {
    host: process.env.FTP_HOST, // FTP server IP or hostname
    user: process.env.FTP_USER, // FTP username
    password: process.env.FTP_PASSWORD, // FTP password
    port: process.env.FTP_PORT || 21, // FTP port (default to 21 for standard FTP)
    directory: process.env.FTP_DIRECTORY, // FTP directory path to upload images
};
const fileUpload = async (filePath) => {
    // console.log("LOCAL FILE PATH____", filePath);
    const client = new basic_ftp_1.Client();
    const uploadedImageUrls = [];
    try {
        // Connect to the FTP server
        await client.access({
            host: FTP_CREDENTIALS.host,
            user: FTP_CREDENTIALS.user,
            password: FTP_CREDENTIALS.password,
            port: 21,
        });
        console.log("FTP CONNECTION SUCCESSFUL");
        const filename = path_1.default.basename(filePath); // Get filename from file path
        console.log(`STARTING TO UPLOAD: ${filename}`);
        // Check if file exists locally
        if (fs.existsSync(filePath)) {
            const response = await client.uploadFrom(filePath, filename); // Upload the file to FTP
            console.log(`UPLOADED: ${filename}`, response);
            const imageUrl = `ftp://${FTP_CREDENTIALS.host}/${filename}`;
            uploadedImageUrls.push(imageUrl);
        }
        else {
            console.error("File not found on the server:", filePath);
        }
    }
    catch (error) {
        console.error("ERROR DURING FTP UPLOAD:", error);
    }
    finally {
        // Close the FTP connection
        console.log("CLOSING FTP CONNECTION");
        client.close();
    }
    // Return the list of uploaded image URLs
    return uploadedImageUrls;
};
exports.fileUpload = fileUpload;
