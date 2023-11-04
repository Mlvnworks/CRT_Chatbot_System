import React, { useRef, useState } from 'react';

import style from '@/styles/chat.module.css';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const Chat = () => {
    const [displayChat, setDisplayChat] = useState(true);
    let [conversation, setConversation] = useState([]);
    let [botLoad, setBotLoad] = useState(false);

    const chatContainer = useRef(null);

    const scrollUp = () => {
        const targetScroll = chatContainer.current.scrollHeight + 200;
        console.log(targetScroll);
        chatContainer.current.scrollTop = targetScroll;
    };

    const addBotChat = async msg => {
        setBotLoad(prev => true);
        scrollUp();
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                query: msg,
            }),
        };
        const send = await fetch(`http://localhost:3000/api/ai/ask`, options);
        const response = await send.json();
        setBotLoad(prev => false);
        setConversation(prevValue => [
            ...prevValue,
            {
                sender: 'bot',
                msg: response.data.choices[0].message.content,
            },
        ]);
        // Scroll Chat container
        scrollUp();
    };

    const sendChat = async msg => {
        setConversation(prevValue => [
            ...prevValue,
            {
                sender: 'user',
                msg: msg,
            },
        ]);
        // Scroll Chat container
        scrollUp();
        // send and fetch response to API
        await addBotChat(msg);
    };

    const clearChat = () => {
        setConversation([]);
    };
    return (
        <main className={displayChat ? style.chat : style.hide_chat}>
            <div className={style.chat_display_sm_screen} onClick={() => setDisplayChat(!displayChat)}>
                <div></div>
                <p>{displayChat ? 'Hide chat' : 'Show chat'}</p>
            </div>
            <section className={style.chats_container} ref={chatContainer}>
                <ChatBox messageBy={'bot'} message={'Hi! how can i assist you today'} />
                {conversation.map(({ sender, msg }, ind) => (
                    <ChatBox messageBy={sender} message={msg} key={ind} />
                ))}
                {botLoad ? <ChatBox messageBy={'load'} message={''} /> : <></>}
            </section>
            {/* This where the user type their question */}
            <ChatInput onSend={sendChat} clearChat={clearChat} />
        </main>
    );
};

export default Chat;
