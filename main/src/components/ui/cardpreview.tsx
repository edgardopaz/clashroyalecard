import { useMemo, useState } from "react";
import bg from "@/assets/background.png";

type SlotPx = { x: number; y: number; w: number; h: number };

type Props = {
  portraitUrl?: string | null;   // blob URL from your cropper
  slotPx: SlotPx;                // portrait window measured in *pixels* of the PNG
  debug?: boolean;               // optional dashed box to fine-tune coords
};

export default function CardPreview({ portraitUrl, slotPx, debug = false }: Props) {
  // read natural image size on load so we can convert px → %
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const slotStyle = useMemo(() => {
    if (!natural) return { display: "none" } as const;
    const { w: W, h: H } = natural;
    return {
      left:   `${(slotPx.x / W) * 100}%`,
      top:    `${(slotPx.y / H) * 100}%`,
      width:  `${(slotPx.w / W) * 100}%`,
      height: `${(slotPx.h / H) * 100}%`,
    } as const;
  }, [natural, slotPx]);

  return (
    <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-xl">
      {/* Static background template */}
      <img
        src={bg}
        alt=""
        className="block w-full h-auto"
        onLoad={(e) => {
          const img = e.currentTarget;
          setNatural({ w: img.naturalWidth, h: img.naturalHeight });
        }}
      />

      {/* Portrait layer (only when set) */}
      {portraitUrl && natural && (
        <div className="absolute" style={slotStyle}>
          <img
            src={portraitUrl}
            alt=""
            className="w-full h-full object-cover rounded-[18px] border-[3px] border-black/40"
          />
        </div>
      )}

      {/* Optional debug guide to align the slot */}
      {!portraitUrl && debug && natural && (
        <div
          className="absolute"
          style={{ ...slotStyle, outline: "2px dashed #0ea5e9", background: "rgba(14,165,233,.12)" }}
        />
      )}
    </div>
  );
}
