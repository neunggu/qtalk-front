import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/AddFriendsSnackbar.module.css'
import { openPopup } from '/util/util.js'

export default function AddFriendsSnackbar(props) {
  const {showAddFriendsSnackbar, setShowAddFriendsSnackbar} = props;

  return (
    <div className={`${styles.layer} ${showAddFriendsSnackbar ? styles.show:''}`} onClick={()=>setShowAddFriendsSnackbar(false)}>
      <div className={`${styles.snackbar} ${showAddFriendsSnackbar ? styles.show:''}`} onClick={(e)=>{e.stopPropagation()}}>
        <div className={styles.title}>큐친 등록</div>
        <div className={styles.contents}>
          <div className={styles.btnContainer} onClick={()=>openPopup(`/talks/myTalk/searchFriends/email`)}>
            <div className={styles.btn}></div>
            <div className={styles.name}>아이디</div>
          </div>
          <div className={styles.btnContainer} onClick={()=>openPopup(`/talks/myTalk/searchFriends/qr`)}>
            <div className={styles.btn}></div>
            <div className={styles.name}>QR코드</div>
          </div>
          <div className={styles.btnContainer} onClick={()=>openPopup(`/talks/myTalk/searchFriends/phone`)}>
            <div className={styles.btn}></div>
            <div className={styles.name}>연락처</div>
          </div>
        </div>
      </div>
    </div>
  )
}
