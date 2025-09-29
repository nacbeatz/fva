import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getTeamMembers,
  addTeamMember as addTeamMemberToFirebase,
  updateTeamMember as updateTeamMemberInFirebase,
  deleteTeamMember as deleteTeamMemberFromFirebase,
  getEvents,
  addEvent as addEventToFirebase,
  updateEvent as updateEventInFirebase,
  deleteEvent as deleteEventFromFirebase,
  initializeFirestore,
  TeamMember
} from '../services/firebaseService';

export interface EventItem {
  id?: string;
  slug: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  completed?: boolean;
  status?: "Upcoming" | "Ongoing" | "Completed";
  link?: string;
  featured?: boolean;
  isFVAEvent?: boolean; // New field to identify FVA events
  createdAt?: any;
  updatedAt?: any;
  // Additional fields for rich modal display
  venue?: string;
  registration?: {
    deadline?: string;
    regularFee?: string;
    lateFee?: string;
  };
  awardsNote?: string;
  categories?: Array<{
    title: string;
    distance?: string;
    ageRange?: string;
    genders?: string;
    prizes?: [string, string, string];
    notes?: string;
  }>;
}

interface DataContextType {
  teamMembers: TeamMember[];
  events: EventItem[];
  loading: boolean;
  error: string | null;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addEvent: (event: Omit<EventItem, 'slug' | 'id'>) => Promise<void>;
  updateEvent: (slug: string, event: Partial<EventItem>) => Promise<void>;
  deleteEvent: (slug: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from Firebase
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get team members and events from Firestore
      const teamData = await getTeamMembers();
      const eventsData = await getEvents();

      // Ensure all events have the isFVAEvent field set (default to true for existing events)
      const eventsWithFVAField = eventsData.map(event => ({
        ...event,
        isFVAEvent: event.isFVAEvent !== undefined ? event.isFVAEvent : true
      }));

      setTeamMembers(teamData);
      setEvents(eventsWithFVAField);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on first load
  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('🔄 Initializing DataContext...');

        // First, try to fetch existing data from Firestore
        await fetchData();
      } catch (err: any) {
        console.error('❌ Error initializing data:', err);
        setError(err.message || 'Failed to initialize data');
        setLoading(false);
      }
    };

    initializeData();
  }, []); // Empty dependency array to run only once

  // Separate effect to handle seeding only if needed
  useEffect(() => {
    const handleSeeding = async () => {
      // Only seed if we have no team members and no events after initial fetch
      if (!loading && teamMembers.length === 0 && events.length === 0) {
        console.log('📦 No data found, checking if we need to seed database...');

        try {
          // Import initial team data for seeding (events are now admin-only)
          const teamModule = await import('../components/Team');

          // Only seed team members if we have static data to seed with
          if (teamModule.teamMembers && teamModule.teamMembers.length > 0) {
            console.log('🌱 Seeding database with initial team data...');
            await initializeFirestore(teamModule.teamMembers, []);

            // Fetch data again after seeding
            await fetchData();
          }
        } catch (seedError) {
          console.warn('⚠️ Could not seed database with initial data:', seedError);
        }
      }
    };

    handleSeeding();
  }, [loading, teamMembers.length, events.length]); // Run when loading state or data changes

  // Function to refresh data from Firestore
  const refreshData = async () => {
    await fetchData();
  };

  // Team Member CRUD operations
  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    try {
      setLoading(true);
      const newMember = await addTeamMemberToFirebase(member);
      setTeamMembers(prev => [...prev, newMember as TeamMember]);
      setError(null);
    } catch (err: any) {
      console.error('Error adding team member:', err);
      setError(err.message || 'Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    try {
      setLoading(true);
      await updateTeamMemberInFirebase(id, updates);
      setTeamMembers(prev => prev.map(member =>
        member.id === id ? { ...member, ...updates } : member
      ));
      setError(null);
    } catch (err: any) {
      console.error('Error updating team member:', err);
      setError(err.message || 'Failed to update team member');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      setLoading(true);
      await deleteTeamMemberFromFirebase(id);
      setTeamMembers(prev => prev.filter(member => member.id !== id));
      setError(null);
    } catch (err: any) {
      console.error('Error deleting team member:', err);
      setError(err.message || 'Failed to delete team member');
    } finally {
      setLoading(false);
    }
  };

  // Event CRUD operations
  const addEvent = async (event: Omit<EventItem, 'slug' | 'id'>) => {
    try {
      setLoading(true);
      const newEvent = await addEventToFirebase(event);
      setEvents(prev => [...prev, newEvent as EventItem]);
      setError(null);
    } catch (err: any) {
      console.error('Error adding event:', err);
      setError(err.message || 'Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (slug: string, updates: Partial<EventItem>) => {
    try {
      setLoading(true);
      await updateEventInFirebase(slug, updates);
      setEvents(prev => prev.map(event =>
        event.slug === slug ? { ...event, ...updates } : event
      ));
      setError(null);
    } catch (err: any) {
      console.error('Error updating event:', err);
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (slug: string) => {
    try {
      setLoading(true);
      await deleteEventFromFirebase(slug);
      setEvents(prev => prev.filter(event => event.slug !== slug));
      setError(null);
    } catch (err: any) {
      console.error('Error deleting event:', err);
      setError(err.message || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      teamMembers,
      events,
      loading,
      error,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addEvent,
      updateEvent,
      deleteEvent,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}