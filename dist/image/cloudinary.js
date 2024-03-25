"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
};
cloudinary_1.v2.config(cloudinaryConfig);
exports.default = cloudinary_1.v2;
