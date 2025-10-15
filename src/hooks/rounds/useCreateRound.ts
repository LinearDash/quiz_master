import { CreateRoundRequest } from "@/lib/schemas/round";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createRound = async (data: CreateRoundRequest) => {
  const response = await axios.post("/api/round", data);
  return response.data;
}

export function useCreateRound() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRound,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
    onError: (error) => {
      console.log(error);

    }
  })
}