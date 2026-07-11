import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MessageForm = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите сообщение..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        required
      />
      <button type="submit" disabled={disabled}>
        Отправить
      </button>
    </form>
  );
};

MessageForm.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default MessageForm;