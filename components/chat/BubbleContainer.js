import { useState, useEffect } from "react";
import Image from 'next/image'
import Bubble from '/components/chat/Bubble'
import MessageTime from '/components/chat/MessageTime'
import styles from '/styles/components/chat/Bubble.module.css'

export default function BubbleContainer(props) {
  const {chat, who} = props;
  return (
    <div className={`${styles.bubbleContainer} ${styles[who]}`} id={chat.chatId}>
      <Bubble chat={chat} who={who}/>
      <MessageTime chat={chat}/>
    </div>
  )
}
