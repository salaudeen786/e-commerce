"use client";

import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CakeCustomizerData } from "@/types";

const spongeHex: Record<string, string> = {
  vanilla: "#F5E6C8",
  chocolate: "#6B3A2A",
  "red-velvet": "#C41E3A",
  lemon: "#FFF4B0",
  carrot: "#F4A460",
};

const creamHex: Record<string, string> = {
  buttercream: "#FFF8DC",
  "cream-cheese": "#FFF5EE",
  ganache: "#3E1F1F",
  whipped: "#FFFFFF",
  fondant: "#FFE4E1",
};

const themeHex: Record<string, string> = {
  "pink-rose": "#FF69B4",
  "midnight-blue": "#191970",
  "blush-pink": "#FFB6C1",
  "lavender-dream": "#B39DDB",
  "gold-elegance": "#D4AF37",
  "mint-fresh": "#98FF98",
  "classic-white": "#F5F5F5",
  rainbow: "#FF4F87",
};

function CakeSvg({
  shape,
  sponge,
  cream,
  filling,
  decoration,
  colorTheme,
  cakeTopper,
  cakeMessage,
}: Record<string, string>) {
  const spongeColor = spongeHex[sponge] || "#F5E6C8";
  const creamColor = creamHex[cream] || "#FFF8DC";
  const accentColor = themeHex[colorTheme] || "#FF69B4";
  const showFilling = filling && filling !== "none";
  const showTopper = cakeTopper && cakeTopper !== "none";

  const renderBody = () => {
    switch (shape) {
      case "square":
        return (
          <>
            <rect x="75" y="140" width="150" height="100" rx="8" fill={spongeColor} />
            <rect x="75" y="140" width="150" height="20" rx="8" fill={creamColor} opacity="0.9" />
            {showFilling && <rect x="75" y="185" width="150" height="10" fill={accentColor} opacity="0.4" />}
            <rect x="75" y="195" width="150" height="45" fill={spongeColor} opacity="0.85" />
            <rect x="68" y="238" width="164" height="6" rx="3" fill={creamColor} />
          </>
        );
      case "heart":
        return (
          <g transform="translate(150,190)">
            <path d="M0-30 C-20-60,-70-40,-70-10 C-70,20,0,50,0,50 C0,50,70,20,70-10 C70-40,20-60,0-30Z" fill={spongeColor} />
            <path d="M0-25 C-16-50,-56-34,-56-8 C-56,16,0,40,0,40 C0,40,56,16,56-8 C56-34,16-50,0-25Z" fill={creamColor} opacity="0.3" />
            {showFilling && <path d="M0-5 C-10-10,-30-5,-30-5 C-30,5,0,15,0,15 C0,15,30,5,30-5 C30-5,10-10,0-5Z" fill={accentColor} opacity="0.3" />}
          </g>
        );
      case "tiered":
        return (
          <>
            <ellipse cx="150" cy="250" rx="90" ry="25" fill={spongeColor} opacity="0.9" />
            <rect x="90" y="200" width="120" height="50" rx="6" fill={spongeColor} />
            <rect x="90" y="200" width="120" height="15" rx="6" fill={creamColor} opacity="0.9" />
            <ellipse cx="150" cy="200" rx="60" ry="18" fill={spongeColor} />
            <rect x="110" y="155" width="80" height="45" rx="5" fill={spongeColor} />
            <rect x="110" y="155" width="80" height="12" rx="5" fill={creamColor} opacity="0.9" />
            <ellipse cx="150" cy="155" rx="40" ry="12" fill={spongeColor} />
            <rect x="120" y="120" width="60" height="35" rx="4" fill={spongeColor} />
            <rect x="120" y="120" width="60" height="10" rx="4" fill={creamColor} opacity="0.9" />
          </>
        );
      case "sheet":
        return (
          <>
            <rect x="40" y="160" width="220" height="80" rx="6" fill={spongeColor} />
            <rect x="40" y="160" width="220" height="16" rx="6" fill={creamColor} opacity="0.9" />
            {showFilling && <rect x="40" y="195" width="220" height="8" fill={accentColor} opacity="0.4" />}
            <rect x="40" y="203" width="220" height="37" fill={spongeColor} opacity="0.85" />
          </>
        );
      default:
        return (
          <>
            <ellipse cx="150" cy="240" rx="80" ry="18" fill={spongeColor} />
            <rect x="70" y="145" width="160" height="95" rx="10" fill={spongeColor} />
            <rect x="70" y="145" width="160" height="18" rx="10" fill={creamColor} opacity="0.9" />
            {showFilling && <rect x="70" y="190" width="160" height="8" fill={accentColor} opacity="0.4" />}
            <rect x="70" y="198" width="160" height="42" fill={spongeColor} opacity="0.85" />
            <ellipse cx="150" cy="145" rx="80" ry="18" fill={creamColor} />
          </>
        );
    }
  };

  const renderDecorations = () => {
    const items: React.ReactNode[] = [];
    const key = "dec";
    switch (decoration) {
      case "fresh-flowers":
        items.push(<circle key={`${key}-1`} cx="100" cy="160" r="6" fill={accentColor} />);
        items.push(<circle key={`${key}-2`} cx="150" cy="155" r="5" fill="#FF1493" />);
        items.push(<circle key={`${key}-3`} cx="200" cy="160" r="6" fill={accentColor} />);
        items.push(<circle key={`${key}-4`} cx="125" cy="170" r="4" fill="#FF69B4" />);
        items.push(<circle key={`${key}-5`} cx="175" cy="170" r="4" fill="#FF69B4" />);
        break;
      case "piping":
        items.push(<circle key={`${key}-1`} cx="80" cy="155" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-2`} cx="100" cy="150" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-3`} cx="120" cy="148" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-4`} cx="140" cy="146" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-5`} cx="160" cy="148" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-6`} cx="180" cy="150" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-7`} cx="200" cy="155" r="2" fill={creamColor} />);
        items.push(<circle key={`${key}-8`} cx="220" cy="160" r="2" fill={creamColor} />);
        break;
      case "sprinkles":
        for (let i = 0; i < 12; i++) {
          items.push(
            <rect
              key={`${key}-${i}`}
              x={90 + (i * 12) % 130}
              y={155 + (i * 7) % 30}
              width="4"
              height="2"
              rx="1"
              fill={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF69B4"][i % 5]}
              transform={`rotate(${i * 45}, ${90 + (i * 12) % 130}, ${155 + (i * 7) % 30})`}
            />
          );
        }
        break;
      case "edible-gold":
        items.push(
          <rect key={`${key}-1`} x="130" y="165" width="40" height="20" rx="3" fill="#D4AF37" opacity="0.6" />
        );
        items.push(
          <rect key={`${key}-2`} x="95" y="170" width="20" height="10" rx="2" fill="#D4AF37" opacity="0.4" />
        );
        items.push(
          <rect key={`${key}-3`} x="185" y="170" width="20" height="10" rx="2" fill="#D4AF37" opacity="0.4" />
        );
        break;
      case "macarons":
        items.push(<ellipse key={`${key}-1`} cx="100" cy="165" rx="8" ry="6" fill="#FF69B4" />);
        items.push(<ellipse key={`${key}-2`} cx="150" cy="160" rx="8" ry="6" fill="#98FF98" />);
        items.push(<ellipse key={`${key}-3`} cx="200" cy="165" rx="8" ry="6" fill="#B39DDB" />);
        break;
      case "fresh-fruit":
        items.push(<circle key={`${key}-1`} cx="110" cy="160" r="5" fill="#FF0000" />);
        items.push(<circle key={`${key}-2`} cx="140" cy="155" r="4" fill="#FF6347" />);
        items.push(<circle key={`${key}-3`} cx="170" cy="155" r="4" fill="#8B4513" />);
        items.push(<circle key={`${key}-4`} cx="200" cy="160" r="5" fill="#FFD700" />);
        items.push(<circle key={`${key}-5`} cx="125" cy="168" r="3" fill="#00FF7F" />);
        items.push(<circle key={`${key}-6`} cx="175" cy="168" r="3" fill="#00FF7F" />);
        break;
      case "chocolate-shards":
        for (let i = 0; i < 5; i++) {
          items.push(
            <polygon
              key={`${key}-${i}`}
              points={`${130 + i * 12},158 ${135 + i * 12},150 ${142 + i * 12},155 ${138 + i * 12},165`}
              fill="#3E1F1F"
              opacity="0.7"
            />
          );
        }
        break;
    }
    return items;
  };

  const renderTopper = () => {
    switch (cakeTopper) {
      case "happy-birthday":
        return <text x="150" y={shape === "tiered" ? 110 : 130} textAnchor="middle" fill={accentColor} fontSize="10" fontWeight="bold" fontFamily="serif">Happy Birthday!</text>;
      case "congrats":
        return <text x="150" y={shape === "tiered" ? 110 : 130} textAnchor="middle" fill={accentColor} fontSize="10" fontWeight="bold" fontFamily="serif">Congrats!</text>;
      case "happy-anniversary":
        return <text x="150" y={shape === "tiered" ? 110 : 130} textAnchor="middle" fill={accentColor} fontSize="9" fontWeight="bold" fontFamily="serif">Anniversary</text>;
      case "custom-text":
        return cakeMessage ? (
          <text x="150" y={shape === "tiered" ? 110 : 130} textAnchor="middle" fill={accentColor} fontSize="9" fontWeight="bold" fontFamily="serif">{cakeMessage.substring(0, 15)}</text>
        ) : (
          <text x="150" y={shape === "tiered" ? 110 : 130} textAnchor="middle" fill={accentColor} fontSize="9" fontWeight="bold" fontFamily="serif">Custom</text>
        );
      case "figurine":
        return <circle cx="150" cy={shape === "tiered" ? 108 : 128} r="10" fill={accentColor} opacity="0.7" />;
      case "fresh-flowers":
        return (
          <>
            <circle cx="140" cy={shape === "tiered" ? 112 : 132} r="5" fill="#FF69B4" />
            <circle cx="150" cy={shape === "tiered" ? 108 : 128} r="6" fill="#FF1493" />
            <circle cx="160" cy={shape === "tiered" ? 112 : 132} r="5" fill="#FF69B4" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <defs>
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0000" />
          <stop offset="17%" stopColor="#FF8800" />
          <stop offset="33%" stopColor="#FFFF00" />
          <stop offset="50%" stopColor="#00CC00" />
          <stop offset="67%" stopColor="#0088FF" />
          <stop offset="83%" stopColor="#4400FF" />
          <stop offset="100%" stopColor="#8800AA" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        {renderBody()}
        {renderDecorations()}
        {renderTopper()}
      </g>

      {cakeMessage && !["happy-birthday", "congrats", "happy-anniversary", "custom-text"].includes(cakeTopper) && (
        <text x="150" y={shape === "tiered" ? 230 : 210} textAnchor="middle" fill="#333" fontSize="8" fontFamily="serif" fontStyle="italic">
          {cakeMessage.substring(0, 20)}
        </text>
      )}
    </svg>
  );
}

export function CakePreview() {
  const { watch } = useFormContext<CakeCustomizerData>();
  const values = watch();

  return (
    <div className="aspect-square w-full rounded-2xl border border-border bg-white p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${values.shape}-${values.colorTheme}-${values.cream}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <CakeSvg
            shape={values.shape}
            sponge={values.sponge}
            cream={values.cream}
            filling={values.filling}
            decoration={values.decoration}
            colorTheme={values.colorTheme}
            cakeTopper={values.cakeTopper}
            cakeMessage={values.cakeMessage || ""}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
