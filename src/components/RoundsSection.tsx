"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock } from "lucide-react";
import { roundSchema } from "@/lib/schemas/round";
import { z } from "zod";

type Round = z.infer<typeof roundSchema>;

interface RoundsSectionProps {
  rounds?: Round[];
  onAddRound: () => void;
}

export function RoundsSection({ rounds = [], onAddRound }: RoundsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Rounds</h2>
          <Badge variant="secondary" className="ml-2">
            {rounds.length}
          </Badge>
        </div>
        <Button size="sm" className="flex items-center" onClick={onAddRound}>
          <Plus className="w-4 h-4 mr-1" />
          Add Round
        </Button>
      </div>

      {rounds.length > 0 ? (
        <div className="space-y-3">
          {rounds.map((round) => (
            <div key={round.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{round.name}</span>
                  <p className="text-sm text-gray-500 mt-1">
                    {round.gameMode.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
                <Badge variant="outline">{round.gameMode}</Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No rounds added yet</p>
          <Button variant="outline" size="sm" onClick={onAddRound}>
            <Plus className="w-4 h-4 mr-1" />
            Add Your First Round
          </Button>
        </div>
      )}
    </div>
  );
}
