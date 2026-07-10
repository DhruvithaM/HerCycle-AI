import { Heart, Sparkles } from "lucide-react";

function FloatingIcons() {
  return (
    <>
      <Heart
        className="absolute left-20 top-28 text-pink-400 animate-bounce"
        fill="#ec4899"
        size={20}
      />

      <Heart
        className="absolute right-28 bottom-32 text-pink-300 animate-pulse"
        fill="#f472b6"
        size={16}
      />

      <Sparkles
        className="absolute right-10 top-20 text-purple-400 animate-pulse"
        size={20}
      />

      <Sparkles
        className="absolute left-10 bottom-24 text-pink-400 animate-pulse"
        size={18}
      />
    </>
  );
}

export default FloatingIcons;