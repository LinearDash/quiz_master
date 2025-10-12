"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users } from "lucide-react";
import { Team } from "@/lib/schemas/session";

interface TeamsSectionProps {
  teams?: Team[];
  onAddTeam: () => void;
}

export function TeamsSection({ teams = [], onAddTeam }: TeamsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Teams</h2>
          <Badge variant="secondary" className="ml-2">
            {teams.length}
          </Badge>
        </div>
        <Button size="sm" className="flex items-center" onClick={onAddTeam}>
          <Plus className="w-4 h-4 mr-1" />
          Add Team
        </Button>
      </div>

      {teams.length > 0 ? (
        <div className="space-y-3">
          {teams.map((team, index) => (
            <div key={team.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-gray-900">{team.name}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-blue-600">{team.score} pts</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No teams added yet</p>
          <Button variant="outline" size="sm" onClick={onAddTeam}>
            <Plus className="w-4 h-4 mr-1" />
            Add Your First Team
          </Button>
        </div>
      )}
    </div>
  );
}
