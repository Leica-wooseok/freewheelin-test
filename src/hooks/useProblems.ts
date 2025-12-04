import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProblems, fetchSimilarProblems } from "@/api/problems";

export function useProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });
}

export function useSimilarProblems(
  problemId: number | null,
  excludedProblemIds: number[]
) {
  return useQuery({
    queryKey: ["problems", "similar", problemId],
    queryFn: () => fetchSimilarProblems(problemId!, excludedProblemIds),
    enabled: problemId !== null,
  });
}

export function useDeleteProblem(activeProblemId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deletedId: number) => {
      // 클라이언트 사이드에서만 삭제 (서버 요청 없음)
      console.log("Deleting problem (client-side only):", deletedId);
      return Promise.resolve();
    },
    onMutate: async (deletedId) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["problems"] });

      // 이전 데이터 백업
      const previousProblems = queryClient.getQueryData(["problems"]);

      // UI에서 즉시 제거
      queryClient.setQueryData(["problems"], (old: any) => {
        if (!Array.isArray(old)) return old;
        return old.filter((p: any) => p.id !== deletedId);
      });

      return { previousProblems };
    },
    onSuccess: (_data, deletedId) => {
      // 삭제된 문제가 현재 active된 문제인 경우에만 유사 문제 쿼리 무효화
      if (deletedId === activeProblemId) {
        queryClient.invalidateQueries({ queryKey: ["problems", "similar"] });
      }
    },
  });
}
