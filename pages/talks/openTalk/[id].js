
import { useState } from "react";
import Image from 'next/image';
import DetailGnb from '/components/gnb/DetailGnb'
import styles from '/styles/pages/talks/openTalk/detail.module.css'
import { dataOpenTalks } from '/util/data.js';
import { openPopup } from '/util/util.js';

export default function Detail(props) {
    const {item} = props;
    return (
        <div className={styles.detail}>
            <DetailGnb imageSrc={item.photo}/>
            <div className={styles.info}>
                <div className={styles.roomType}>{item.roomType}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <div className={styles.introduce}>{item.introduce}</div>
                <div className={styles.tags}><span className={styles.sharp}>#</span>{item.tags.map((tag)=>`#${tag} `)}</div>
                <div className={styles.icons}>
                    <div className={styles.iconContainer}>
                        <div className={styles.icon}>
                            <Image src="/images/icon_trophy.png" alt="trophy" layout="fill" />
                        </div>
                        <div className={styles.count}>0</div>
                    </div>
                    <div className={styles.iconContainer}>
                        <div className={styles.icon}>
                            <Image src="/images/icon_member.png" alt="trophy" layout="fill" />
                        </div>
                        <div className={styles.count}>{item.userCount}</div>
                    </div>
                </div>
                <div className={styles.btnAttend} onClick={()=>{openPopup(`/talks/room/${item.roomId}`)}}>참여하기</div>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.addedInfo}>
                <div className={styles.ranking}>
                    <div className={styles.title}>참여자 활동 랭킹</div>
                    <div className={styles.empty}>
                        <div className={styles.emptyImageContainer}>
                            <Image className={styles.emptyImage} src="/images/icon_empty.png" alt="empty image" layout="fill" objectFit="contain" />
                        </div>
                        <div className={styles.emptyMessage}>
                            아직 참여자들의 활동 랭킹 기록이 없어요.<br />
                            제일 먼저 랭킹 1순위에 도전해 보세요!
                        </div>
                    </div>
                </div>
                <div className={styles.quackHistory}>
                    <div className={styles.title}>퀴즈 기록</div>
                    <div className={styles.empty}>
                        <div className={styles.emptyMessage}>
                            해당 오픈톡에는 아직 퀴즈 기록이 없어요.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export async function getStaticPaths() {
//     const paths = dataOpenTalks.map((openTalk)=>(
//         {
//             params:{id:openTalk.id},
//         }
//     ))
//     return { paths, fallback: false }
// }

// export async function getStaticProps({params}) {
//     const id = params.id
//     const item = dataOpenTalks.filter((data)=>data.roomId===id)[0]
//     return { props: { item } }
// }

export async function getServerSideProps({params}) {
    const res = await fetch(`${process.env.CHAT_API_URL}/room/${params.id}`)
    const item = await res.json();
    return { props: { item } }
}