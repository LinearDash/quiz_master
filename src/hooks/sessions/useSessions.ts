import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session, sessionSchema } from "@/lib/schemas/session";
import z from "zod";


const responseData = z.object({
  success: z.boolean(),
  sessions: z.array(sessionSchema),
  error: z.string().optional()

})

const fetchSessions = async (): Promise<Session[]> => {

  const { data } = await axios.get("/api/session");
  console.log(data);

  const validatedResponse = responseData.safeParse(data);;

  if (validatedResponse.success) {
    return validatedResponse.data.sessions;
  } else {
    throw new Error(validatedResponse.error?.message || 'Failed to fetch sessions');
  }
}

export function useSessions() {
  console.log("Hellow");

  const { data: sessions, error, isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions
  })

  return { sessions, error, isLoading, refetch };
}
