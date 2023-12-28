import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/items/item/MyTalkItem.module.css'
import { openPopup } from '/util/util.js'

export default function MyTalkItem(props) {
  // const [items, setItems] = useState(props.items);
  const {item} = props; 
  const isOpenTalk = item.roomType === '오픈톡' || item.roomType === 'OPEN_CHAT';

  return (
    <li className={styles.myTalk} onClick={()=>openPopup('/talks/myTalk/detail')}>
      <div className={`${styles.imageContainer} ${isOpenTalk ? styles.imageContainerOpen:''}`}>
        <Image className={`${styles.image} ${isOpenTalk ? styles.imageOpen:''}`} src={item.photo} alt="friend image" layout="fill"/>
        <div className={styles.qCount}>Q {item.qCount}</div>
      </div>
      <div className={styles.myTalkTitleContainer}>
        {isOpenTalk ? <div className={styles.openTalkMark}>{item.roomType}</div>:''}
        <h4 className={styles.myTalkTitle}>{item.title} <span className={styles.userCount}>{item.userCount}</span></h4>
        <div className={styles.myTalkIntroduce}>{item.introduce}</div>
      </div>
      {item.newMessageCount > 200 ? 
        <div className={styles.newMessageBadge}>200+</div> 
        : item.newMessageCount > 0 ?
          <div className={styles.newMessageBadge}>{item.newMessageCount}</div> : ''}
    </li>
  )
}
