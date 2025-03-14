export default function categoryByTScore(tScore: number) {
  if (tScore >= 70) return "우선관심군";
  else if (tScore >= 65) return "관심군"
  else return "일반군"
}
