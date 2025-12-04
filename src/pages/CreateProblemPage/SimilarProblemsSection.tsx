import ProblemList from "./ProblemList";
import EmptySimilarProblemPlaceholder from "./EmptySimilarProblemPlaceholder";

function SimilarProblemsSection() {
  return (
    <ProblemList type="similar">
      <EmptySimilarProblemPlaceholder />
    </ProblemList>
  );
}

export default SimilarProblemsSection;
