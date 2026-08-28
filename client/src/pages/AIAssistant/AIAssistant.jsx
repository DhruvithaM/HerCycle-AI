import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  HeartPulse,
  CalendarDays,
  Pill,
  Utensils,
  Trash2,
  MessageCircle,
  AlertCircle,
  LogIn,
} from "lucide-react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

const quickQuestions = [
  {
    icon: CalendarDays,
    text: "When is my next period?",
  },
  {
    icon: HeartPulse,
    text: "What symptoms can I track?",
  },
  {
    icon: Utensils,
    text: "Suggest healthy food during periods",
  },
  {
    icon: Pill,
    text: "How do medicine reminders work?",
  },
];

function formatDate(date) {
  if (!date) return null;

  const validDate =
    date instanceof Date
      ? date
      : new Date(date);

  if (Number.isNaN(validDate.getTime())) {
    return null;
  }

  return validDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function convertToDate(value) {
  if (!value) return null;

  // Firestore Timestamp
  if (
    typeof value === "object" &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }

  // Date object
  if (value instanceof Date) {
    return value;
  }

  // String or other date value
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function calculateNextPeriod(lastPeriodDate, cycleLength) {
  const lastDate = convertToDate(lastPeriodDate);

  if (!lastDate) return null;

  const cycleDays = Number(cycleLength) || 28;

  const nextDate = new Date(lastDate);

  nextDate.setDate(
    nextDate.getDate() + cycleDays
  );

  return nextDate;
}

function getBotResponse(message, userData) {
  const text = message
    .toLowerCase()
    .trim()
    .replace(/[?!.,]/g, "");

  const {
    profile,
    latestPeriod,
  } = userData;

  const userName =
    profile?.name ||
    profile?.fullName ||
    profile?.displayName ||
    "there";

  const lastPeriodDate =
    latestPeriod?.startDate ||
    latestPeriod?.periodDate ||
    latestPeriod?.lastPeriodDate ||
    profile?.lastPeriodDate ||
    profile?.lastPeriod;

  const cycleLength =
    latestPeriod?.cycleLength ||
    profile?.cycleLength ||
    profile?.averageCycleLength ||
    28;

  /* ==========================================
     GREETINGS
  ========================================== */

  if (
    /^(hi|hello|hey|hii|hiii)$/.test(text)
  ) {
    return `Hello, ${userName}! 👋💗 I'm your HerCycle AI Assistant. I can help you with your menstrual cycle, symptoms, medicines, diet, nutrition and general women's wellness. What would you like to know?`;
  }

  /* ==========================================
     OKAY
  ========================================== */

  if (
    /^(okay|ok|okk|got it|alright|sure)$/.test(
      text
    )
  ) {
    return `Great! 😊💗 Feel free to ask me anything about your cycle, symptoms, medicines, diet or the features available in HerCycle AI.`;
  }

  /* ==========================================
     THANK YOU
  ========================================== */

  if (
    text.includes("thank") ||
    text === "thanks"
  ) {
    return `You're most welcome, ${userName}! 💗 I'm happy to help.`;
  }

  /* ==========================================
     BYE
  ========================================== */

  if (
    /^(bye|goodbye|byee|bye bye|see you)$/.test(
      text
    )
  ) {
    return `Goodbye, ${userName}! 👋💗 Take care of yourself and have a wonderful day.`;
  }

  /* ==========================================
     NEXT PERIOD - IMPORTANT
  ========================================== */

  if (
    text.includes("next period") ||
    text.includes("when is my period") ||
    text.includes("when will my period") ||
    text.includes("when do i get my period") ||
    text.includes("next menstrual")
  ) {
    const nextPeriod = calculateNextPeriod(
      lastPeriodDate,
      cycleLength
    );

    if (nextPeriod) {
      return `Based on the information saved in your HerCycle AI profile, your estimated next period date is ${formatDate(
        nextPeriod
      )}. 📅💗 This estimate uses your cycle length of ${cycleLength} days. Please remember that periods can naturally vary by a few days.`;
    }

    return `I can calculate your estimated next period, but I need your last period date first. Please update your Cycle Tracker or Profile with your latest period date and cycle length. 📅`;
  }

  /* ==========================================
     LAST PERIOD
  ========================================== */

  if (
    text.includes("last period") ||
    text.includes("previous period")
  ) {
    const lastDate =
      convertToDate(lastPeriodDate);

    if (lastDate) {
      return `Your latest recorded period date is ${formatDate(
        lastDate
      )}. 📅`;
    }

    return `I couldn't find a recorded last period date yet. Please add your period information in the Cycle Tracker.`;
  }

  /* ==========================================
     CYCLE TRACKING
  ========================================== */

  if (
    text.includes("track my menstrual cycle") ||
    text.includes("track my cycle") ||
    text.includes("cycle tracker") ||
    text.includes("how can i track")
  ) {
    return `You can track your menstrual cycle using the Cycle Tracker. 📅 Add your period start date and cycle information, and HerCycle AI can help you understand your cycle pattern and estimate your next period.`;
  }

  /* ==========================================
     SYMPTOMS
  ========================================== */

  if (
    text.includes("symptom") ||
    text.includes("cramp") ||
    text.includes("cramps") ||
    text.includes("headache") ||
    text.includes("fatigue") ||
    text.includes("mood")
  ) {
    return `You can track symptoms such as cramps, abdominal pain, headache, fatigue, bloating, acne, mood changes, breast tenderness and other concerns in the Symptoms section. 💗 Tracking them over time can help you understand patterns related to your menstrual cycle.`;
  }

  /* ==========================================
     PCOD / PCOS
  ========================================== */

  if (
    text.includes("pcod") ||
    text.includes("pcos")
  ) {
    return `HerCycle AI includes a PCOD assessment feature to help you record relevant symptoms and health patterns. However, it is not a medical diagnosis. For diagnosis, treatment or serious concerns, please consult a qualified healthcare professional.`;
  }

  /* ==========================================
     FOOD / DIET
  ========================================== */

  if (
    text.includes("food") ||
    text.includes("diet") ||
    text.includes("nutrition") ||
    text.includes("healthy food") ||
    text.includes("what should i eat")
  ) {
    return `During periods, you can generally choose balanced foods such as fruits, vegetables, whole grains, protein-rich foods and adequate fluids. 🍎🥗 Your Diet & Nutrition feature can suggest meals, and you can replace the suggestion with the food you actually consumed.`;
  }

  /* ==========================================
     PERIOD FOOD
  ========================================== */

  if (
    text.includes("food during period") ||
    text.includes("food during periods") ||
    text.includes("during my period") ||
    text.includes("during periods")
  ) {
    return `During your period, you can focus on iron-rich foods, leafy vegetables, fruits, protein and plenty of water. 🥗 Some simple meal options include poha, idli, dal with rice, vegetable pulao, fruits, nuts and curd. Choose foods that suit your preferences and dietary needs.`;
  }

  /* ==========================================
     MEDICINE
  ========================================== */

  if (
    text.includes("medicine") ||
    text.includes("tablet") ||
    text.includes("reminder") ||
    text.includes("dose") ||
    text.includes("dosage")
  ) {
    return `The Medicine Reminder feature lets you add your medicine name, dosage, frequency and reminder time. 💊 Your scheduled medicines appear in your medicine section, and you can mark each medicine as Taken after consuming it. Always follow your doctor's prescribed dosage.`;
  }

  /* ==========================================
     CALORIES
  ========================================== */

  if (
    text.includes("calorie") ||
    text.includes("calories")
  ) {
    return `You can enter the food you actually consumed in the Diet & Nutrition section. 🍽️ HerCycle AI can provide estimated calorie information based on the selected food. Calorie values are approximate because they can change depending on ingredients, preparation method and portion size.`;
  }

  /* ==========================================
     PREGNANCY
  ========================================== */

  if (
    text.includes("pregnan") ||
    text.includes("pregnancy")
  ) {
    return `For pregnancy-related concerns, symptoms or questions, please consult a qualified healthcare professional. HerCycle AI provides general wellness information and should not replace professional medical advice.`;
  }

  /* ==========================================
     HELP
  ========================================== */

  if (
    text === "help" ||
    text.includes("what can you do") ||
    text.includes("how can you help")
  ) {
    return `I can help you with: 📅 menstrual cycle tracking and next-period estimates, 💗 symptoms, 💊 medicine reminders, 🥗 diet and nutrition, and general information about PCOD and women's wellness.`;
  }

  /* ==========================================
     FALLBACK
  ========================================== */

  return `I'm sorry, ${userName}, I don't fully understand that question yet. 💗 You can ask me about your next period, cycle tracking, symptoms, medicines, diet, nutrition, PCOD assessment or general women's wellness.`;
}

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋💗 I'm your HerCycle AI Assistant. Ask me about your menstrual cycle, symptoms, medicines, diet, nutrition or general women's wellness.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [userData, setUserData] = useState({
    profile: null,
    latestPeriod: null,
  });

  const [authLoading, setAuthLoading] =
    useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const messagesEndRef = useRef(null);

  /* ==========================================
     LOAD USER + PROFILE + PERIOD DATA
  ========================================== */

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setIsLoggedIn(false);
          setAuthLoading(false);

          setUserData({
            profile: null,
            latestPeriod: null,
          });

          return;
        }

        setIsLoggedIn(true);

        try {
          const profileRef = doc(
            db,
            "users",
            user.uid
          );

          const profileSnapshot =
            await getDoc(profileRef);

          let profile = null;

          if (profileSnapshot.exists()) {
            profile = profileSnapshot.data();
          }

          const periodCollection = collection(
            db,
            "users",
            user.uid,
            "periodHistory"
          );

          const periodSnapshot =
            await getDocs(periodCollection);

          let latestPeriod = null;

          if (!periodSnapshot.empty) {
            const periodRecords =
              periodSnapshot.docs.map(
                (periodDoc) => ({
                  id: periodDoc.id,
                  ...periodDoc.data(),
                })
              );

            periodRecords.sort((a, b) => {
              const dateA = convertToDate(
                a.startDate ||
                  a.periodDate ||
                  a.lastPeriodDate
              );

              const dateB = convertToDate(
                b.startDate ||
                  b.periodDate ||
                  b.lastPeriodDate
              );

              const timeA =
                dateA?.getTime() || 0;

              const timeB =
                dateB?.getTime() || 0;

              return timeB - timeA;
            });

            latestPeriod =
              periodRecords[0];
          }

          setUserData({
            profile,
            latestPeriod,
          });

          const userName =
            profile?.name ||
            profile?.fullName ||
            user.displayName ||
            "there";

          setMessages((previous) => {
            if (
              previous.length === 1 &&
              previous[0].id === 1
            ) {
              return [
                {
                  id: Date.now(),
                  sender: "bot",
                  text: `Hello, ${userName}! 👋💗 I'm your HerCycle AI Assistant. I can help you with your cycle, symptoms, medicines, diet and wellness. You can even ask me when your next period is expected.`,
                },
              ];
            }

            return previous;
          });
        } catch (error) {
          console.error(
            "Error loading AI Assistant data:",
            error
          );
        } finally {
          setAuthLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  /* ==========================================
     AUTO SCROLL
  ========================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /* ==========================================
     SEND MESSAGE
  ========================================== */

  const sendMessage = (
    customMessage = null
  ) => {
    const message =
      customMessage || input.trim();

    if (!message || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        getBotResponse(
          message,
          userData
        );

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response,
      };

      setMessages((previous) => [
        ...previous,
        botMessage,
      ]);

      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* ==========================================
     CLEAR CHAT
  ========================================== */

  const clearChat = () => {
    const userName =
      userData.profile?.name ||
      userData.profile?.fullName ||
      "there";

    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: `Chat cleared successfully. 💗 How can I help you today, ${userName}?`,
      },
    ]);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
      {/* HEADER */}

      <section className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
              <Bot size={28} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-pink-500">
                  AI Powered Support
                </p>

                <Sparkles
                  size={16}
                  className="text-purple-500"
                />
              </div>

              <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                HerCycle AI Assistant
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Ask questions about your cycle, symptoms,
                medicines, diet and general women's wellness.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearChat}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <Trash2 size={17} />
            Clear Chat
          </button>
        </div>
      </section>

      {/* LOGIN / LOADING STATUS */}

      {!authLoading && !isLoggedIn && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          <LogIn
            size={20}
            className="shrink-0"
          />

          <p>
            You are not currently logged in. You can
            still use general AI wellness guidance, but
            please log in to use your personal cycle and
            profile information.
          </p>
        </div>
      )}

      {/* MAIN CONTENT */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* LEFT SIDE */}

        <aside className="space-y-5">
          {/* AI STATUS */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Sparkles size={21} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  AI Wellness Assistant
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-emerald-600">
                    {authLoading
                      ? "Loading your profile..."
                      : isLoggedIn
                      ? "Online and personalized"
                      : "Online with general guidance"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK QUESTIONS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <MessageCircle
                size={19}
                className="text-pink-500"
              />

              <h2 className="font-bold text-slate-800">
                Quick Questions
              </h2>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Select a question to quickly start a conversation.
            </p>

            <div className="mt-4 space-y-3">
              {quickQuestions.map(
                (question) => {
                  const Icon =
                    question.icon;

                  return (
                    <button
                      key={question.text}
                      type="button"
                      onClick={() =>
                        sendMessage(
                          question.text
                        )
                      }
                      disabled={
                        isTyping ||
                        authLoading
                      }
                      className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left text-sm font-medium text-slate-600 transition hover:border-pink-200 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Icon
                        size={18}
                        className="shrink-0 text-pink-500"
                      />

                      <span>
                        {question.text}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* DISCLAIMER */}

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h3 className="font-bold text-amber-800">
                  Important
                </h3>

                <p className="mt-2 text-xs leading-5 text-amber-700">
                  This AI Assistant provides general wellness
                  information and does not replace professional
                  medical advice, diagnosis or treatment.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CHAT AREA */}

        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* CHAT HEADER */}

          <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-pink-50 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              <Bot size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">
                Chat with HerCycle AI
              </h2>

              <p className="text-xs text-slate-500">
                {isLoggedIn
                  ? "Using your available profile and cycle data"
                  : "Your women's wellness companion"}
              </p>
            </div>
          </div>

          {/* MESSAGES */}

          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5 sm:p-6">
            {messages.map(
              (message) => {
                const isUser =
                  message.sender === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      isUser
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isUser
                          ? "bg-slate-800 text-white"
                          : "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
                      }`}
                    >
                      {isUser ? (
                        <User size={17} />
                      ) : (
                        <Bot size={18} />
                      )}
                    </div>

                    <div
                      className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        isUser
                          ? "rounded-tr-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                          : "rounded-tl-sm border border-slate-100 bg-white text-slate-600"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              }
            )}

            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                  <Bot size={18} />
                </div>

                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}

          <div className="border-t border-slate-100 bg-white p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-50">
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your health and wellness..."
                disabled={authLoading}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !input.trim() ||
                  isTyping ||
                  authLoading
                }
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={19} />
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-400">
              Press Enter to send your message
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AIAssistant;