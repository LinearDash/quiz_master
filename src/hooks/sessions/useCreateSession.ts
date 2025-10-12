import { CreateSessionRequest } from "@/lib/schemas/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createSession = async (data: CreateSessionRequest) => {
  const response = await axios.post("/api/session", data);
  console.log("Session created:", response.data);
  return response.data; // Return the response data
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error) => {
      console.log(error);

    }
  })


}