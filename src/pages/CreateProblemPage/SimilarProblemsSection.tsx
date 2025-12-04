import styles from "../CreateProblemsPage.module.scss";
import ProblemList from "./ProblemList";
import EmptySimilarProblemPlaceholder from "./EmptySimilarProblemPlaceholder";
import SimilarProblemCard from "@/components/ProblemCard/SimilarProblemCard";
import { useProblemContext } from "@/contexts/ProblemContext";

function SimilarProblemsSection() {
  const { similarProblems, addProblemAfterActive, replaceProblemWithActive } =
    useProblemContext();

  const handleChangeClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;

    // 유사문제 리스트의 해당 문제와 active 된 문제 교환
    replaceProblemWithActive(problem);
  };

  const handleAddClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;

    // 현재 문제를 Active 된 문제 바로 뒤에 추가하고 SimilarProblems 리스트에서 제거
    addProblemAfterActive(problem);
  };

  const problems = similarProblems || [];
  const hasProblems = problems.length > 0;

  return (
    <ProblemList type="similar">
      {hasProblems ? (
        <>
          <h2 className={styles.problem_title}>유사 문항</h2>
          <div className={styles.problem_list_wrap}>
            {problems.map((problem, index) => (
              <SimilarProblemCard
                key={problem.id}
                problem={problem}
                index={index + 1}
                onChangeClick={() => handleChangeClick(problem.id)}
                onAddClick={() => handleAddClick(problem.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptySimilarProblemPlaceholder />
      )}
    </ProblemList>
  );
}

export default SimilarProblemsSection;
