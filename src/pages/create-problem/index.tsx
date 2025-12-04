import styles from "./styles.module.scss";
import SimilarProblemsSection from "./components/SimilarProblemsSection";
import BasicProblemsSection from "./components/BasicProblemsSection";
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
