import { useProblemContext } from "@/contexts/ProblemContext";

export function useProblemCardActions() {
  const {
    similarProblems,
    activeProblemId,
    setActiveProblemId,
    deleteProblem,
    addProblemAfterActive,
    replaceProblemWithActive,
  } = useProblemContext();

  const handleSimilarClick = (problemId: number) => {
    setActiveProblemId(problemId);
  };

  const handleDeleteClick = (problemId: number) => {
    deleteProblem(problemId);

    if (problemId === activeProblemId) setActiveProblemId(null);
  };

  const handleChangeClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;

    replaceProblemWithActive(problem);
  };

  const handleAddClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;

    addProblemAfterActive(problem);
  };

  return {
    handleSimilarClick,
    handleDeleteClick,
    handleChangeClick,
    handleAddClick,
  };
}
