import Image from 'next/image'
import styles from '/styles/components/items/item/FriendItemForCreateTalk.module.css'
import { userImageUrl } from '/util/util.js'

export default function FriendItemForCreateTalk(props) {
  const {item, who} = props;

  return (
    <div className={`${styles.friendItemForCreateTalk} ${who==='me' ? styles.me: styles.friend}`}>
      <div className={styles.info}>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src={userImageUrl(item.image)} alt="friend image" layout="fill" />
        </div>
        <div className={styles.name}>{item.name.nickName}</div>
        <div className={styles.btnCreateTalk} onClick={()=>alert('메세지')}>메세지</div>
      </div>
      <div className={styles.btnDelete} onClick={()=>alert('삭제')}>
        <div>삭제</div>
      </div>
    </div>
  )
}
