import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatBot.css";
import { FaAssistiveListeningSystems, FaPersonBooth, FaRobot } from "react-icons/fa";

const KB = [
  {
    q: ["hello", "hi", "hey", "good morning", "good afternoon"],
    a: "Hello! 👋 I'm the AI-Solutions assistant. I can help with services, contact info, blogs, events, and navigation. What would you like to know?",
  },
  {
    q: ["what is ai-solutions?", "ai-solutions?", "tell me about ai-solutions", "about","about you"],
    a: "AI-Solutions is a tech company specializing in AI-driven solutions, web development, and application prototyping. We help businesses leverage technology for growth.",
  },
  {
    q: ["where are you located", "location", "address", "headquarters", "where to find you"],
    a: "We are based in Butwal-11, Kalikanagar | Nepal but we work with clients globally. For visits, please schedule an appointment via the Contact page.",
  },
  {
    q: ["who developed you", "who made you", "developer", "creator", "about the developer"],
    a: "I was developed by Anup Bhattarai, student at ISMT College Butwal and a passionate developer. You can learn more about him on https://github.com/anupdev07 or https://www.linkedin.com/in/anup-bhattarai-242aab241/.",
  }, 
  {
    q: ["services","service", "what do you offer", "offerings", "what can you do"],
    a: "We provide Web Development, AI solutions (chatbots, ML models), Application Prototyping, and Consultation. See the Services page for details.",
  },

  {
    q: ["payment", "payment options", "how to pay", "billing"],
    a: "We accept various payment methods including credit cards, bank transfers, and digital wallets. For detailed billing inquiries, please contact our support.",
  },
  {
    q: ["contact", "how to contact", "email", "phone", "reach you"],
    a: "You can contact us via the Contact page or email info@ai-solutions.example. We usually respond within 1-2 business days.",
  },
  {
    q: ["blog", "articles", "seo", "posts"],
    a: "Our Blog contains articles on AI, software, and company updates. Check the Blog page for the latest posts.",
  },
  {
    q: ["events", "upcoming events", "workshop", "hackathon"],
    a: "Check the Events page to see upcoming and past events, and view event details and photo galleries.",
  },
  {
    q: ["projects", "portfolio", "clients", "case study"],
    a: "See our Projects section to view featured clients and case studies that highlight our work.",
  },
  {
    q: ["price", "pricing", "cost", "estimate", "quote"],
    a: "Pricing depends on scope. For a quick estimate, use the Contact form with your project details and we'll follow up with a proposal.",
  },
  {
    q: ["chatbot", "chat bot", "chatgpt", "ai chat"],
    a: "We can integrate AI-driven chatbots. For this demo, the chatbot provides FAQs and guidance. For a full conversational AI, contact us.",
  },
  {
    q: [],
    a: "Sorry, I didn't understand that. Could you rephrase? Or use the Contact page for personal help.",
  },
];

const SUGGESTIONS = [
  "What services do you offer?",
  "How can I contact you?",
  "Tell me about pricing",
  "Do you build chatbots?",
  "Upcoming events",
  "Latest blog posts",
];

function findAnswer(userText) {
  const text = userText.toLowerCase();
  for (const entry of KB) {
    if (entry.q.some((q) => text.includes(q))) {
      return entry.a;
    }
  }
  // fallback
  return KB[KB.length - 1].a;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I can help with website info, services, events and blogs. Ask me anything!" },
  ]);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setTimeout(() => {
      const answer = findAnswer(text);
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 400);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-box shadow-lg rounded-4">
          <div className="chatbot-header d-flex justify-content-between align-items-center px-3 py-2" style={{ background: "#23272b", color: "#fff", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
            <span className="fw-bold"> 
              <FaRobot style={{ marginLeft: 8 , marginRight: 8, fontSize: 22 }} />
               AI-Solutions Assistant
              
               </span>
            <button className="btn-close btn-close-white" aria-label="Close" onClick={() => setIsOpen(false)} style={{ fontSize: "1.2rem" }}></button>
          </div>
          <div className="chatbot-messages px-3 py-2" ref={messagesRef} style={{ background: "#181b1f", minHeight: 220, maxHeight: 320, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-message mb-2 ${m.sender}`}>
                <div
                  className="msg-text px-3 py-2 rounded-3"
                  style={{
                    background: m.sender === "bot" ? "#23272b" : "#ff4d29",
                    color: m.sender === "bot" ? "#fff" : "#fff",
                    alignSelf: m.sender === "bot" ? "flex-start" : "flex-end",
                    maxWidth: "85%",
                    fontSize: "1rem",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chatbot-suggestions px-3 pb-2 d-flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="btn btn-sm btn-outline-secondary rounded-pill"
                style={{ background: "#23272b", color: "#ffb366", border: "1px solid #444" }}
                onClick={() => setInput(s)}
                tabIndex={0}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="chatbot-input d-flex px-3 pb-3 gap-2">
            <input
              className="form-control rounded-3 bg-dark text-light border-0"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ boxShadow: "none" }}
            />
            <button
              className="btn btn-warning fw-bold rounded-3"
              style={{ background: "#ff4d29", border: "none" }}
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
          <div className="chatbot-footer text-center pb-2" style={{ fontSize: "0.95rem" }}>
            <a href="/contact" className="text-info">Contact</a> &bull; <a href="/faq" className="text-info">FAQ</a>
          </div>
        </div>
      )}
      <button
        className="chatbot-toggle"
        aria-label="Open chat"
        onClick={() => setIsOpen((s) => !s)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 9999,
          background: "#ff4d29",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 56,
          height: 56,
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          fontSize: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
      >
        💬
      </button>
    </div>
  );
}