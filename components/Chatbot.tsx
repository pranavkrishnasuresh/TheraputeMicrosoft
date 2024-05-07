"use client"

import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";

interface ChatbotProps {
  showingStats: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({showingStats}) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([{ text: "Hey, so you did the dumbbell thrust exercise, right? How did it feel overall?", sender: "bot" }]);
  const [userEntry, setUserEntry] = useState<string>('');
  const [temp, setTemp] = useState<string>('');
  const [comment, setComment] = useState<string>('');



  const handleMessageSend = (messageText: string, sender: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: messageText, sender }]);
  };
  const sendCommentAndMessages = () => {
    console.log("h")
  }

  const sendPromptToServer = async () => {
    try {

      const prompt = `The following is how a user feels doing the dumbell thrust exercise. Ask them questions to figure out more about how their exercise went. You need to help ask questions that narrow down the problem. Be specific, but also nice. But also be super short and concise, only ask 1 sentence. If you find by looking at the messages that you have collected enough information, you can end the coneversation by giving them a summary of your conclusions. Here is what the user has to say: ${userEntry}. Now here is a log of all previous messages you sent so you can provide the best response: ${JSON.stringify(messages)}`;
      console.log(prompt)
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt
        }),
      });
      
      const responseData = await response.json();
      handleMessageSend(responseData, 'bot');
    } catch (error) {
      console.error('Error sending prompt to server:', error);
    }
  };
  


  useEffect(() => {
    if (userEntry.trim() !== '') {
      sendPromptToServer();
    }
  }, [userEntry]);

  return (
    <div className='flex flex-col gap-2'>
      <div className="chatbot-container bg-dark-900 border border-gray-700 rounded-lg flex flex-col w-200 h-96 overflow-hidden">
        {/* Add a section for user instructions */}
        <div className="instructions p-4 text-black-300">
          {showingStats ? <p>Here is your past exerience conversation</p> : <p>Please describe your exercise experience to the chatbot:</p>}
        </div>
        <div className="chatbot-messages flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'user' ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-500 text-white'} rounded-lg mb-4 px-4 py-2 max-w-70%`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input flex items-center p-4">
          {!showingStats && <Input
            value={temp}
            type="text"
            placeholder="Type your message here..."
            className="flex-1 rounded-lg bg-dark-800 text-gray-300"
            onValueChange={(value) => setTemp(value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleMessageSend(e.currentTarget.value, 'user');
                setUserEntry(e.currentTarget.value);
                setTemp("");
              }
            }}
          />}
        </div>
      </div>
      {/* Add manual comment section and submit button */}
      <div className="manual-comment pd-3 mt-4">
        {showingStats ? <h2 className="text-black-300 mb-2 pl-1">Your Past Comments</h2> : <h2 className="text-black-300 mb-2 pl-1">Comment</h2> }
        <Input
          disabled={showingStats}
          className="rounded-lg bg-dark-800 text-gray-300"
          onChange={(e) => setComment(e.currentTarget.value)}
          value={comment}
        />

        {showingStats && <h2 className='text-black-300 mb-2 mt-5 pl-1'>PT Feedback</h2>}
        {showingStats && <Input
          disabled={showingStats}
          className="rounded-lg bg-dark-800 text-gray-300"
          onChange={(e) => setComment(e.currentTarget.value)}
          value={comment}
        />}


        {!showingStats && <Button color="primary" className="mt-20" onClick={() => sendCommentAndMessages()}>
          Submit Analysis
        </Button>}
      </div>
    </div>
  );
};

export default Chatbot;
