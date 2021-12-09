export type Ancestry = {
  name: string;
  code: string;
  description: string;
  type: string;
  family: string;
  traits: Array<AncestryTrait>;
  attribute_bonuses: AttributeBonuses;
};

export type AncestryTrait = {
  name: string;
  code: string;
  description: string;
  effect: string;
  from: number;
  to: number;
};

export type AttributeBonuses = Partial<Record<AttributeCode, number>>;

export type AttributeCode =
  | "combat"
  | "brawn"
  | "agility"
  | "perception"
  | "intelligence"
  | "willpower"
  | "fellowship";
