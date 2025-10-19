const BASE_URL = "https://api.minds.ai.kr";

export async function getScores() {
  const res = await fetch(`${BASE_URL}/scores`);
  if (!res.ok) throw new Error('Failed to fetch scores');
  return await res.json();
}

export async function getTeamData(teamId) {
  const res = await fetch(`${BASE_URL}/team/${teamId}`);
  if (!res.ok) throw new Error('Failed to fetch team data');
  return await res.json();
}
