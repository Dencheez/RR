import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Minus } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, t } = useLanguage();

  // Состояния для чата
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Theme styles
  const chatBg = isDark ? "bg-[#0d0d0d]/95 backdrop-blur-2xl border-white/10" : "bg-white/95 backdrop-blur-2xl border-black/10";
  const headerBg = isDark ? "bg-[#1a1a1a]/50" : "bg-[#f7f5f0]/50";
  const cardBg = isDark ? "bg-[#1a1a1a] border-white/5" : "bg-[#f0ede8] border-black/5";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const textColor = isDark ? "text-gray-400" : "text-gray-600";
  const inputContainerBg = isDark ? "bg-[#0d0d0d] border-white/10" : "bg-white border-black/10 shadow-inner";
  const inputColor = isDark ? "text-white" : "text-[#1a1a1a]";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user", id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = {
        text: "Спасибо за ваш вопрос! Наши специалисты свяжутся с вами в ближайшее время.",
        sender: "bot",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Open Button */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[300]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:p-5 rounded-full bg-[#c9a227] text-white shadow-[0_20px_50px_rgba(201,162,39,0.3)] transition-all flex items-center justify-center"
        >
          {isOpen ? <Minus size={24} strokeWidth={3} /> : <MessageCircle size={32} strokeWidth={2.5} />}
        </motion.button>
      </div>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 right-0 z-[400] h-[85vh] md:h-screen w-full md:w-[450px] shadow-2xl border-l flex flex-col transition-colors duration-300 rounded-t-[32px] md:rounded-t-none ${chatBg}`}
          >
            {/* Header */}
            <div className={`p-6 md:p-8 flex justify-between items-center border-b transition-colors duration-300 ${headerBg}`}>
              <div className="flex items-center gap-4">
                <div className="bg-[#c9a227] rounded-full p-2.5 shadow-lg shadow-[#c9a227]/20">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className={`font-black text-sm uppercase tracking-widest ${titleColor}`}>RiyadhRoof AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
                    </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/5 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-[#1a1a1a]'}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              <div className="mb-2">
                <h1 className="text-[#c9a227] text-4xl font-black mb-2 tracking-tighter">Hi there!</h1>
                <h2 className={`text-xl font-bold mb-4 transition-colors duration-300 ${titleColor}`}>How can I help you today?</h2>
                <div className={`p-6 rounded-3xl border text-sm leading-relaxed transition-colors duration-300 ${cardBg} ${textColor}`}>
                   I'm your virtual assistant, ready to help you find your dream home in Riyadh.
                </div>
              </div>

              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id}
                  className={`max-w-[85%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${msg.sender === "user"
                      ? "self-end bg-[#c9a227] text-white rounded-tr-none shadow-lg shadow-[#c9a227]/10"
                      : `${cardBg} ${titleColor} self-start border border-white/5 rounded-tl-none`
                    }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className={`p-6 md:p-8 border-t transition-colors duration-300 ${headerBg}`}>
              <div className={`relative flex items-center rounded-2xl px-2 py-2 border transition-colors duration-300 ${inputContainerBg}`}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className={`w-full bg-transparent px-4 py-3 text-sm font-medium outline-none ${inputColor}`}
                />
                <button
                  type="submit"
                  className="bg-[#c9a227] p-3.5 rounded-xl text-white shadow-lg shadow-[#c9a227]/20 hover:scale-105 active:scale-95 transition-transform"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIBot;