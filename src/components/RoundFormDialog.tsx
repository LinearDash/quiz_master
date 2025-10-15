"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateRoundRequest } from "@/lib/schemas/round"
import { useCreateRound } from "@/hooks/rounds/useCreateRound"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string
}

export function RoundFormDialog({ open, onOpenChange, sessionId }: Props) {
  const [formData, setFormData] = useState<CreateRoundRequest>({
    name: "",
    gameMode: "QUESTION_PICK",
    pointsPerQuestion: 10,
    totalQuestions: 20,
    durationInSeconds: 60,
    gameSessionId: sessionId
  })

  const { mutate: createRound } = useCreateRound();
  const reset = () => {
    setFormData({
      gameSessionId: '',
      name: "",
      gameMode: "QUESTION_PICK",
      pointsPerQuestion: 10,
      totalQuestions: 20,
      durationInSeconds: 60
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createRound(formData, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Failed to create round:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create New Round</DialogTitle>
          <DialogDescription>Configure the round settings and add it to this session.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <fieldset className="rounded-lg border p-4">
              <legend className="px-1 text-sm font-medium text-muted-foreground">Round basics</legend>
              <div className="mt-3 grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="round-name">Round Name<span className="ml-1 text-red-500">*</span></Label>
                  <Input
                    id="round-name"
                    placeholder="e.g. Rapid Round, Audio Quiz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    aria-describedby="round-name-hint"
                  />
                  <p id="round-name-hint" className="text-xs text-muted-foreground">Give this round a short, descriptive name.</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="game-mode">Game Mode</Label>
                  <select
                    id="game-mode"
                    value={formData.gameMode}
                    onChange={(e) => setFormData({ ...formData, gameMode: e.target.value as CreateRoundRequest["gameMode"] })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-describedby="game-mode-hint"
                  >
                    <option value="QUESTION_PICK">Question Pick</option>
                    <option value="RAPID_FIRE">Rapid Fire</option>
                    <option value="AUDIO">Audio</option>
                    <option value="VISUAL">Visual</option>
                  </select>
                  <p id="game-mode-hint" className="text-xs text-muted-foreground">Choose how teams will play in this round.</p>
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-lg border p-4">
              <legend className="px-1 text-sm font-medium text-muted-foreground">Scoring & timing</legend>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="points">Points / Question</Label>
                  <Input
                    id="points"
                    type="number"
                    inputMode="numeric"
                    placeholder="10"
                    value={formData.pointsPerQuestion ?? ""}
                    onChange={(e) => setFormData({ ...formData, pointsPerQuestion: e.target.value ? Number(e.target.value) : 0 })}
                    min={0}
                    aria-describedby="points-hint"
                  />
                  <p id="points-hint" className="text-xs text-muted-foreground">Default: 10</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="questions">Total Questions</Label>
                  <Input
                    id="questions"
                    type="number"
                    inputMode="numeric"
                    placeholder="20"
                    value={formData.totalQuestions ?? ""}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value ? Number(e.target.value) : undefined })}
                    min={1}
                    aria-describedby="questions-hint"
                  />
                  <p id="questions-hint" className="text-xs text-muted-foreground">Leave empty if variable.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (sec)</Label>
                  <Input
                    id="duration"
                    type="number"
                    inputMode="numeric"
                    placeholder="60"
                    value={formData.durationInSeconds ?? ""}
                    onChange={(e) => setFormData({ ...formData, durationInSeconds: e.target.value ? Number(e.target.value) : undefined })}
                    min={10}
                    aria-describedby="duration-hint"
                  />
                  <p id="duration-hint" className="text-xs text-muted-foreground">Minimum recommended: 10s</p>
                </div>
              </div>
            </fieldset>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} >
              Cancel
            </Button>
            <Button type="submit" >
              {"Create Round"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


