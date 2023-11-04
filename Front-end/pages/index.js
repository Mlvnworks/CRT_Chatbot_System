import Chat from '@/components/Chat';
import Showcase from '@/components/Showcase';
import React from 'react';
import style from '@/styles/chat.module.css';

const index = () => {
    return (
        <>
            <section className={style.chat_layout}>
                <Showcase />
                <Chat />
            </section>
        </>
    );
};

export default index;
