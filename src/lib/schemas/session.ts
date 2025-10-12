import { z } from "zod";
import { roundSchema } from "./round";


export const teamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  score: z.number().int(),
});


// Schema for creating a new session (POST request body)
export const createSessionSchema = z.object({
  eventName: z.string().trim().min(1, "Event Name is required"),
  organizerName: z.string().trim().min(1, "Organizer name is required"),
  organizerImage: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

// Schema for the complete session object (GET response)
export const sessionSchema = z.object({
  id: z.string().min(1),
  eventName: z.string().min(1),
  organizerName: z.string().min(1),
  organizerImage: z.string().url().optional().nullable(),
  createdAt: z.string().datetime(),
  teams: z.array(teamSchema).optional(),
  rounds: z.array(roundSchema).optional(),
  _count: z.object({
    teams: z.number().int(),
    rounds: z.number().int(),
  }).optional(),
});

// TypeScript types
export type CreateSessionRequest = z.infer<typeof createSessionSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type Team = z.infer<typeof teamSchema>;



