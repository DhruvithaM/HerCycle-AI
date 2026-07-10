import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function FAQItem({ item, open, onClick }) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white shadow-sm">

      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {item.question}
        </h3>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-pink-500" : ""
          }`}
        />
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 leading-8 text-slate-600">
              {item.answer}
            </p>
          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

export default FAQItem;