import { useState, useEffect } from "react";
import styles from '/styles/components/chat/Message.module.css'

export default function Message(props) {
  const {chat} = props;
  return (
    <div className={styles.infoMessageContainer}>
      <div className={styles.infoMessage}>{chat.message}</div>
    </div>
  )
}
