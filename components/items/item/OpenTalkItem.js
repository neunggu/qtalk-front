import Image from 'next/image'
import styles from '/styles/components/items/item/OpenTalkItem.module.css'
import { openPopup } from '/util/util.js'

export default function OpenTalkItem(props) {
  const {item} = props; 
  const cutTitle = item.title.length > 30 ? `${item.title.substr(0,27)}...`: item.title;
  return (
    <div className={styles.card} onClick={()=>openPopup(`/talks/openTalk/${item.roomId}`)}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={item.photo} alt="opentalk image" width="100%" height="100%" layout="responsive" />
        <div className={styles.qCount}>Q {item.qCount||0}</div>
      </div>
      <div className={styles.roomType}>{item.roomType}</div>
      <h4 className={styles.title}>{cutTitle} <span className={styles.userCount}>{item.userCount}</span></h4>
      <div className={styles.tags}>{item.tags.map((tag)=>`#${tag} `)}</div>
    </div>
  )
}
