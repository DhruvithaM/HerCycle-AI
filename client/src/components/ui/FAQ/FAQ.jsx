import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import faqData from "./faqData";

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="faq"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-[#fff8fb]
        via-white
        to-[#fff2f8]
        py-32
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[180px]" />

      <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-purple-200/20 blur-[200px]" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            ❓ Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Have Questions?
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Everything you need to know about HerCycle AI,
            our prediction system, privacy, and healthcare
            features.
          </p>
        </motion.div>

        {/* FAQ List */}

        <div className="space-y-6">

          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              open={active === index}
              onClick={() =>
                setActive(active === index ? null : index)
              }
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;