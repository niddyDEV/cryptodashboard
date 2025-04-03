'use client';
import { useState } from 'react';
import { MoveUp } from 'lucide-react';

export default function ChatComponent() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');

      // Здесь можно добавить вызов API для взаимодействия с ИИ
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: 'This is a response from AI.', isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-zinc-700 rounded-lg">
      {/* Контейнер для сообщений с прокруткой */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded ${
              message.isUser ? 'bg-blue-500 ml-auto' : 'bg-zinc-600 mr-auto'
            }`}
            style={{ maxWidth: '70%', wordWrap: 'break-word' }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Контейнер для ввода сообщения */}
      <div className="flex rounded">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 rounded-r hover:bg-blue-600 transition-colors"
        >
          <MoveUp />
        </button>
      </div>
    </div>
  );
}