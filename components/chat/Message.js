import { useState, useEffect } from "react";
import Image from 'next/image'
import Profile from '/components/chat/Profile'

import BubbleContainer from '/components/chat/BubbleContainer'

import styles from '/styles/components/chat/Message.module.css'

export default function Message(props) {
  const {room, chat, prevChat} = props;
  const [who, setWho] = useState('friend');
  const isLeader = room.leaderId === chat.senderId ? true : false;
  const isPrevSender = prevChat && prevChat.senderId === chat.senderId ? true: false;
  useEffect(()=>{
    const isTheSameTime = ()=>{
      let chatDate = new Date(chat.timestamp);
      const chatHourMin = `${chatDate.getHours()}:${chatDate.getMinutes()}`;
      chatDate = new Date(prevChat.timestamp);
      const prevChatHourMin = `${chatDate.getHours()}:${chatDate.getMinutes()}`;
      return chatHourMin === prevChatHourMin;
    }

    const showPrevChatCreateAt = (prevChat && prevChat.senderId === chat.senderId 
                                && isTheSameTime()) ? false: true;
    if (!showPrevChatCreateAt) {
      const target = document.getElementById(prevChat.chatId)
        .querySelector('div:nth-child(2)');
      target.remove();
    }
    setWho(chat.senderId === localStorage.getItem('userId') ? 'me':'friend');
  },[chat, prevChat])
  return (
    <div className={styles.messageContainer}>
      {
        who !== 'me' && !isPrevSender ?
          <Profile isLeader={isLeader} chat={chat}/>:''
      }
      <BubbleContainer chat={chat} who={who}/>
    </div>
  )
}
