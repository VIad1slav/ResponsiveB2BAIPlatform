import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, Bot } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { cn } from '../ui/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIChatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Cześć! Jestem asystentem AI Plon. Jak mogę Ci pomóc dzisiaj?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Rozumiem! Pomogę Ci z tym zamówieniem. Czy chcesz zobaczyć dostępne produkty?',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button with AI Glow */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 text-white rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center justify-center z-40 animate-pulse hover:animate-none hover:scale-110"
          style={{
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel - Mobile (Full Screen) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-background z-50 flex flex-col">
          {/* Header with AI Glow */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('aiConcierge')}</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border shadow-sm'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input - Fixed at bottom */}
          <div className="p-4 border-t border-border bg-card shrink-0">
            <div className="flex items-center gap-2">
              <button className="p-3 text-primary hover:bg-accent rounded-full transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="flex-1 px-4 py-2 bg-background border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel - Desktop (Side Panel) */}
      {isOpen && (
        <div className="hidden lg:flex fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-2xl z-50 flex-col overflow-hidden border border-border">
          {/* Header with AI Glow */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('aiConcierge')}</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border shadow-sm'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input - Fixed at bottom */}
          <div className="p-4 border-t border-border bg-card shrink-0">
            <div className="flex items-center gap-2">
              <button className="p-2 text-primary hover:bg-accent rounded-full transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('typeMessage')}
                className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};