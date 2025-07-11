import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, callback)=>{
        callback(null, file.originalname);
    }
})
export const upload = multer({storage});