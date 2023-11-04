import React, { useRef, useState } from 'react';
import style from '@/styles/chat.module.css';

const ChatInput = ({ onSend, clearChat }) => {
    const [inputFocusState, setInputFocusState] = useState(false);

    const focus = e => setInputFocusState(true);

    const unFocus = e => setInputFocusState(false);

    // Refer to textArea
    let inquireInput = useRef(null);

    return (
        <section className={style.chat_input}>
            <div title='clear conversation' onClick={clearChat}></div>
            <form
                action=''
                onSubmit={async e => {
                    e.preventDefault();
                    inquireInput.current.setAttribute('readonly', true);
                    const query = inquireInput.current.value;
                    if (query !== '') {
                        inquireInput.current.value = '';
                        // Send the msg
                        await onSend(query);
                    }
                    // Empty the text input

                    inquireInput.current.removeAttribute('readonly');
                }}>
                <textarea ref={inquireInput} onFocus={focus} onBlur={unFocus} name='' id='' cols='30' rows='10' placeholder='Enter your question here'></textarea>
                <button title='send'></button>
                <label htmlFor='' className={inputFocusState ? style.textarea_focus_label : ''}></label>
            </form>
        </section>
    );
};

export default ChatInput;
