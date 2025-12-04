import { createContext, useContext, useState, type ReactNode } from "react";
import { useProblems, useSimilarProblems, useDeleteProblem } from "@/hooks/useProblems";
import type { Problem } from "@/types/problem";

type ProblemContextType = {
  problems: Problem[];
  similarProblems: Problem[] | undefined;
  activeProblemId: number | null;
  isLoading: boolean;
  error: Error | null;
  setActiveProblemId: (id: number | null) => void;
  deleteProblem: (id: number) => void;
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

type ProblemProviderProps = {
  children: ReactNode;
};

export function ProblemProvider({ children }: ProblemProviderProps) {
  const { data, isLoading, error } = useProblems();
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  const problems = data || [];
  const excludedIds = problems.map((p) => p.id);

  const { data: similarProblems } = useSimilarProblems(activeProblemId, excludedIds);
  const { mutate: deleteProblem } = useDeleteProblem();

  const value: ProblemContextType = {
    problems,
    similarProblems,
    activeProblemId,
    isLoading,
    error,
    setActiveProblemId,
    deleteProblem,
  };

  return <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>;
}

export function useProblemContext() {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error("useProblemContext must be used within a ProblemProvider");
  }
  return context;
}
