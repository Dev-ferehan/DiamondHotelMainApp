export const uploadImages = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded",
        });
      }
  
      const images = req.files.map(
        (file, index) => ({
          image_url:
            `http://localhost:8000/uploads/${file.filename}`,
  
          is_primary: index === 0,
        })
      );
  
      return res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        images,
      });
  
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );
  
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  };