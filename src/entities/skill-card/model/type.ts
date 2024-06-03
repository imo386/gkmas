import type { Rarity } from "@shared/model/game";

export type Effect = {
  parameter: number
  guard: number;
  staminaA: number; // green heart stamina
  staminaB: number; // red heart stamina

  // TODO: some effects are not implemented yet
  // Today was a Good Day, but the permanent effects are cannot be generalized.
  // Hmmm..., need some ideas...
};

export type SkillType = "active" | "mental" | "trouble";

export type PlanType = "free" | "sense" | "logic";

export type Skill = {
  name: string;
  rarity: Rarity;
  skillType: SkillType;
  planType: PlanType;
  openLevel: number;
  effect: Partial<Effect>;
  empoweredEffect: Partial<Effect>;
};
