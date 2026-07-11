import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = ({ userId, content, isOwn }) => {
  return (
    <div className={`message-item ${isOwn ? 'message-own' : 'message-other'}`}>
      <div className="message-bubble">
        <span className="message-text">{content}</span>
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isOwn: PropTypes.bool.isRequired,
};

export default MessageItem;