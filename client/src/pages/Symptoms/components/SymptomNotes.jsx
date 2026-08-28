import { FileText, Sparkles } from "lucide-react";

/* ==========================================================
   SYMPTOM NOTES
========================================================== */

function SymptomNotes({
  value = "",
  onChange,
  disabled = false,
}) {
  const maxLength = 500;
  const remainingCharacters =
    maxLength - value.length;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
      
      {/* HEADER */}

      <div className="flex items-start gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
          <FileText size={21} />
        </div>

        <div>

          <p className="text-sm font-semibold text-pink-500">
            Additional Notes
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-800">
            Tell us anything else you noticed
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            You can add optional details about your symptoms,
            mood, possible triggers, or anything you want to
            remember later.
          </p>

        </div>

      </div>

      {/* TEXTAREA */}

      <div className="relative mt-5">

        <textarea
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value.slice(
                0,
                maxLength
              )
            )
          }
          disabled={disabled}
          maxLength={maxLength}
          rows={6}
          placeholder="For example: I experienced stronger cramps after lunch and felt more tired than usual..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/70
            px-4
            py-4
            text-sm
            leading-6
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-pink-400
            focus:bg-white
            focus:ring-4
            focus:ring-pink-100
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <div className="mt-3 flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles
              size={15}
              className="text-pink-400"
            />

            <span>
              Notes are optional and help you remember how
              you felt on this day.
            </span>
          </div>

          <span
            className={`
              shrink-0
              text-xs
              font-medium
              ${
                remainingCharacters < 50
                  ? "text-pink-500"
                  : "text-slate-400"
              }
            `}
          >
            {remainingCharacters} left
          </span>

        </div>

      </div>

    </section>
  );
}

export default SymptomNotes;