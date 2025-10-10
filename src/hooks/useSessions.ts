import { useState, useEffect } from 'react';
import { Session } from '@/lib/schemas/session';

interface UseSessionsReturn {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSessions(): UseSessionsReturn {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/session');
      const data = await response.json();

      if (data.success) {
        setSessions(data.sessions);
      } else {
        setError(data.error || 'Failed to fetch sessions');
      }
    } catch (err) {
      setError('Failed to fetch sessions');
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
  };
}
