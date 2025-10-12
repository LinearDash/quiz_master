import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { sessionSchema } from "@/lib/schemas/session";
import z from "zod";

const responseData = z.object({
  success: z.boolean,
  sessions: z.array(sessionSchema)
})

const fetchSessions = async (): Promise<z.infer<typeof responseData>> => {
  const { data } = await axios.get("/api/session");
  return data;
}

export function useSessions() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSessions
  })

  return { data, error, isLoading, refetch };
}
