import { createContext, useContext, useState, type ReactNode } from "react";
import {
  useProblems,
  useSimilarProblems,
  useDeleteProblem,
  useAddProblem,
  useReplaceProblem,
} from "@/hooks/useProblems";
import type { Problem } from "@/types/problem";
import { useQueryClient } from "@tanstack/react-query";

type ProblemContextType = {
  problems: Problem[];
  similarProblems: Problem[] | undefined;
  activeProblemId: number | null;
  isLoading: boolean;
  error: Error | null;
  setActiveProblemId: (id: number | null) => void;
  deleteProblem: (id: number) => void;
  addProblemAfterActive: (problem: Problem) => void;
  replaceProblemWithActive: (problem: Problem) => void;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

type ProblemProviderProps = {
  children: ReactNode;
};

export function ProblemProvider({ children }: ProblemProviderProps) {
  const { data, isLoading, error } = useProblems();
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const problems = data || [];
  const excludedIds = problems.map((p) => p.id);

  const { data: similarProblems } = useSimilarProblems(
    activeProblemId,
    excludedIds
  );
  const { mutate: deleteProblem } = useDeleteProblem(activeProblemId);
  const { mutate: addProblem } = useAddProblem();
  const { mutate: replaceProblem } = useReplaceProblem();

  const addProblemAfterActive = (problem: Problem) => {
    if (activeProblemId === null) return;

    // 기본 문제 목록에 추가
    addProblem({ problem, afterProblemId: activeProblemId });

    // 유사 문제 목록에서 제거
    queryClient.setQueryData(
      ["problems", "similar", activeProblemId],
      (old: any) => {
        if (!Array.isArray(old)) return old;
        return old.filter((p: Problem) => p.id !== problem.id);
      }
    );
  };

  const replaceProblemWithActive = (problem: Problem) => {
    if (activeProblemId === null) return;

    // 기본 문제 목록에서 교체 (훅에서 similarProblems 교체도 처리)
    // onSuccess 콜백에서 activeProblemId 변경 (onMutate 완료 후 실행되어 refetch 방지)
    replaceProblem(
      { targetProblemId: activeProblemId, newProblem: problem },
      {
        onSuccess: () => {
          setActiveProblemId(problem.id);
        },
      }
    );
  };

  const value: ProblemContextType = {
    problems,
    similarProblems,
    activeProblemId,
    isLoading,
    error,
    setActiveProblemId,
    deleteProblem,
    addProblemAfterActive,
    replaceProblemWithActive,
  };

  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
}

export function useProblemContext() {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error("useProblemContext must be used within a ProblemProvider");
  }
  return context;
}
