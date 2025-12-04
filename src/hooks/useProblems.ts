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

type AddProblemParams = {
  problem: any;
  afterProblemId: number;
};

export function useAddProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ problem, afterProblemId }: AddProblemParams) => {
      // 클라이언트 사이드에서만 추가 (서버 요청 없음)
      console.log("Adding problem (client-side only):", problem.id, "after", afterProblemId);
      return Promise.resolve();
    },
    onMutate: async ({ problem, afterProblemId }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["problems"] });

      // 이전 데이터 백업
      const previousProblems = queryClient.getQueryData(["problems"]);

      // UI에서 즉시 추가 (afterProblemId 바로 뒤에 삽입)
      queryClient.setQueryData(["problems"], (old: any) => {
        if (!Array.isArray(old)) return old;

        const targetIndex = old.findIndex((p: any) => p.id === afterProblemId);
        if (targetIndex === -1) return old;

        const newProblems = [...old];
        newProblems.splice(targetIndex + 1, 0, problem);
        return newProblems;
      });

      return { previousProblems };
    },
  });
}

type ReplaceProblemParams = {
  targetProblemId: number;
  newProblem: any;
};

export function useReplaceProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ targetProblemId, newProblem }: ReplaceProblemParams) => {
      // 클라이언트 사이드에서만 교체 (서버 요청 없음)
      console.log("Replacing problem (client-side only):", targetProblemId, "with", newProblem.id);
      return Promise.resolve();
    },
    onMutate: async ({ targetProblemId, newProblem }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ["problems"] });

      // 이전 데이터 백업
      const previousProblems = queryClient.getQueryData(["problems"]);

      // UI에서 즉시 교체
      queryClient.setQueryData(["problems"], (old: any) => {
        if (!Array.isArray(old)) return old;

        const targetIndex = old.findIndex((p: any) => p.id === targetProblemId);
        if (targetIndex === -1) return old;

        const newProblems = [...old];
        newProblems[targetIndex] = newProblem;
        return newProblems;
      });

      return { previousProblems };
    },
  });
}
