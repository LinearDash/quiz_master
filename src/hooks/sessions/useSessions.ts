import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session, sessionSchema } from "@/lib/schemas/session";
import z from "zod";


const responseData = z.object({
  success: z.boolean,
  sessions: z.array(sessionSchema),
  error: z.string().optional()

})

const fetchSessions = async (): Promise<Session[]> => {
  const { data } = await axios.get("/api/session");
  const validatedResponse = responseData.parse(data);

  if (validatedResponse.success) {
    return validatedResponse.sessions;
  } else {
    throw new Error(validatedResponse.error || 'Failed to fetch sessions');
  }
}

export function useSessions() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions
  })

  return { data, error, isLoading, refetch };
}
