import z from "zod";

//i'll do it later
export const createTeamSchema = z.object({

})

export const teamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  score: z.number().int(),
});