import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import Chatbot from './chatbot';
import logo from './images/logo.png';
import { ColorRing } from 'react-loader-spinner'

const App = () => {

  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([
    {
      'role': 'system',
      'content': 'Your task is to answer questions regarding a 12 week incubation program called Salto AI. Always respond in playful, positive tone. Use at most 30 words to respond.'
    }
  ]);
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

      //clear text area
      setPrompt('');

      setLoading(true);

      // wait for response from server
      const conversationJson = await Chatbot(
        prompt,
        newConversation
      );
      await setConversation(conversationJson);

    } catch (error) {
      alert(error);

    } finally {
      setLoading(false);
    }
  }, [loading, prompt, conversation]);



  return (
    <div className="wrapper">
      <img src={logo} className="logo" alt="SALTO logo" />;
      <div className="content">
        <div className="chatWrapper" ref={chatWrapperRef}>
          <div className="chat" ref={chatContentRef}>
            {conversation.length > 0 && conversation.slice(1).map((value, index) => (
                <div className={index % 2 === 1 ? "chatItem-left" : "chatItem-right"} key={index}>
                  <p className={index % 2 === 1 ? "text" : "text right"}>{value.content}</p>
                </div>
              ))}
            {loading && (
              <ColorRing
                height="50"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                colors={['#AAF9E9', '#130B49', '#FD68CA', '#DAFFA7', '#90A9E8']}
              />
            )}
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
