import multer from "multer";
import path from "path";
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, '../public/temp')
  },

  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  },

})

const Upload = multer({storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false)
    }
  }
})

export default Upload;