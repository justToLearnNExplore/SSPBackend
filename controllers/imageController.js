const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

exports.uploadImages = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 3 },
]);

exports.handleUpload = (req, res) => {
  const mainImage = req.files.mainImage ? req.files.mainImage[0].filename : null;
  const additionalImages = req.files.additionalImages ? req.files.additionalImages.map(file => file.filename) : [];

  const mainImageURL = mainImage ? `${process.env.BASE_URL}/images/${mainImage}` : null;
  const additionalImagesURLs = additionalImages.map(filename => `${process.env.BASE_URL}/images/${filename}`);

  res.json({
    success: true,
    mainImageURL,
    additionalImagesURLs,
  });
};
