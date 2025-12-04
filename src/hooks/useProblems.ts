import { useQuery } from "@tanstack/react-query";
import { fetchProblems } from "@/api/problems";

export function useProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });
}
