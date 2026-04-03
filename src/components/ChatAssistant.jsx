import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircleMore, Send, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const chatReplies = [
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: `Hello, my name is ${portfolioData.name}. I am a ${portfolioData.title} focused on modern frontend experiences and scalable backend systems.`,
  },
  {
    keywords: ['about', 'yourself', 'who are you'],
    reply: portfolioData.about,
  },
  {
    keywords: ['skill', 'tech', 'stack', 'technology'],
    reply: 'My strongest stack is React, Java, Spring Boot, REST APIs, MySQL, MongoDB, and modern responsive UI development.',
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach'],
    reply: `You can reach me at ${portfolioData.email}, call ${portfolioData.phone}, or connect with me on LinkedIn and GitHub from this portfolio.`,
  },
  {
    keywords: ['project', 'work', 'experience'],
    reply: 'I have worked on enterprise applications, client projects, and full-stack products using React, Java, Spring Boot, and production-focused debugging.',
  },
];

const initialMessage = {
  id: 'intro',
  role: 'bot',
  text: `Hi, I am Sujoy Bot. Type hello, about, skills, contact, or projects and I will reply about ${portfolioData.name}.`,
};

function getReplyForMessage(message) {
  const normalizedMessage = message.trim().toLowerCase();
  const matchedReply = chatReplies.find(({ keywords }) => keywords.some((keyword) => normalizedMessage.includes(keyword)));

  if (matchedReply) {
    return matchedReply.reply;
  }

  return 'You can ask me about Sujoy with messages like hello, about, skills, contact, or projects.';
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [pendingReply, setPendingReply] = useState('');
  const [typedReply, setTypedReply] = useState('');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typedReply]);

  useEffect(() => {
    if (!pendingReply) {
      return undefined;
    }

    if (typedReply.length === pendingReply.length) {
      const finalizeTimer = window.setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          { id: `bot-${Date.now()}`, role: 'bot', text: pendingReply },
        ]);
        setPendingReply('');
        setTypedReply('');
      }, 220);

      return () => window.clearTimeout(finalizeTimer);
    }

    const typingTimer = window.setTimeout(() => {
      setTypedReply(pendingReply.slice(0, typedReply.length + 1));
    }, 20);

    return () => window.clearTimeout(typingTimer);
  }, [pendingReply, typedReply]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || pendingReply) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', text: trimmedMessage },
    ]);
    setPendingReply(getReplyForMessage(trimmedMessage));
    setTypedReply('');
    setInputValue('');
  };

  return (
    <div className="chat-widget-shell">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="chat-widget-panel"
          >
            <div className="chat-header">
              <div className="flex items-center gap-3">
                <img src="/myphoto.jpeg" alt={portfolioData.name} className="chat-avatar" />
                <div>
                  <p className="text-white font-semibold leading-tight">Sujoy Bot</p>
                  <p className="text-slate-400 text-sm">Replying with portfolio details</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="chat-status-pill">
                  <span className="chat-status-dot" />
                  Online
                </div>
                <button type="button" onClick={() => setIsOpen(false)} className="chat-close-btn" aria-label="Close chat">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="chat-messages compact">
              {messages.map((message) => (
                <div key={message.id} className={`chat-row ${message.role}`}>
                  {message.role === 'bot' && <img src="/myphoto.jpeg" alt={portfolioData.name} className="chat-avatar small" />}
                  <div className="chat-bubble">
                    {message.text}
                  </div>
                </div>
              ))}

              {pendingReply && (
                <div className="chat-row bot">
                  <img src="/myphoto.jpeg" alt={portfolioData.name} className="chat-avatar small" />
                  <div className="chat-bubble is-typing">
                    {typedReply}
                    <span className="chat-caret">|</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="chat-input"
                placeholder="Type hello, about, skills, contact..."
                disabled={Boolean(pendingReply)}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!inputValue.trim() || Boolean(pendingReply)}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((current) => !current)}
        className="chat-fab"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} /> : <MessageCircleMore size={22} />}
      </motion.button>
    </div>
  );
}