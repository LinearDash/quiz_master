"use client";

import { use } from "react";
import { useFetchSessionData } from "@/hooks/rounds/sessions/useFetchSessionData";
import { Button } from "@/components/ui/button";
import { TeamsSection } from "@/components/TeamsSection";
import { RoundsSection } from "@/components/RoundsSection";
import { Trash2, Play } from "lucide-react";
import { RoundFormDialog } from "@/components/RoundFormDialog";
import { useState } from "react";

export default function Page({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const [openRoundForm, setOpenRoundForm] = useState(false);

  const { data: session, isLoading, error } = useFetchSessionData(sessionId);

  const handleAddTeam = () => {
    // TODO: Add team creation functionality
    console.log('Add team to session:', sessionId);
  };

  const handleAddRound = () => {
    // TODO: Add round creation functionality
    console.log('Add round to session:', sessionId);
    setOpenRoundForm(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading...</div>
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
              <h2 className="text-lg font-medium text-red-800 mb-2">Error Loading Session</h2>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Session Not Found</h2>
            <p className="text-gray-600">The session you&apos;re looking for doesn&apos;t exist.</p>
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{session.eventName}</h1>
              <p className="mt-2 text-gray-600">Organized by {session.organizerName}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center"
              onClick={() => {
                if (confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
                  // TODO: Add delete functionality
                  console.log('Delete session:', sessionId);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TeamsSection
            teams={session.teams}
            onAddTeam={handleAddTeam}
          />
          <RoundsSection
            rounds={session.rounds}
            onAddRound={handleAddRound}
          />
        </div>

        {/* Start Button */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="px-12 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg"
            onClick={() => {
              // TODO: Add start quiz functionality
              console.log('Start quiz for session:', sessionId);
            }}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Quiz
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Make sure you have at least one team and one round before starting
          </p>
        </div>
      </div>
      <RoundFormDialog open={openRoundForm} onOpenChange={setOpenRoundForm} sessionId={sessionId} />
    </div>
  );
}