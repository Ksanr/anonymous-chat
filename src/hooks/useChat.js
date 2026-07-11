import { useState, useEffect, useCallback, useRef } from 'react';
import { getUserId } from '../utils/userId';

const API_URL = 'http://localhost:7070/messages';
const POLL_INTERVAL = 3000;

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const userId = getUserId();
  const isMounted = useRef(true);
  const lastMessageIdRef = useRef(0); // храним lastMessageId в рефе

  // Функция загрузки сообщений
  const fetchMessages = useCallback(async () => {
    const from = lastMessageIdRef.current;
    console.log('fetchMessages called with from=', from);
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?from=${from}`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      console.log('Получены данные:', data);
      if (data.length > 0 && isMounted.current) {
        setMessages(prev => {
          console.log('prev length:', prev.length);
          const updated = [...prev, ...data];
          console.log('updated length:', updated.length);
          return updated;
        });
        const last = data[data.length - 1];
        lastMessageIdRef.current = last.id; // обновляем реф
        console.log('lastMessageIdRef обновлён на', last.id);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // пустые зависимости

  // Отправка сообщения
  const sendMessage = useCallback(async (content) => {
    if (sending) return;
    setSending(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content }),
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      // После отправки сразу запрашиваем новые сообщения
      await fetchMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }, [userId, sending, fetchMessages]);

  // Периодический опрос
  useEffect(() => {
    // Первоначальная загрузка
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, POLL_INTERVAL);

    return () => {
      clearInterval(interval);
      isMounted.current = false;
    };
  }, [fetchMessages]);

  return {
    messages,
    userId,
    loading,
    error,
    sending,
    sendMessage,
  };
}