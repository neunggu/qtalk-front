import Image from 'next/image'
import styles from '/styles/components/gnb/Gnb.module.css'
import { openPopup } from '/util/util.js'

export default function Gnb(props) {
  const {pageName} = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        큐톡
      </div>
      <ul className={styles.icons}>
        <li>
          <a href="#">
            <Image src="/images/btn_search_nor.png" alt="search" layout="fill" />
          </a>
        </li>
        <li>
          <a onClick={()=>openPopup("/noti")}>
            <Image src="/images/btn_alarm_nor.png" alt="alarm" layout="fill" />
          </a>
        </li>
        <li>
          {pageName === "openTalks" ?
            <a onClick={()=>openPopup("/talks/openTalk/create")}>
              <Image src="/images/btn_addtalk.png" alt="add talk" layout="fill" />
            </a>
            :
            <a onClick={()=>openPopup("/talks/myTalk/create")}>
              <Image src="/images/btn_addqfriend.png" alt="add qfriend" layout="fill" />
            </a>
          }
        </li>
      </ul>
    </div>
  )
}
