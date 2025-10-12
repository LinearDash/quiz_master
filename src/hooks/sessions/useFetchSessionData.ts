import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session, sessionSchema } from "@/lib/schemas/session";
import { z } from "zod";

const SessionDetailResponse = z.object({
  success: z.boolean(),
  session: sessionSchema,
  error: z.string().optional(),
});

const fetchSessionData = async (id: string): Promise<Session> => {
  const { data } = await axios.get(`/api/session/${id}`);

  // Validate the response with Zod
  const validatedResponse = SessionDetailResponse.parse(data);

  if (validatedResponse.success) {
    return validatedResponse.session;
  } else {
    throw new Error(validatedResponse.error || 'Failed to fetch session');
  }
}

export function useFetchSessionData(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session", id],
    queryFn: () => fetchSessionData(id),
    enabled: !!id, // Only run if id exists
  });

  return { data, isLoading, error };
}