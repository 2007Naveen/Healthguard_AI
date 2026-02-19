import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { MessageCircle, Send, Trash2, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

// Connect AI API (OpenAI / Gemini / local model) here
const getChatbotResponse = (userInput: string): string => {
  // This placeholder function will be replaced with an actual AI API call
  // For now it returns a helpful prompt to show the chatbot is ready for integration
  return `Thank you for your question about "${userInput}". This health assistant will be connected to an AI service to provide general health guidance. Please consult a doctor for medical emergencies.`;
};

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am your Health Assistant. Ask me about general health tips, safe water practices, or preventive care. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate response delay — replace with actual API call
    setTimeout(() => {
      const response = getChatbotResponse(userMsg.content);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'bot', content: 'Chat cleared. How can I help you?' }]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border border-border shadow-card flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-card-foreground text-sm">Health Assistant</h3>
                <p className="text-xs text-muted-foreground">General health guidance</p>
              </div>
            </div>
            <button onClick={clearChat} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground" title="Clear chat">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="px-5 py-2 bg-warning/10 border-b border-warning/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning shrink-0" />
            <p className="text-xs text-warning">This chatbot provides general health guidance only. Consult a doctor for medical emergencies.</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'gradient-hero text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about health tips, safe water..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-lg gradient-hero text-primary-foreground disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthChatbot;
