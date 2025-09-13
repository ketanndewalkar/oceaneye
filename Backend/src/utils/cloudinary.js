import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";


cloudinary.config({
  cloud_name: "dnhvnpdjz",
  api_key: "399484439978982",
  api_secret: "bin6k6XlJDarbUkNYhVwOakO4GM",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "userReports",
    resource_type: "image",
    format: async (req, file) => "jpg",
    public_id: (req, file) => Date.now() + "_" + file.originalname,
  },
});
export const upload = (single = true, fieldName = "image") => {
  console.log("In upload");
  if (single) return multer({ storage }).single(fieldName);
  return multer({ storage }).array(fieldName);
};

export default cloudinary;
