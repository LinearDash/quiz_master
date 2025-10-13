"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateRoundRequest } from "@/lib/schemas/round"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string
}

export function RoundFormDialog({ open, onOpenChange, sessionId }: Props) {
  const [data, setData] = useState<CreateRoundRequest>({
    name: "",
    gameMode: "QUESTION_PICK",
    pointsPerQuestion: 10,
    totalQuestions: 20,
    durationInSeconds: 60,
    gameSessionId: ''
  })

  const reset = () => {
    setData({
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

  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create New Round</DialogTitle>
          <DialogDescription>Configure the round settings and add it to this session.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">


            <div className="grid gap-2">
              <Label htmlFor="round-name">Round Name</Label>
              <Input
                id="round-name"
                placeholder="Enter round name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required

              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="game-mode">Game Mode</Label>
              <select
                id="game-mode"
                value={data.gameMode}
                onChange={(e) => setData({ ...data, gameMode: e.target.value as typeof gameMode })}

                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="QUESTION_PICK">Question Pick</option>
                <option value="RAPID_FIRE">Rapid Fire</option>
                <option value="AUDIO">Audio</option>
                <option value="VISUAL">Visual</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="points">Points / Question</Label>
                <Input
                  id="points"
                  type="number"
                  inputMode="numeric"
                  value={data.pointsPerQuestion ?? ""}
                  onChange={(e) => setData({ ...data, pointsPerQuestion: e.target.value ? Number(e.target.value) : undefined })}

                  min={0}

                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="questions">Total Questions</Label>
                <Input
                  id="questions"
                  type="number"
                  inputMode="numeric"
                  value={data.totalQuestions ?? ""}
                  onChange={(e) => setData({ ...data, totalQuestions: e.target.value ? Number(e.target.value) : undefined })}
                  min={1}

                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (sec)</Label>
                <Input
                  id="duration"
                  type="number"
                  inputMode="numeric"
                  value={data.durationInSeconds ?? ""}
                  onChange={(e) => setData({ ...data, durationInSeconds: e.target.value ? Number(e.target.value) : undefined })}
                  min={10}

                />
              </div>
            </div>
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


