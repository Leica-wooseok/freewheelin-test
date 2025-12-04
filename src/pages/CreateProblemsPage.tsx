import styles from "./CreateProblemsPage.module.scss";
import SimilarProblemsSection from "./CreateProblemPage/SimilarProblemsSection";
import BasicProblemsSection from "./CreateProblemPage/BasicProblemsSection";
import { ProblemProvider, useProblemContext } from "@/contexts/ProblemContext";

function CreateProblemPage() {
  return (
    <ProblemProvider>
      <CreateProblemPageContent />
    </ProblemProvider>
  );
}

function CreateProblemPageContent() {
  const { isLoading, error } = useProblemContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.wrap}>
      <main className={styles.container}>
        <SimilarProblemsSection />
        <BasicProblemsSection />
      </main>
    </div>
  );
}

export default CreateProblemPage;
