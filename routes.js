const express = require('express');
const router = express.Router();
const upload = require('./uploadMiddleware'); // Import multer configuration
const { uploadImage, uploadMultipleImages, getAllImages } = require('./uploadController');

// Route for single image upload
router.post('/upload/single', upload.single('image'), uploadImage);

// Route for multiple image uploads (max 10 images)
router.post('/upload/multiple', upload.array('images', 10), uploadMultipleImages);

router.get('/images', getAllImages);

// Health check route to verify server is running
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Image upload server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;