// Controller to handle image upload logic
exports.uploadImage = (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an image to upload.'
      });
    }

    // If file upload is successful, send success response
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully!',
      fileInfo: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path
      }
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during file upload',
      error: error.message
    });
  }
};

// Controller to handle multiple image uploads
exports.uploadMultipleImages = (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded. Please select images to upload.'
      });
    }

    // Map file information for response
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path
    }));

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} images uploaded successfully!`,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during files upload',
      error: error.message
    });
  }
};

