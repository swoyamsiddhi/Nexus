import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export { cloudinary };

export interface UploadResult {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
}

export async function uploadImage(
    file: string,
    folder: string = "nexus"
): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: "image",
        transformation: [
            { quality: "auto:good" },
            { fetch_format: "auto" },
        ],
    });

    return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
    };
}

export async function uploadAvatar(file: string): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(file, {
        folder: "nexus/avatars",
        resource_type: "image",
        transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto:good" },
            { fetch_format: "auto" },
        ],
    });

    return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
    };
}

export async function uploadClubBanner(file: string): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(file, {
        folder: "nexus/club-banners",
        resource_type: "image",
        transformation: [
            { width: 1200, height: 400, crop: "fill", gravity: "auto" },
            { quality: "auto:good" },
            { fetch_format: "auto" },
        ],
    });

    return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
    };
}

export async function deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
}
