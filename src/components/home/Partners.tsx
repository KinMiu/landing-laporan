import React, { useState, useEffect } from 'react';
import { partnerAPI } from '../../services/api';
import { Partner } from '../../types';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await partnerAPI.getAll();
        setPartners(data);
        setError(null);
      } catch (err) {
        setError('Failed to load partners');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Tampilkan hanya 4 pertama jika tidak dalam mode "show all"
  const visiblePartners = showAll ? partners : partners.slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }
}
