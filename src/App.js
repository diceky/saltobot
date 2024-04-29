import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import Chatbot from './chatbot';
import logo from './images/logo.png';

const App = () => {

  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatWrapperRef = useRef(null);
  const chatContentRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current && chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatContentRef.current.offsetHeight;
    }
  }, [conversation]);

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setPrompt(value);
  }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    // Still loading, do not submit
    if (loading) return;

    setLoading(true);

    try {
      // merge new prompt to conversation
      const newConversation = [
        ...conversation,
        {
          'role': 'user',
          'content': prompt
        }
      ];
      await setConversation(newConversation);

      const conversationJson = await Chatbot(
        prompt,
        newConversation
      );
      await setConversation(conversationJson);
      setPrompt('');

    } catch (error) {
      alert(error);

    } finally {
      setLoading(false);
    }
  }, [loading, prompt]);



  return (
    <div className="wrapper">
      <img src={logo} className="logo" alt="SALTO logo" />;
      <div className="content">
        <div className="chatWrapper" ref={chatWrapperRef}>
          <div className="chat" ref={chatContentRef}>
            {conversation.length > 0 && conversation.map((value, index) => (
              <div className={index % 2 === 0 ? "chatItem-left" : "chatItem-right"}>
                <p className={index % 2 === 0 ? "text" : "text right"}>{value.content}</p>
              </div>
            ))}
          </div>
        </div>
        <form className="input" onSubmit={handleSubmit}>
          <label>
            <textarea
              rows='5'
              cols='50'
              value={prompt}
              onChange={handleMessageChange}
              placeholder="Type your question here..."
            />
          </label>
          <button className="btn-submit" type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
}

export default App;
