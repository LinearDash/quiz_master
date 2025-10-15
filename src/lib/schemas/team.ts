import z from "zod";

//i'll do it later
export const createTeamSchema = z.object({
  name: z.string().trim().min(1, "Team name is required"),
  teamLogo: z
    .string()
    .trim()
    .optional()
    .nullable(),
  gameSessionId: z.string().min(1, "Game session id is required"),
})

export const teamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  score: z.number().int(),
  gameSessionId: z.string().min(1, "Game session id is required"),
  teamLogo: z
    .string()
    .trim()
    .optional()
    .nullable(),
  createdAt: z.string().datetime(),
});

export type CreateTeamRequest = z.infer<typeof createTeamSchema>