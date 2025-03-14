const scoreCategories = {
  boy: [
    { min: 0, max: 2, 구분: "일반군" },
    { min: 3, max: 7, 구분: "일반군" },
    { min: 8, max: 13, 구분: "일반군" },
    { min: 14, max: 19, 구분: "일반군" },
    { min: 20, max: 25, 구분: "일반군" },
    { min: 26, max: 31, 구분: "일반군" },
    { min: 32, max: 37, 구분: "관심군" },
    { min: 38, max: 42, 구분: "우선관심군" },
    { min: 43, max: 48, 구분: "우선관심군" },
    { min: 49, max: 54, 구분: "우선관심군" },
    { min: 55, max: 60, 구분: "우선관심군" },
    { min: 61, max: 66, 구분: "우선관심군" },
    { min: 67, max: 108, 구분: "우선관심군" },
  ],
  girl: [
    { min: 0, max: 2, 구분: "일반군" },
    { min: 3, max: 9, 구분: "일반군" },
    { min: 10, max: 53, 구분: "일반군" },
    { min: 16, max: 21, 구분: "일반군" },
    { min: 22, max: 28, 구분: "일반군" },
    { min: 29, max: 34, 구분: "일반군" },
    { min: 35, max: 41, 구분: "관심군" },
    { min: 42, max: 47, 구분: "우선관심군" },
    { min: 48, max: 53, 구분: "우선관심군" },
    { min: 54, max: 60, 구분: "우선관심군" },
    { min: 61, max: 66, 구분: "우선관심군" },
    { min: 67, max: 73, 구분: "우선관심군" },
    { min: 74, max: 108, 구분: "우선관심군" },
  ],
};

export default function getCategoryByTotalScore(gender, totalScore) {
  const categories = scoreCategories[gender] ?? [];
  for (const category of categories) {
    if (totalScore >= category.min && totalScore <= category.max) {
      return category.구분;
    }
  }
  return null;
}
