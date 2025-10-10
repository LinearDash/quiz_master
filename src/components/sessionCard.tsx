import { Calendar, User, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Session } from '@/lib/schemas/session';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function SessionCard({ sessionData }: { sessionData: Session }) {
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {sessionData.eventName}
            </h3>
            <div className="flex items-center text-muted-foreground mb-3">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">Organized by {sessionData.organizerName}</span>
            </div>
          </div>
          <Avatar className="ml-4 h-12 w-12">
            {sessionData.organizerImage ? (
              <AvatarImage
                src={sessionData.organizerImage}
                alt={sessionData.organizerName}
              />
            ) : null}
            <AvatarFallback className="text-sm font-medium">
              {getInitials(sessionData.organizerName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date */}
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(sessionData.createdAt)}</span>
          </div>

          {/* Teams Count */}
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {sessionData.teams?.length || 0} team{(sessionData.teams?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Rounds Count */}
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {sessionData.rounds?.length || 0} round{(sessionData.rounds?.length || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Game Modes */}
        {sessionData.rounds && sessionData.rounds.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Game Modes:</h4>
            <div className="flex flex-wrap gap-2">
              {sessionData.rounds.slice(0, 3).map((round) => (
                <Badge
                  key={round.id}
                  variant="secondary"
                  className="text-xs"
                >
                  {round.name || getGameModeDisplay(round.gameMode)}
                </Badge>
              ))}
              {sessionData.rounds.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{sessionData.rounds.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Teams Leaderboard */}
        {sessionData.teams && sessionData.teams.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Teams:</h4>
            <div className="space-y-2">
              {sessionData.teams
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((team, index) => (
                  <div key={team.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{team.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{team.score} pts</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="ghost" className="w-full justify-between">
          <Link href={`/dashboard/${sessionData.id}`}>
            View Session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}