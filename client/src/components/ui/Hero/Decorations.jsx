function Decorations() {
  return (
    <>
      {/* Top Left */}
      <div className="absolute left-12 top-14 h-3 w-3 rounded-full bg-pink-400 opacity-70"></div>

      <div className="absolute left-20 top-24 h-2 w-2 rounded-full bg-purple-400"></div>

      {/* Right */}
      <div className="absolute right-10 top-24 h-4 w-4 rounded-full bg-pink-300"></div>

      {/* Bottom */}
      <div className="absolute bottom-12 left-10 h-4 w-4 rounded-full bg-pink-300"></div>

      <div className="absolute bottom-24 right-16 h-3 w-3 rounded-full bg-purple-300"></div>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>
    </>
  );
}

export default Decorations;