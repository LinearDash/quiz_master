"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Trash2 } from "lucide-react";
import { roundSchema } from "@/lib/schemas/round";
import { z } from "zod";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";

type Round = z.infer<typeof roundSchema>;

interface RoundsSectionProps {
  rounds?: Round[];
  onAddRound: () => void;
  onDeleteRound: (roundId: string) => void;
}

export function RoundsSection({ rounds = [], onAddRound, onDeleteRound }: RoundsSectionProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Rounds</h2>
          <Badge variant="secondary" className="ml-1">{rounds.length}</Badge>
        </div>
        <Button size="sm" className="flex items-center" onClick={onAddRound}>
          <Plus className="mr-1 h-4 w-4" />
          Add Round
        </Button>
      </div>

      {rounds.length > 0 ? (
        <ul className="grid gap-3">
          {rounds.map((round) => {
            const stats = [
              typeof round.pointsPerQuestion === "number" ? `${round.pointsPerQuestion} Pts/Q` : undefined,
              typeof round.totalQuestions === "number" ? `${round.totalQuestions} Qns` : undefined,
              typeof round.durationInSeconds === "number" ? `${round.durationInSeconds}s` : undefined,
            ].filter(Boolean) as string[];

            return (
              <li key={round.id} className="rounded-lg border bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-medium text-gray-900">{round.name}</span>
                      <Badge variant="outline" className="uppercase">{round.gameMode}</Badge>
                    </div>
                    {stats.length > 0 && (
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        {stats.map((s, idx) => (
                          <span key={idx} className="rounded-full border px-2 py-0.5 bg-white">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelected({ id: round.id, name: round.name });
                        setDeleteOpen(true);
                      }}
                      aria-label="Delete round"
                      className="group"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 transition-colors group-hover:text-red-600" />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="py-8 text-center">
          <Clock className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <p className="mb-4 text-gray-500">No rounds added yet</p>
          <Button variant="outline" size="sm" onClick={onAddRound}>
            <Plus className="mr-1 h-4 w-4" />
            Add Your First Round
          </Button>
        </div>
      )}

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={(o) => {
          setDeleteOpen(o);
          if (!o) setIsDeleting(false);
        }}
        title="Delete round"
        description="This action cannot be undone. This will permanently delete the round:"
        entityLabel={selected?.name}
        confirmLabel="Delete"
        onConfirm={async () => {
          if (!selected) return;
          try {
            setIsDeleting(true);
            await Promise.resolve(onDeleteRound(selected.id));
            setDeleteOpen(false);
          } finally {
            setIsDeleting(false);
          }
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
