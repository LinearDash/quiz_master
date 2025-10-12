import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "@/lib/schemas/session";


const fetchSessions = async () => {
  const response = await axios.get("/api/session");
  return response.data.sessions; // Return just the sessions array
}

export function useSessions() {
  const { data: sessions = [], error, isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions
  })

  return { sessions, error, isLoading, refetch };
}
