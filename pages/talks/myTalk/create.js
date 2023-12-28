
import { useState } from "react";
import Image from 'next/image'
import PopupGnb from '/components/gnb/PopupGnb'
import FriendItemForCreateTalk from '/components/items/item/FriendItemForCreateTalk'
import styles from '/styles/pages/talks/myTalk/create.module.css'

export default function Create(props) {
    const {friendItems} = props;
    const popupTitle="메세지 보내기";
    return (
        <div className={styles.createTalk}>
            <PopupGnb title={popupTitle}/>
            <div className={styles.container}>
                <main className={styles.main}>
                    <FriendItemForCreateTalk item={friendItems[0]} who="me"/>
                    <hr className={styles.hr}/>
                    <div className={styles.titleContainer}>
                        <h4 className={styles.title}>내 큐친 <span>{friendItems.length}</span></h4>
                        <div className={styles.search}>검색</div>
                    </div>
                    {
                        friendItems.map((friend, index)=>
                            <FriendItemForCreateTalk item={friend} key={index} who="friend"/>)
                    }
                </main>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {

    const res = await fetch(`https://randomuser.me/api/?results=10`);
    const result = await res.json();
    const friendItems = result.results

    return { props: { friendItems } }
}