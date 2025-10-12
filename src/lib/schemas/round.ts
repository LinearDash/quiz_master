import z from "zod";


export const gameModeEnum = z.enum(["QUESTION_PICK", "RAPID_FIRE", "AUDIO", "VISUAL"]);


export const roundSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Round name is required"),
  gameMode: gameModeEnum,
});

