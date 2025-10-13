import z from "zod";

// Enum for game mode
export const gameModeEnum = z.enum(["QUESTION_PICK", "RAPID_FIRE", "AUDIO", "VISUAL"]);

// Schema for creating a round
export const createRoundSchema = z.object({
  name: z.string().min(1, "Round name is required"),
  gameMode: gameModeEnum,
  gameSessionId: z.string().min(1, "Game session id is required"),
  pointsPerQuestion: z.number().default(10),
  totalQuestions: z.number().optional(),
  durationInSeconds: z.number().optional(),
})

// Schema for a round
export const roundSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Round name is required"),
  gameMode: gameModeEnum,
  gameSessionId: z.string().min(1, "Game session id is required"),
  pointsPerQuestion: z.number().default(10),
  totalQuestions: z.number().optional(),
  durationInSeconds: z.number().optional(),
  createdAt: z.string().datetime(),
  _count: z.object({
    questions: z.number().int(),
  }).optional(),
});

export type CreateRoundRequest = z.infer<typeof createRoundSchema>
