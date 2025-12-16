import React, {createContext, useContext, useState, useEffect} from "react";
import {aparaturDesa, Activity, Event} from "../types";
import {aparaturDesaAPI, activityAPI, eventAPI} from "../services/api";

interface PublicCampusDataContextType {
  aparatur: aparaturDesa[];
  activity: Activity[];
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const PublicCampusDataContext = createContext<
  PublicCampusDataContextType | undefined
>(undefined);

export const usePublicCampusData = () => {
  const context = useContext(PublicCampusDataContext);
  if (!context) {
    throw new Error(
      "usePublicCampusData must be used within a PublicCampusDataProvider"
    );
  }
  return context;
};

export const PublicCampusDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [aparatur, setAparatur] = useState<aparaturDesa[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [aparaturData, achievementsData, eventsData] = await Promise.all([
        aparaturDesaAPI.getAll(),
        activityAPI.getAll(),
        eventAPI.getAll(),
      ]);
      setAparatur(aparaturData);
      setActivity(achievementsData);
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value: PublicCampusDataContextType = {
    aparatur,
    activity,
    events,
    loading,
    error,
    refreshData: fetchData,
  };

  return (
    <PublicCampusDataContext.Provider value={value}>
      {children}
    </PublicCampusDataContext.Provider>
  );
};
