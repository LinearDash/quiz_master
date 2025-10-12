"use client"

import type React from "react"

import { useState, useRef, type DragEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateSession } from "@/hooks/sessions/useCreateSession"
import { CreateSessionRequest } from "@/lib/schemas/session"

interface EventFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventFormDialog({ open, onOpenChange }: EventFormDialogProps) {
  const [data, setData] = useState<CreateSessionRequest>({
    eventName: "",
    organizerName: "",
    organizerImage: ""
  })

  const { mutate: createSession, isPending, error, isSuccess } = useCreateSession()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createSession(data, {
      onSuccess: () => {
        console.log("Session created successfully!");
        // Close dialog and reset form on success
        onOpenChange(false)
        setData({
          eventName: "",
          organizerName: "",
          organizerImage: ""
        })
      },
      onError: (error) => {
        console.error("Failed to create session:", error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details below to create a new event.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error.message}</p>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                placeholder="Enter event name"
                value={data.eventName}
                onChange={(e) => setData({ ...data, eventName: e.target.value })}
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organizer-name">Organizer Name</Label>
              <Input
                id="organizer-name"
                placeholder="Enter organizer name"
                value={data.organizerName}
                onChange={(e) => setData({ ...data, organizerName: e.target.value })}
                required
                disabled={isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
