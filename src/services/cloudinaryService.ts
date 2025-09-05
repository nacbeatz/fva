// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
    cloudName: 'dygpmaz6a', // Your cloud name from the screenshot
    uploadPreset: 'unsigned_uploads', // We'll create this preset
    apiKey: '948272362375553', // Your API key from screenshot
    // Note: Never expose API secret in frontend code
};

// Cloudinary upload function using unsigned uploads
export const uploadToCloudinary = async (file: File, folder: string = 'fva-uploads'): Promise<string> => {
    try {
        console.log('🌤️ Starting Cloudinary upload for:', file.name);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        formData.append('folder', folder);
        formData.append('resource_type', 'auto');

        const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.error) {
            throw new Error(`Cloudinary error: ${result.error.message}`);
        }

        console.log('✅ Cloudinary upload successful:', result.secure_url);
        return result.secure_url;

    } catch (error: any) {
        console.error('❌ Cloudinary upload failed:', error);
        throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
    }
};

// Function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
} = {}) => {
    const { width = 400, height = 300, quality = 'auto', format = 'auto' } = options;

    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`;
};
