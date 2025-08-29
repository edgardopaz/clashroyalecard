// src/constants/raritySkin.ts
import commonFrame    from "@/assets/common.png";
import rareFrame      from "@/assets/rare.png";
import epicFrame      from "@/assets/epic.png";
import legendaryFrame from "@/assets/legendary.png";
import evoFrame       from "@/assets/evo.png";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export const frameMap: Record<Rarity, string> = {
  Common: commonFrame,
  Rare: rareFrame,
  Epic: epicFrame,
  Legendary: legendaryFrame,
};

// text color for your "Rarity" label (tweak as you like)
export const rarityTextClass: Record<Rarity, string> = {
  Common: "text-neutral-100 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Rare: "text-blue-300 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Epic: "text-purple-300 drop-shadow-[0_1px_0_rgba(0,0,0,.7)]",
  Legendary: "text-amber-300 drop-shadow-[0_1px_0_rgba(0,0,0,.8)]",
};

export function getFrameSrc(rarity: Rarity, evolution: boolean): string {
  if (evolution) return evoFrame;       // universal evo skin
  return frameMap[rarity];              // otherwise, per-rarity frame
}