import { Loader2 } from "lucide-react";

function Loader({
  text = "Loading..."
}) {
  return (
    <div
      className="
        flex
        min-h-[250px]
        flex-col
        items-center
        justify-center
      "
    >
      <Loader2
        size={40}
        className="
          animate-spin
          text-pink-500
        "
      />

      <p
        className="
          mt-4
          text-slate-500
        "
      >
        {text}
      </p>
    </div>
  );
}

export default Loader;