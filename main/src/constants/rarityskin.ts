export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";
export type SkinVariant = "base" | "legendary" | "evolution";

export const rarityTextClass: Record<Rarity, string> = {
  Common: "text-neutral-100 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Rare: "text-blue-300 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Epic: "text-purple-300 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Legendary: "text-amber-300 drop-shadow-[0,1px,0,rgba(0,0,0,.8)]",
};

export function getSkinVariant(rarity: Rarity, evolution: boolean): SkinVariant {
  if (evolution) return "evolution";
  if (rarity === "Legendary") return "legendary";
  return "base";
}
