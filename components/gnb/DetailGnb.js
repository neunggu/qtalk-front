import Image from 'next/image'
import styles from '/styles/components/gnb/DetailGnb.module.css'

export default function DetailGnb(props) {
  const {imageSrc} = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.close} onClick={()=>window.close()}>+</div>
        <Image className={styles.image} src={imageSrc} alt="opentalk image" layout="fill" objectFit="cover" objectPosition="0 30%"/>
      </div>
    </div>
  )
}
