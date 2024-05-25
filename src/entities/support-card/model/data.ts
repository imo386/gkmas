import type { CardType, Rarity } from "@/shared/model/game";
import type { SupportAbility } from "./support-ability";

export type SupportEvent = {
  id: number;
  name: string;
  description: string;
};

export type LevelSupportAbility = {
  level: number;
  abilities: SupportAbility[];
};

export type Card = {
  id: number;
  rarity: Rarity;
  title: string;
  type: CardType;
  level: number;
  supportEvents: SupportEvent[];
  supportAbilities: SupportAbility[];
  levelSupportAbilities: LevelSupportAbility[];
};
