import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { EventItem } from '../contexts/DataContext';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    country: string;
    image: string;
    bio: string;
    achievements?: string[];
    category: "senior-ladies" | "senior-men";
    instagram?: string;
    createdAt?: any;
    updatedAt?: any;
}

// Team Members Services
export const getTeamMembers = async () => {
    const teamRef = collection(db, 'team');
    const q = query(teamRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as TeamMember[];
};

export const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    const teamRef = collection(db, 'team');
    const docRef = await addDoc(teamRef, {
        ...member,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...member };
};

export const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    const teamRef = doc(db, 'team', id);
    await updateDoc(teamRef, {
        ...updates,
        updatedAt: serverTimestamp()
    });
    return { id, ...updates };
};

export const deleteTeamMember = async (id: string) => {
    const teamRef = doc(db, 'team', id);
    await deleteDoc(teamRef);
    return id;
};

// Events Services
export const getEvents = async () => {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as EventItem[];
};

export const addEvent = async (event: Omit<EventItem, 'slug'>) => {
    const slug = event.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const eventWithSlug = {
        ...event,
        slug,
        status: event.status || "Upcoming",
        link: event.link || "#",
        featured: event.featured || false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    const eventsRef = collection(db, 'events');
    const docRef = await addDoc(eventsRef, eventWithSlug);
    return { id: docRef.id, ...eventWithSlug };
};

export const updateEvent = async (slug: string, updates: Partial<EventItem>) => {
    // First find the document with this slug
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef);
    const snapshot = await getDocs(q);
    const eventDoc = snapshot.docs.find(doc => doc.data().slug === slug);

    if (!eventDoc) {
        throw new Error(`Event with slug ${slug} not found`);
    }

    const eventRef = doc(db, 'events', eventDoc.id);
    await updateDoc(eventRef, {
        ...updates,
        updatedAt: serverTimestamp()
    });

    return { slug, ...updates };
};

export const deleteEvent = async (slug: string) => {
    // First find the document with this slug
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef);
    const snapshot = await getDocs(q);
    const eventDoc = snapshot.docs.find(doc => doc.data().slug === slug);

    if (!eventDoc) {
        throw new Error(`Event with slug ${slug} not found`);
    }

    const eventRef = doc(db, 'events', eventDoc.id);
    await deleteDoc(eventRef);
    return slug;
};

// Image Upload Service
export const uploadImage = async (file: File, path: string): Promise<string> => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    try {
        // Create a unique filename to avoid conflicts
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `${path}/${fileName}`);

        console.log('Starting upload to:', `${path}/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            // Set a timeout for the upload (30 seconds)
            const timeout = setTimeout(() => {
                console.error('Upload timeout after 30 seconds');
                reject(new Error('Upload timeout - please check your Firebase Storage configuration'));
            }, 30000);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress monitoring
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload progress:', progress + '%');
                },
                (error) => {
                    clearTimeout(timeout);
                    console.error('Upload error:', error);
                    console.error('Error code:', error.code);
                    console.error('Error message:', error.message);

                    // Provide more specific error messages
                    if (error.code === 'storage/unauthorized') {
                        reject(new Error('Storage access denied. Please check Firebase Storage rules.'));
                    } else if (error.code === 'storage/canceled') {
                        reject(new Error('Upload was canceled.'));
                    } else if (error.code === 'storage/unknown') {
                        reject(new Error('Unknown storage error. Please check your Firebase configuration.'));
                    } else {
                        reject(new Error(`Upload failed: ${error.message}`));
                    }
                },
                async () => {
                    try {
                        clearTimeout(timeout);
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('Upload successful, download URL:', downloadURL);
                        resolve(downloadURL);
                    } catch (error: any) {
                        clearTimeout(timeout);
                        console.error('Error getting download URL:', error);
                        reject(new Error(`Failed to get download URL: ${error.message}`));
                    }
                }
            );
        });
    } catch (error: any) {
        console.error('Upload service error:', error);
        throw new Error(`Upload service error: ${error.message}`);
    }
};// Initialize collections with default data if empty
export const initializeFirestore = async (teamData: TeamMember[], eventsData: EventItem[]) => {
    try {
        console.log('🔍 Checking if database initialization is needed...');

        // Check if team collection is empty
        const teamSnapshot = await getDocs(collection(db, 'team'));
        console.log(`📊 Found ${teamSnapshot.size} existing team members`);

        if (teamSnapshot.empty && teamData.length > 0) {
            console.log('🌱 Initializing team members...');
            // Add team members
            for (const member of teamData) {
                const memberWithoutId = { ...member };
                delete (memberWithoutId as any).id;

                await addDoc(collection(db, 'team'), {
                    ...memberWithoutId,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            }
            console.log(`✅ Initialized ${teamData.length} team members`);
        } else if (!teamSnapshot.empty) {
            console.log('⏭️ Team collection already has data, skipping team initialization');
        }

        // Check if events collection is empty
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        console.log(`📊 Found ${eventsSnapshot.size} existing events`);

        if (eventsSnapshot.empty && eventsData.length > 0) {
            console.log('🌱 Initializing events...');
            // Add events
            for (const event of eventsData) {
                await addDoc(collection(db, 'events'), {
                    ...event,
                    status: event.status || "Upcoming",
                    link: event.link || "#",
                    featured: event.featured || false,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            }
            console.log(`✅ Initialized ${eventsData.length} events`);
        } else if (!eventsSnapshot.empty) {
            console.log('⏭️ Events collection already has data, skipping events initialization');
        }

        console.log('🎉 Database initialization completed');
    } catch (error) {
        console.error('❌ Error during database initialization:', error);
        throw error;
    }
};
