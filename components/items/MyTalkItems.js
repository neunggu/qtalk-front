import { useState, useEffect } from "react";
import Image from 'next/image'
import MyTalkItem from '/components/items/item/MyTalkItem'
import styles from '/styles/components/items/MyTalkItems.module.css'

export default function MyTalkItems(props) {
  // const [items, setItems] = useState(props.items);
  const {myTalkItems} = props; 

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>내 큐톡</h4>
        <div className={styles.edit}>편집</div>
      </div>
      {
        myTalkItems.length > 0 ?
          <ul className={styles.myTalks}>
            {myTalkItems.map((item,index)=><MyTalkItem item={item} key={index}/>)}
          </ul>
        : <div className={styles.empty}>
          <div className={styles.emptyImageContainer}>
            <Image className={styles.emptyImage} src="/images/icon_empty.png" alt="empty image" layout="fill" objectFit="contain" />
          </div>
          <div className={styles.emptyMessage}>
            참여 중인 큐톡방이 없어요.<br />
            큐친톡 또는 오픈톡에서 함께 퀴즈톡을 즐겨보세요!
          </div>
        </div>
      }
    </div>
  )
}
