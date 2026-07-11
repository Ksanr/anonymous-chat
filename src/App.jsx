import React from 'react';
import { useChat } from './hooks/useChat';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import './App.css';

function App() {
  const { messages, userId, loading, error, sending, sendMessage } = useChat();
  console.log('App: количество сообщений =', messages.length);

  return (
    <div className="app">
      <h1>Анонимный чат</h1>
      {error && <div className="error">Ошибка: {error}</div>}
      <MessageList messages={messages} currentUserId={userId} />
      <div className="status-bar">
        {loading && <span>Обновление...</span>}
        {sending && <span>Отправка...</span>}
      </div>
      <MessageForm onSend={sendMessage} disabled={sending} />
    </div>
  );
}

export default App;