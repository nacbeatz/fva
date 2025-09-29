import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

// Simple test function to check if Firebase Storage is working
export const testFirebaseStorage = async (): Promise<boolean> => {
    try {
        console.log('Testing Firebase Storage connection...');

        // Create a simple test file
        const testContent = 'Firebase Storage Test';
        const testBlob = new Blob([testContent], { type: 'text/plain' });
        const testFile = new File([testBlob], 'storage-test.txt', { type: 'text/plain' });

        // Try to upload to a test path
        const testRef = ref(storage, `test/storage-test-${Date.now()}.txt`);

        console.log('Uploading test file...');
        const snapshot = await uploadBytes(testRef, testFile);

        console.log('Getting download URL...');
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('Firebase Storage test successful!', downloadURL);
        return true;

    } catch (error: any) {
        console.error('Firebase Storage test failed:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);

        if (error.code === 'storage/unauthorized') {
            console.error('❌ Storage rules are too restrictive. Please update your Firebase Storage rules.');
        } else if (error.code === 'storage/unknown') {
            console.error('❌ Unknown storage error. Check if Storage is enabled in Firebase Console.');
        }

        return false;
    }
};

// Function to check Firebase Storage configuration
export const checkStorageConfig = () => {
    console.log('Checking Firebase Storage configuration...');
    console.log('Storage instance:', storage);
    console.log('Storage app:', storage.app);
    console.log('Storage bucket:', storage.app.options.storageBucket);

    if (!storage.app.options.storageBucket) {
        console.error('❌ No storage bucket configured in Firebase config');
        return false;
    }

    console.log('✅ Storage configuration looks correct');
    return true;
};
