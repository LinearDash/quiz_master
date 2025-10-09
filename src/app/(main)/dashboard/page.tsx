
"use client";

import { useEffect, useState } from "react";
import SessionCard from "@/components/sessionCard";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge"

// So that typescript won't complain 
type Session = {
  id: string;
  eventName: string;
  organizerName: string;
  organizerImage?: string;
  createdAt: string;
  teams?: Array<{ id: string; name: string; score: number }>;
  rounds?: Array<{ id: string; name?: string; gameMode: string }>;
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quiz Sessions</h1>
            <p className="mt-2 text-gray-600">Manage and view your quiz game sessions</p>
          </div>
          <div className="flex items-center justify-center ">
            <Badge className="bg-gray-400">
              <Spinner /> Loading
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-red-800 mb-2">Error Loading Sessions</h2>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchSessions}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Sessions</h1>
          <p className="mt-2 text-gray-600">Manage and view your quiz game sessions</p>
        </div>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
              <p className="text-gray-500 mb-6">Create your first quiz session to get started.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create New Session
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
