"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const faqData = {
  "services": "I offer:\n• Landing Pages - ₹5,000 starting\n• Business Websites - ₹15,000 starting\n• Website Redesigns - Custom pricing\n• Custom Solutions - ₹30,000+\n\nEach includes mobile-responsive design, SEO setup, and 2-3 revision rounds.",
  "pricing": "My pricing:\n• Starter: ₹5,000 (Landing page)\n• Standard: ₹15,000 (3-5 page business website)\n• Premium: ₹30,000+ (Custom solutions)\n\nAll packages include mobile responsiveness, SEO, and support.",
  "timeline": "Typical timeline:\n• Landing pages: 1-2 weeks\n• Business websites: 2-4 weeks\n• Custom projects: 1 month+\n\nRush delivery available for urgent projects.",
  "contact": "You can reach me via:\n• WhatsApp: +91 9843491564\n• Email: akashkennedy1@gmail.com\n• Instagram: @axash_k\n• LinkedIn: linkedin.com/in/akashkennedy\n\nOr use the contact form on this page!",
  "location": "I'm based in Chennai, India and work with local businesses throughout the region.",
  "default": "Hi! I'm Akash's assistant. I can help you with:\n\n• Services & Pricing\n• Project Timeline\n• Contact Information\n• General Inquiries\n\nFeel free to ask anything!"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: faqData.default,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("what do you do")) {
      return faqData.services;
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
      return faqData.pricing;
    } else if (lowerMessage.includes("timeline") || lowerMessage.includes("how long") || lowerMessage.includes("time")) {
      return faqData.timeline;
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
      return faqData.contact;
    } else if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("chennai")) {
      return faqData.location;
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 👋 How can I help you today? Feel free to ask about my services, pricing, or anything else!";
    } else {
      return "I'd be happy to help with that! You can ask me about:\n• Services & Pricing\n• Project Timeline\n• Contact Information\n\nOr click the 'Get a Website' button to start a project inquiry.";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "What's your pricing?",
    "How long does a project take?",
    "How can I contact you?",
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-accent rounded-full shadow-lg hover:bg-accent-dark transition-all duration-300 hover:scale-110 cursor-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-hover
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 right-6 z-[101] w-80 max-w-[calc(100vw-3rem)] max-h-[500px] bg-surface rounded-lg shadow-2xl border border-border overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent-bg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">Chat Assistant</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-border/30 transition-colors cursor-none"
                  data-hover
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === "bot"
                          ? "bg-accent-bg text-text-primary"
                          : "bg-accent text-white"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && (
                          <Bot className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Questions */}
              <div className="px-4 py-2 border-t border-border bg-surface/50">
                <p className="text-[10px] text-text-muted mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => {
                        setInputValue(question);
                        handleSendMessage();
                      }}
                      className="text-[10px] px-2 py-1 rounded-full border border-border bg-surface text-text-muted hover:border-accent hover:text-accent transition-colors cursor-none"
                      data-hover
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-surface">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-none"
                    data-hover
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
