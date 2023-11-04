import React from 'react';
import style from '@/styles/chat.module.css';

const ChatBox = ({ messageBy, message }) => {
    return messageBy === 'load' ? (
        <div className={`${style.bot_chat_box} ${style.load}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    ) : (
        <div className={messageBy === 'bot' ? style.bot_chat_box : style.user_chat_box}>
            <p>{message}</p>
        </div>
    );
};

export default ChatBox;
