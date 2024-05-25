import type { CardType } from "@/shared/model/game";

export type Effect = {
  type: "constant" | "ratio";
  value: number;
};

export type SupportAbility = {
  name: string;
  description: (cardType: CardType) => string;
  effect: Effect;
};

export const supportAbilities: SupportAbility[] = [
  {
    name: "initial status up",
    description: (cardType) => `初期${cardType}上昇+60`,
    effect: { type: "constant", value: 60 },
  },
  {
    name: "stamina up",
    description: (_) => "最大体力上昇+9",
    effect: { type: "constant", value: 9 },
  },
  {
    name: "lesson bonus up",
    description: (cardType) => `${cardType}レッスンボーナス+8.5%`,
    effect: { type: "ratio", value: 0.085 },
  },
  {
    name: "special lesson ratio up",
    description: (cardType) => `${cardType}SPレッスン発生率+28%`,
    effect: { type: "ratio", value: 0.28 },
  },
  {
    name: "all special lesson ratio up",
    description: (_) =>
      "ボーカル、ダンス、ビジュアルすべてのSPレッスン発生率+14%",
    effect: { type: "ratio", value: 0.14 },
  },
  {
    name: "after special lesson heal",
    description: (cardType) => `${cardType}SPレッスン終了時、体力回復7`,
    effect: { type: "constant", value: 7 },
  },
  {
    name: "after all special lesson heal",
    description: (_) => "SPレッスン終了時、体力回復4",
    effect: { type: "constant", value: 4 },
  },
  {
    name: "after examine heal",
    description: (_) => "試験終了時、体力回復8（プロデュース中1回）",
    effect: { type: "constant", value: 8 },
  },
  {
    name: "initial produce point up",
    description: (_) => "初期Pポイント上昇+40",
    effect: { type: "constant", value: 40 },
  },
  {
    name: "after special lesson produce point up",
    description: (cardType) =>
      `${cardType}SPレッスン終了時、Pポイント獲得量増加+45%`,
    effect: { type: "ratio", value: 0.45 },
  },
  {
    name: "lesson support ratio up",
    description: (_) => "このサポートカードのレッスンサポート発生率を100%増加",
    effect: { type: "ratio", value: 1 },
  },
  {
    name: "after lesson status up",
    description: (cardType) => `${cardType}レッスン終了時、${cardType}上昇+6`,
    effect: { type: "constant", value: 6 },
  },
  {
    name: "after special lesson status up",
    description: (cardType) =>
      `${cardType}SPレッスン終了時、${cardType}上昇+17`,
    effect: { type: "constant", value: 17 },
  },
  {
    name: "lent status up",
    description: (cardType) => `活動支給選択時、${cardType}上昇+11`,
    effect: { type: "constant", value: 11 },
  },
  {
    name: "absent status up",
    description: (cardType) => `休む選択時、${cardType}上昇+22`,
    effect: { type: "constant", value: 22 },
  },
  {
    name: "class status up",
    description: (cardType) => `授業選択時、${cardType}上昇+7`,
    effect: { type: "constant", value: 7 },
  },
  {
    name: "outing status up",
    description: (cardType) => `お出かけ選択時、${cardType}上昇+11`,
    effect: { type: "constant", value: 11 },
  },
  {
    name: "consultation status up",
    description: (cardType) => `相談選択時、${cardType}上昇+11`,
    effect: { type: "constant", value: 11 },
  },
  {
    name: "bump skill card status up",
    description: (cardType) => `スキルカード強化時、${cardType}上昇+4`,
    effect: { type: "constant", value: 4 },
  },
  {
    name: "active card status up",
    description: (cardType) =>
      `アクティブスキルカード獲得時、${cardType}上昇+3`,
    effect: { type: "constant", value: 3 },
  },
  {
    name: "mental card status up",
    description: (cardType) => `メンタルスキルカード獲得時、${cardType}上昇+3`,
    effect: { type: "constant", value: 3 },
  },
  {
    name: "support event status up",
    description: (_) =>
      "このサポートカードのイベントによるパラメータ上昇を100%増加",
    effect: { type: "ratio", value: 1 },
  },
];
