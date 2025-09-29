import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to remove duplicate team members
export const removeDuplicateTeamMembers = async () => {
    try {
        console.log('🔍 Checking for duplicate team members...');

        const teamRef = collection(db, 'team');
        const q = query(teamRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const members = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Array<{ id: string, name?: string, [key: string]: any }>;

        console.log(`📊 Found ${members.length} total team members`);

        // Group by name to find duplicates
        const membersByName = new Map();
        const duplicates = [];

        for (const member of members) {
            const name = member.name?.toLowerCase().trim();
            if (membersByName.has(name)) {
                // Keep the newer one (first in our ordered query), mark older for deletion
                duplicates.push(member.id);
                console.log(`🔍 Found duplicate: ${member.name} (ID: ${member.id})`);
            } else {
                membersByName.set(name, member);
            }
        }

        if (duplicates.length > 0) {
            console.log(`🗑️ Removing ${duplicates.length} duplicate team members...`);

            for (const duplicateId of duplicates) {
                await deleteDoc(doc(db, 'team', duplicateId));
                console.log(`✅ Removed duplicate team member: ${duplicateId}`);
            }

            console.log(`🎉 Successfully removed ${duplicates.length} duplicates`);
            return duplicates.length;
        } else {
            console.log('✅ No duplicates found');
            return 0;
        }

    } catch (error) {
        console.error('❌ Error removing duplicates:', error);
        throw error;
    }
};

// Function to remove duplicate events
export const removeDuplicateEvents = async () => {
    try {
        console.log('🔍 Checking for duplicate events...');

        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Array<{ id: string, name?: string, slug?: string, [key: string]: any }>;

        console.log(`📊 Found ${events.length} total events`);

        // Group by name or slug to find duplicates
        const eventsByName = new Map();
        const duplicates = [];

        for (const event of events) {
            const identifier = (event.slug || event.name)?.toLowerCase().trim();
            if (eventsByName.has(identifier)) {
                // Keep the newer one (first in our ordered query), mark older for deletion
                duplicates.push(event.id);
                console.log(`🔍 Found duplicate: ${event.name} (ID: ${event.id})`);
            } else {
                eventsByName.set(identifier, event);
            }
        }

        if (duplicates.length > 0) {
            console.log(`🗑️ Removing ${duplicates.length} duplicate events...`);

            for (const duplicateId of duplicates) {
                await deleteDoc(doc(db, 'events', duplicateId));
                console.log(`✅ Removed duplicate event: ${duplicateId}`);
            }

            console.log(`🎉 Successfully removed ${duplicates.length} duplicates`);
            return duplicates.length;
        } else {
            console.log('✅ No duplicates found');
            return 0;
        }

    } catch (error) {
        console.error('❌ Error removing duplicates:', error);
        throw error;
    }
};

// Function to clean up all duplicates
export const cleanupDuplicateData = async () => {
    try {
        console.log('🧹 Starting cleanup of duplicate data...');

        const teamDuplicates = await removeDuplicateTeamMembers();
        const eventDuplicates = await removeDuplicateEvents();

        const totalRemoved = teamDuplicates + eventDuplicates;

        if (totalRemoved > 0) {
            console.log(`🎉 Cleanup completed! Removed ${totalRemoved} duplicates total (${teamDuplicates} team members, ${eventDuplicates} events)`);
        } else {
            console.log('✅ No duplicates found, database is clean!');
        }

        return totalRemoved;
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
};
