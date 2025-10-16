const multer = require('multer');
const path = require('path');

//tell multer where to store files and what to name them
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //save files to uploads folder
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        //create a unique filename to avoid duplicates timestamp-randomnumber-originalname
        //Example: "1635781234567-123456789.jpg"
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) +
        path.extname(file.originalname);
             cb(null, uniqueName);
    }
});

//only allow image files (no.exe, zip, etc)
const fileFilter = (req, file, cb) => {
    //check if file is an image
    if(file.mimetype.startsWith('image/')) {
       cb(null, true); //yes, accept this file
    }else {
        cb(new Error('Only image files are allowed!'), false);  //reject file
    }    
};

//create the actual upload middleware
const upload = multer({
    limits: {
        fileSize: 5*1024*1024  //max of 5mbs
    },
    //Run security checks
    fileFilter: fileFilter, 
    
    //omly store if all checks pass
     storage: storage, 
});

module.exports = upload;


