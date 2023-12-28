import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/chat/Bubble.module.css'

export default function Bubble(props) {
  const {chat, who} = props;
  return (
      <div className={`${styles.bubble} ${styles[who]}`}>
        {chat.message}
      </div>
  )
}
