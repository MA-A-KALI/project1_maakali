var multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/user_images'/*folder images*/);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toString() + "-" + file.originalname)
    }

})

const upload = multer({ storage: fileStorage});

module.exports = upload;