import styles from '/styles/components/chat/MessageTime.module.css'

export default function MessageTime(props) {
  const {chat} = props;
  const chatDate = new Date(chat.timestamp);
  return (
    <div className={styles.date}>{`${chatDate.getHours()}:${chatDate.getMinutes()}`}</div>
  )
}
