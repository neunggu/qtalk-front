import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/chat/MessageInput.module.css'

export default function MessageInput(props) {
  const {sendMessage} = props;
  const [message, setMessage] = useState('');
  
  const messageHandler = (event)=>{
    let value = event.target.value;
    if (!value || value.trim().length === 0) {
      return;
    }
    value = value.trim();
    setMessage(value);
  }
  const handleKeyPress = (event, key)=>{
      if (event.key === 'Enter'){
        document.querySelector("#sendBtn").click();
      }
  }

  return (
    <ul className={styles.foot}>
        <li className={styles.bottomImageContainer}>
            <Image src="/images/btn_drawer_open.png" alt="plus" layout="fill" objectFit="contain"/>
        </li>
        <li className={styles.bottomImageContainer}>
            <Image src="/images/btn_bot.png" alt="bot" layout="fill" objectFit="contain"/>
        </li>
        <li className={styles.messageInputContainer}>
            <input id="messageInput"
                  className={styles.messageInput} type="text" 
                  onChange={(event)=>messageHandler(event)} 
                  onKeyPress={(event)=>handleKeyPress(event)}/>
            <div className={styles.send}>
                <div className={styles.sendImageContaner}>
                    <Image id="sendBtn" src="/images/btn_send.png" alt="send" layout="fill" objectFit="contain" onClick={()=>sendMessage('CHAT', message)}/>
                </div>
            </div>
        </li>
    </ul>
  )
}
