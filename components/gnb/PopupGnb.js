import Image from 'next/image'
import styles from '/styles/components/gnb/PopupGnb.module.css'

export default function PopupGnb(props) {
  const {title} = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.close} onClick={()=>window.close()}>+</div>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <hr className={styles.hr} />
    </div>
  )
}
