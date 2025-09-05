import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const quickStorageTest = async () => {
    try {
        console.log('🔍 Quick Storage Test Starting...');

        // Check if storage is initialized
        console.log('Storage instance:', storage);
        console.log('Storage bucket:', storage.app.options.storageBucket);

        if (!storage.app.options.storageBucket) {
            throw new Error('No storage bucket configured');
        }

        // Create a tiny test file
        const testData = 'Hello Firebase Storage!';
        const testBlob = new Blob([testData], { type: 'text/plain' });

        // Try to upload to a test location
        const testRef = ref(storage, `test/quick-test-${Date.now()}.txt`);

        console.log('📤 Attempting upload...');
        const snapshot = await uploadBytes(testRef, testBlob);

        console.log('📥 Getting download URL...');
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('✅ Storage test SUCCESSFUL!');
        console.log('Download URL:', downloadURL);

        return { success: true, url: downloadURL };

    } catch (error: any) {
        console.error('❌ Storage test FAILED:', error);

        // Analyze the error
        if (error.code === 'storage/unauthorized') {
            console.error('→ Storage rules are too restrictive');
        } else if (error.code === 'storage/unknown') {
            console.error('→ Storage might not be enabled');
        } else if (error.message.includes('bucket')) {
            console.error('→ Storage bucket not configured');
        } else {
            console.error('→ Unknown storage error');
        }

        return { success: false, error: error.message };
    }
};
