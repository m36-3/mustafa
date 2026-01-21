
import React, { useState, useRef, useEffect } from 'react';
import { Patient } from '../types';
import { getAIReport } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface AIWidgetProps {
  patient: Patient;
}

const AIWidget: React.FC<AIWidgetProps> = ({ patient }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `مرحباً دكتور. أنا مساعدك الطبي الذكي. كيف يمكنني مساعدتك بخصوص حالة المريض ${patient.fullName}؟` }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);

    const aiResponse = await getAIReport(patient, userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end animate-fadeIn'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-white text-gray-800 border-r-4 border-medicalBlue rounded-br-none' 
                : 'bg-medicalBlue text-white rounded-bl-none font-medium'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-medicalBlue/10 p-4 rounded-2xl flex gap-2">
              <span className="w-2 h-2 bg-medicalBlue rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-medicalBlue rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-medicalBlue rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <form onSubmit={handleAsk} className="relative">
          <textarea
            rows={2}
            placeholder="اكتب سؤالك هنا (مثلاً: ما هي مخاطر تداخل الأدوية الحالية؟)"
            className="w-full bg-gray-50 border-2 border-transparent focus:border-medicalBlue focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all resize-none text-sm font-bold"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(e as any); } }}
          ></textarea>
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute left-3 bottom-3 w-10 h-10 bg-medicalBlue text-white rounded-xl flex items-center justify-center disabled:opacity-30 hover:scale-105 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIWidget;
