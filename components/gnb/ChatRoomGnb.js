import Image from 'next/image'
import styles from '/styles/components/gnb/ChatRoomGnb.module.css'

export default function ChatRoomGnb(props) {
  const {title, userCount, close} = props;
  return (
    <div className={styles.chatRoomGnb}>
      <div className={styles.container}>
        <div className={styles.close} onClick={close}>+</div>
        <div className={styles.title}>
          {title} <span className={styles.userCount}>({userCount})</span>
        </div>
      </div>
      <hr className={styles.hr} />
    </div>
  )
}
