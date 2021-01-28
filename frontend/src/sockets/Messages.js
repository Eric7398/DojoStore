import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message.js'

const Messages = ({ messages, name }) => {

  const allMessages = messages.map((message, i) =>
    <div key={i}><Message message={message} name={name} /></div>
  )

  return (
    <ScrollToBottom>
      {allMessages}
    </ScrollToBottom>
  )
}

export default Messages
