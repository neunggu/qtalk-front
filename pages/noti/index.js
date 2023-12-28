
import { useState, useEffect } from "react";
import Image from 'next/image'

import PopupGnb from '/components/gnb/PopupGnb'
import styles from '/styles/pages/noti/noti.module.css'
import {notice} from '/util/data.js';


export default function Noti(props) {
    const { notice } = props;
    const [noti, setNoti] = useState('action');
    const popupTitle = '알림';
    const notices=notice[noti];
    return (
        <div className={styles.noti}>
            <PopupGnb title={popupTitle}/>
            <div className={styles.navContainer}>
                <div className={styles.nav}>
                    <a className={noti==='action' ? styles.active:''} onClick={()=>setNoti('action')}>활동알림</a>
                    <a className={noti==='quack' ? styles.active:''} onClick={()=>setNoti('quack')}>꽥알림</a>
                </div>
                <hr className={styles.hr} />
            </div>
            <div className={styles.container}>
                <main className={styles.main}>
                    {notices.map((notice, index)=>{
                        return (
                            <div className={styles.notice} key={index}>
                                <div className={styles.imageContainer}>
                                    <Image className={styles.image} src={notice.senderImage} alt="sender image"  layout="fill" objectFit="contain"/>
                                </div>
                                <div className={styles.contents}>
                                    <div className={styles.message}>{notice.message}</div>
                                    <div className={styles.createTime}>{notice.createTime}</div>
                                    {notice.type==='request_friend' ? 
                                        (<div className={styles.btnContainer}>
                                            <span className={styles.btn}>수락</span>
                                            <span className={styles.btn}>거절</span>
                                        </div>):''
                                    }
                                </div>
                            </div>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {
    return { props: { notice } }
}


