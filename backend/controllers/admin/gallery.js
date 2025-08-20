const Gallery = require("../../models/Gallery");

const addImages = async (req, res, next) => {
    try {
        if (
            (!req.optimizedImagePath && !req.optimizedImagePaths) ||
            (Array.isArray(req.optimizedImagePaths) && req.optimizedImagePaths.length === 0)
        ) {
            return next({
                message: "At least one image must be uploaded",
                status: 400,
            });
        }

        const pictures = Array.isArray(req.optimizedImagePaths)
            ? req.optimizedImagePaths.map((pict) => ({ pictures: pict }))
            : [{ pictures: req.optimizedImagePath }];

        const gallery = await Gallery.insertMany(pictures);

        const formattedGallery = gallery.map(({ _id, pictures }) => ({
            _id,
            pictures
        }));

        req.successResponse = {
            message: "Images added successfully.",
            data: formattedGallery,
        };
        return next();
    } catch (e) {
        return next({
            status: 500,
            message: e.message || "Internal server error while creating Product.",
        });
    }
};

const getImages = async (req, res, next) => {
    try {
        const images = await Gallery.find()
            .select("-__v -updatedAt -createdAt");

        req.successResponse = {
            message: "Images retrieved successfully.",
            data: images,
        };

        return next();
    } catch (e) {
        return next({
            message: error.message || "An error occurred while fetching Images.",
            status: 500,
        });
    }
}

const deleteImage = async (req, res, next) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return next({ message: "Image ID is required.", status: 400 });
        }

        const image = await Gallery.findByIdAndDelete({ _id });

        if (!image) {
            return next({
                message: "No image found with the provided ID.",
                status: 400,
            });
        }

        req.successResponse = {
            message: "Image deleted successfully!",
            data: image,
        };
        return next();
    } catch (e) {
        return next({
            message:
                e.message || "Internal Server Error while deleting image.",
            status: 500,
        });
    }
}

module.exports = {
    addImages,
    getImages,
    deleteImage,
}