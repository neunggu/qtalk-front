import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/chat/Profile.module.css'

export default function Profile(props) {
  const {chat, isLeader} = props;
  return (
    <div className={styles.profile}>
      <div className={styles.profileImageContainer}>
        <Image className={styles.profileImage} src={`${process.env.USER_IMAGE_BASE_URL}/${chat.senderImage}`} alt="sender image" layout="fill"/>
        {isLeader ? (
          <div className={styles.leader}>
            <div className={styles.leaderImageContainer}>
              <Image src="/images/icon_leader.png" alt="leader image" layout="fill" />
            </div>
          </div>
        ):''}
      </div>
      <div className={styles.name}>{chat.sender}</div>
    </div>
  )
}
