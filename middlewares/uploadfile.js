import multer from 'multer';
// import axios from 'axios';

// const uploadfile = async (file) => {
//     try {
//         const response = await axios.post('http://example.com/upload', file, {
//             headers: {
//                 'Content-Type': 'application/octet-stream'
//             }
//         });
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// };

// export default uploadfile;

const xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', function(event) {

 });
const storage = multer.diskStorage({
     destination: (req,file,cb) => {
        cb(null, '../uploads/');
        },
        filename: (req,file,cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname); 
        }
});

const filefilter = (req, file, cb) => {
    if (file.mimtype,startswith('image/')) {
    cb(null, true);
    } else {
    cb(new Error('Only image files are allowed..'),false);
    }
};

const upload = multer({ storage, filefilter, limits: {filesize: 1024 * 1024 * 5} });

export default XMLHttpRequestUpload;


