'use client';
import { useState, useRef, useEffect } from 'react';
import { MoveUp } from 'lucide-react';

type Message = {
  text: string;
  isUser: boolean;
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Добавляем сообщение пользователя
    const userMessage = { text: inputText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Вызов нашего API роута
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            ...messages.map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              role: 'user',
              content: inputText
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      // Добавляем ответ ИИ
      setMessages(prev => [...prev, { text: aiMessage, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, there was an error processing your request.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4 bg-zinc-800 rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser 
                ? 'bg-blue-500 ml-auto' 
                : 'bg-zinc-600 mr-auto'
            }`}
            style={{ maxWidth: '80%' }}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-3 bg-zinc-600 rounded-lg mr-auto" style={{ maxWidth: '80%' }}>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex rounded-lg border border-zinc-600 overflow-hidden">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-3 bg-zinc-600 text-white focus:outline-none"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`p-3 ${isLoading ? 'bg-zinc-600' : 'bg-black-500'} hover:bg-white transition-colors`}
        >
          <MoveUp className={isLoading ? 'opacity-50' : ''} />
        </button>
      </div>
    </div>
  );
}