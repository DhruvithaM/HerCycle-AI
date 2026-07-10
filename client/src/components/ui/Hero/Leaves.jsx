function Leaves() {
  return (
    <>
      {/* Left Leaf */}
      <div className="absolute bottom-16 left-12 rotate-[-20deg] text-pink-300 opacity-60">
        🌿
      </div>

      {/* Right Leaf */}
      <div className="absolute top-24 right-10 rotate-[25deg] text-pink-300 opacity-60">
        🌿
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-10 right-20 rotate-[10deg] text-purple-300 opacity-50">
        🌿
      </div>
    </>
  );
}

export default Leaves;