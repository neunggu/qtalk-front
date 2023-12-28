import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/items/item/FriendItemForSearchResult.module.css'
import { userImageUrl } from '/util/util.js'

export default function FriendItemForSearchResult(props) {
  const {item, who} = props;
  const [requestStatus, setRequestStatus] = useState(item.requestStatus);
  useEffect(()=>{
    setRequestStatus(item.requestStatus);
  },[item.requestStatus])

  const requestFriends = async ()=>{
    const headers = {
      'Authorization':localStorage.getItem("accessToken")
    }
    const response = await fetch(`${process.env.CHAT_API_URL}/friend/request/${item.email}`, {
      method: "POST",
      headers
    });
    const result = await response.json();
    setRequestStatus(result.requestStatus);
  }

  const movoToChat = ()=>{
    //개인 채팅방 오픈
    console.log('chat chat chat');
  }

  return (
    <div className={`${styles.friendItemForSearchResult} ${who==='me' ? styles.me: styles.friend}`}>
      <div className={styles.info}>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src={userImageUrl(item.image)} alt="friend image" layout="fill" />
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{item.nickName}</div>
          <div className={styles.email}>{item.email}</div>
        </div>
        {requestStatus===100 ? <div className={`${styles.btnRequestFriend} ${styles.requested}`}>요청중</div>
          :requestStatus===200 ? <div className={`${styles.btnRequestFriend} ${styles.requested}`} onClick={()=>movoToChat()}>메세지</div>
          :<div className={`${styles.btnRequestFriend} ${styles.request}`} onClick={()=>requestFriends()}>등록</div>
        }
      </div>
    </div>
  )
}
