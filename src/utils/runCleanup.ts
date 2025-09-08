import { cleanupDuplicateData } from './cleanupDuplicates';

// Script to run cleanup of duplicate data
export const runCleanupScript = async () => {
    try {
        console.log('🚀 Starting duplicate cleanup script...');
        const removedCount = await cleanupDuplicateData();
        console.log(`✅ Cleanup completed. Removed ${removedCount} duplicates.`);
        return removedCount;
    } catch (error) {
        console.error('❌ Cleanup script failed:', error);
        throw error;
    }
};

// Run if called directly
if (typeof window !== 'undefined') {
    // Browser environment - expose to window for manual execution
    (window as any).runCleanupScript = runCleanupScript;
}
