import styles from '/styles/components/banner/Banner.module.css'

export default function Banner(props) {
  const {title, type, bgStyle} = props;
  return (
    <div className={`${styles.banner} ${styles[type]} ${styles[bgStyle]}`} >
      {title}
    </div>
  )
}
