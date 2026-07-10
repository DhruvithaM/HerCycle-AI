import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hover = true,
  padding = "p-6",
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.25 }}
      className={`
        w-full
        rounded-[30px]
        border
        border-pink-100
        bg-white
        ${padding}
        shadow-[0_15px_40px_rgba(236,72,153,.08)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default Card;