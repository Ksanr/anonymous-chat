import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

const MessageList = ({ messages, currentUserId }) => {
  const listRef = useRef(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={listRef}>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          userId={msg.userId}
          content={msg.content}
          isOwn={msg.userId === currentUserId}
        />
      ))}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default MessageList;