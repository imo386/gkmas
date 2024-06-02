const SCORE_MULTIPLIERS = {
  SCORE_0_5000: 0.3,
  SCORE_5001_10000: 0.15,
  SCORE_10001_20000: 0.08,
  SCORE_20001_30000: 0.04,
  SCORE_30001_40000: 0.02,
  SCORE_40001_PLUS: 0.01,
} as const;

const POSITION_POINTS = {
  1: 1700,
  2: 900,
  3: 500,
  4: 300,
  5: 200,
  6: 0,
} as const;

const RANK_THRESHOLDS = {
  S: 13000,
  "A+": 11500,
  A: 10000,
  "B+": 8000,
  B: 6000,
  "C+": 4500,
  C: 3000,
} as const;

const STATUS_MULTIPLIER = 2.3 as const;

export type Position = keyof typeof POSITION_POINTS;
export type Rank = keyof typeof RANK_THRESHOLDS;
export type ScoreMultiplier = keyof typeof SCORE_MULTIPLIERS;

const calculatePoints = (score: number): number => {
  const calculate = (score: number, multiplier: number, base = 0): number =>
    Math.ceil((score - base) / multiplier);

  if (score <= 1500) {
    return calculate(score, SCORE_MULTIPLIERS.SCORE_0_5000);
  }
  if (score <= 2250) {
    return 5000 + calculate(score, SCORE_MULTIPLIERS.SCORE_5001_10000, 1500);
  }
  if (score <= 3050) {
    return 10000 + calculate(score, SCORE_MULTIPLIERS.SCORE_10001_20000, 2250);
  }
  if (score <= 3450) {
    return 20000 + calculate(score, SCORE_MULTIPLIERS.SCORE_20001_30000, 3050);
  }
  if (score <= 3650) {
    return 30000 + calculate(score, SCORE_MULTIPLIERS.SCORE_30001_40000, 3450);
  }
  return 40000 + calculate(score, SCORE_MULTIPLIERS.SCORE_40001_PLUS, 3650);
};

export interface EvaluationResult {
  totalEvaluationPoints: number;
  rank: Rank | null;
  requiredPointDifferences: Record<Rank, number>;
}

export const calculateRankWithScore = (
  position: Position,
  vocal: number,
  dance: number,
  visual: number,
): EvaluationResult => {
  const positionPoints = POSITION_POINTS[position];
  const statusSum =
    position === 1
      ? Math.min(vocal + 30, 1500) +
        Math.min(dance + 30, 1500) +
        Math.min(visual + 30, 1500)
      : vocal + dance + visual;

  const statusPoints = Math.floor(statusSum * STATUS_MULTIPLIER);
  const totalEvaluationPoints = positionPoints + statusPoints;

  const calculateRank = (points: number): Rank | null =>
    (Object.entries(RANK_THRESHOLDS) as [Rank, number][]).reduce(
      (acc, [rank, threshold]) => (points >= threshold ? rank : acc),
      null as Rank | null,
    );

  const rank = calculateRank(totalEvaluationPoints);

  const requiredPointDifferences = (
    Object.entries(RANK_THRESHOLDS) as [Rank, number][]
  ).reduce(
    (acc, [rank, threshold]) =>
      Object.assign(acc, {
        [rank]: calculatePoints(Math.max(0, threshold - totalEvaluationPoints)),
      }),
    {} as Record<Rank, number>,
  );

  return {
    totalEvaluationPoints,
    rank,
    requiredPointDifferences,
  };
};
