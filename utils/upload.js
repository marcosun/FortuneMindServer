import multer from 'multer';

const upload = multer({
    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'tmp/images/tmp');
        },
        filename: (req, file, cb) => {
            
            const imageName = `${Math.random().toString(36).substring(2)}-${Date.now()}`;
            
            let suffix;
            
            if (file.mimetype == 'image/jpeg') {
                suffix = '.jpg';
            } else {
                suffix = '.png';
            }
            
            cb(null, `${ imageName }${ suffix }`);
        },
    }),
    
    fileFilter: (req, file, cb) => {
        //accept jpeg only
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    
    limits: {
        fields: 0,
        fileSize: 1048576,//1M
        files: 1,
    },
    
});

export default upload;