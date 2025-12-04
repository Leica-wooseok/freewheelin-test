import type { ProblemsResponse } from "@/types/problem";

const API_BASE_URL = "https://assignment.mathflat.com";

export async function fetchProblems(): Promise<ProblemsResponse> {
  const response = await fetch(`${API_BASE_URL}/problems`);

  if (!response.ok) {
    throw new Error(`Failed to fetch problems: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchSimilarProblems(
  problemId: number,
  excludedProblemIds: number[]
): Promise<ProblemsResponse> {
  const excludedIds = excludedProblemIds.join(",");
  const url = `${API_BASE_URL}/problems/${problemId}/similarity?excludedProblemIds=${excludedIds}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch similar problems: ${response.statusText}`);
  }

  return response.json();
}
