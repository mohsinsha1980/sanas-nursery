import multer, { memoryStorage } from "multer";
import sharp from "sharp";
import { existsSync, mkdirSync, promises } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const storage = memoryStorage();
const uploadMedia = multer({
  storage: storage,
}).fields([
  { name: "pictures", maxCount: 10 },
  { name: "files", maxCount: 10 },
]);

const savePDF = async (file, mediaConfig) => {
  try {
    if (!existsSync(mediaConfig.destination)) {
      mkdirSync(mediaConfig.destination, { recursive: true });
    }

    const filename = `${uuidv4()}_${Date.now()}.pdf`;
    const pdfPath = join(mediaConfig.destination, filename);

    await promises.writeFile(pdfPath, file.buffer);
    return pdfPath;
  } catch (error) {
    throw new Error(`Error saving PDF: ${error.message}`);
  }
};

const optimizeImage = async (file, mediaType) => {
  try {
    if (!file) throw new Error("No file provided");
    if (!existsSync(mediaType.destination)) {
      mkdirSync(mediaType.destination, { recursive: true });
    }

    const filename = uuidv4() + "_" + Date.now() + ".webp";
    const optimizedImagePath = join(mediaType.destination, filename);

    let webpBuffer = await sharp(file.buffer)
      .resize(mediaType.resizeOptions)
      .rotate(0)
      .withMetadata()
      .webp()
      .toFormat("webp")
      .toBuffer();

    if (webpBuffer.length > mediaType.limits.fileSize) {
      webpBuffer = await sharp(webpBuffer).webp({ quality: 80 }).toBuffer();
    }

    if (webpBuffer.length > mediaType.limits.fileSize) {
      throw new Error("File is too large, even after optimization.");
    }

    await sharp(webpBuffer).toFile(optimizedImagePath);
    return optimizedImagePath;
  } catch (error) {
    throw new Error(error.message);
  }
};

const mediaUpload = (mediaType) => async (req, res, next) => {
  try {
    uploadMedia(req, res, async (err) => {
      if (err?.code === "LIMIT_UNEXPECTED_FILE") {
        return next({
          status: 400,
          message:
            "Image upload error: Max 10 media files can be uploaded at a time.",
        });
      }
      if (err) {
        return next({
          status: 400,
          message: "Image Upload Error: " + err.message,
        });
      }

      const imageFiles = req.files?.pictures || [];
      const pdfFiles = req.files?.files || [];

      // Process pictures
      if (imageFiles.length) {
        if (!mediaType.pictures) {
          return next({
            status: 400,
            message: "Image upload is not allowed!",
          });
        }

        // check if incoming pictures count is equals to models pictures count
        //   if (mediaType.pictures?.count !== imageFiles.length) {
        //     next({
        //       status: 400,
        //       message: `accept ${mediaType.pictures?.count} pictures, provide ${imageFiles.length}`,
        //     });
        //   }

        if (mediaType.pictures?.count === 1) {
          try {
            req.optimizedImagePath = await optimizeImage(
              imageFiles[0],
              mediaType
            );
          } catch (error) {
            return next({
              status: 401,
              message:
                "Invalid image format. Allowed formats: JPEG, JPG, PNG, WEBP, AVIF.",
            });
          }
        }
        if (mediaType.pictures?.count > 1) {
          try {
            req.optimizedImagePaths = await Promise.all(
              imageFiles
                .slice(0, mediaType.pictures?.count)
                .map((file) => optimizeImage(file, mediaType))
            );
          } catch (error) {
            return next({
              status: 401,
              message:
                "Invalid image format. Allowed formats: JPEG, JPG, PNG, WEBP, AVIF.",
            });
          }
        }
      }

      // Process PDFs
      if (pdfFiles.length) {
        if (!mediaType.files) {
          return next({
            status: 400,
            message: "Files upload is not allowd!",
          });
        }

        // check if incoming files count is equals to models files count
        // if (mediaType.files?.count !== pdfFiles.length) {
        //   next({
        //     status: 400,
        //     message: `accept ${mediaType.files?.count} files, provide ${pdfFiles.length}`,
        //   });
        // }

        try {
          if (mediaType.files?.count === 1) {
            req.savedPDFPath = await savePDF(pdfFiles[0], mediaType);
          }
          if (mediaType.files?.count > 1) {
            req.savedPDFPaths = await Promise.all(
              pdfFiles
                .slice(0, mediaType.files?.count)
                .map((file) => savePDF(file, mediaType))
            );
          }
        } catch (error) {
          return next({
            status: 401,
            message: "Error in saving pdf: " + error.message,
          });
        }
      }

      return next();
    });
  } catch (error) {
    return next({
      status: 500,
      message: "Error processing pictures: " + error.message,
    });
  }
};

export default mediaUpload;
