
import { Calendar, User, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Session {
  id: string;
  eventName: string;
  organizerName: string;
  organizerImage?: string;
  createdAt: string;
  teams?: Array<{ id: string; name: string; score: number }>;
  rounds?: Array<{ id: string; name?: string; gameMode: string }>;
}

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGameModeDisplay = (gameMode: string) => {
    switch (gameMode) {
      case 'QUESTION_PICK':
        return 'Question Pick';
      case 'RAPID_FIRE':
        return 'Rapid Fire';
      case 'AUDIO':
        return 'Audio Round';
      case 'VISUAL':
        return 'Visual Round';
      default:
        return gameMode;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {session.eventName}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">Organized by {session.organizerName}</span>
            </div>
          </div>
          {session.organizerImage && (
            <div className="ml-4">
              <img
                src={session.organizerImage}
                alt={session.organizerName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Date */}
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(session.createdAt)}</span>
          </div>

          {/* Teams Count */}
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {session.teams?.length || 0} team{(session.teams?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Rounds Count */}
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {session.rounds?.length || 0} round{(session.rounds?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Game Modes */}
        {session.rounds && session.rounds.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Game Modes:</h4>
            <div className="flex flex-wrap gap-2">
              {session.rounds.slice(0, 3).map((round, index) => (
                <span
                  key={round.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {round.name || getGameModeDisplay(round.gameMode)}
                </span>
              ))}
              {session.rounds.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{session.rounds.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Teams Leaderboard */}
        {session.teams && session.teams.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Teams:</h4>
            <div className="space-y-1">
              {session.teams
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((team, index) => (
                  <div key={team.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-2">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{team.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{team.score} pts</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Link
          href={`/dashboard/${session.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
        >
          View Session
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
