import { addTeamMember, getTeamMembers } from '../services/firebaseService';

// Test function to verify duplicate prevention works
export const testDuplicatePrevention = async () => {
    try {
        console.log('🧪 Testing duplicate prevention...');

        // Get current team members
        const currentMembers = await getTeamMembers();
        console.log(`📊 Current team members: ${currentMembers.length}`);

        // Try to add a duplicate (should fail)
        if (currentMembers.length > 0) {
            const existingMember = currentMembers[0];
            console.log(`🔄 Attempting to add duplicate: ${existingMember.name}`);

            try {
                await addTeamMember({
                    name: existingMember.name,
                    role: 'Test Duplicate',
                    country: 'Test Country',
                    image: 'test.jpg',
                    bio: 'This is a test duplicate',
                    category: 'senior-men'
                });
                console.log('❌ ERROR: Duplicate was allowed to be added!');
                return false;
            } catch (error: any) {
                console.log('✅ SUCCESS: Duplicate was properly rejected:', error.message);
                return true;
            }
        } else {
            console.log('⚠️ No existing members to test with');
            return true;
        }
    } catch (error) {
        console.error('❌ Test failed:', error);
        return false;
    }
};

// Expose to window for manual testing
if (typeof window !== 'undefined') {
    (window as any).testDuplicatePrevention = testDuplicatePrevention;
}
