import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/items/FriendItems.module.css'
import grabStyles from '/styles/GrabScroll.module.css'
import { grabScroll, userImageUrl } from '/util/util.js'

export default function FriendItems(props) {
  // const [items, setItems] = useState(props.items);
  const {friendItems, setShowAddFriendsSnackbar} = props; 
  useEffect(()=>{
    grabScroll(`.${styles.friends}`, grabStyles);
  },[])
  return (
    <ul className={`${styles.friends} ${styles.noScroll}`}>
      <li className={styles.friend} onClick={()=>setShowAddFriendsSnackbar(true)}>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src="/images/btn_qfriend.png" alt="friend image" width="25" height="25" />
        </div>
        <div className={styles.nick}>친구 추가</div>
      </li>
      {friendItems.map((item,index)=>{
        return (
          <li className={styles.friend} key={index}>
            <div className={styles.imageContainer}>
              <Image className={styles.image} src={userImageUrl(item.image)} alt="friend image" layout="fill" />
            </div>
            <div className={styles.nick}>{item.nickName}</div>
          </li>
        )
      })}
    </ul>
  )
}
