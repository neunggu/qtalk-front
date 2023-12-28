
import { useState } from "react";
import Image from 'next/image'
import PopupGnb from '/components/gnb/PopupGnb'
import FriendItemForSearchResult from '/components/items/item/FriendItemForSearchResult'
import styles from '/styles/pages/talks/myTalk/searchFriends.module.css'
import {users} from '/util/data.js';

export default function SearchFriends(props) {
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const {pageInfo} = props;

    const validate = (event) => {
        let value = event.target.value;
        if (!value || value.trim().length === 0) {
            return;
        }
        value = value.trim();
        setKeyword(value);
    };
    const handleKeyPress = async (event, key)=>{
        if (event.key === 'Enter'){
            const headers = {
                'Authorization':localStorage.getItem("accessToken")
              }
            const res = await fetch(`${process.env.CHAT_API_URL}/friend/search/${key}/${keyword}`, {headers});
            if (res.ok) {
                const result = await res.json();
                setSearchResult([result]);
            } else {
                setSearchResult([]);
            }
        }
    }
    return (
        <div className={styles.searchFriends}>
            <PopupGnb title={pageInfo.pageTitle}/>
            <div className={styles.container}>
                <div className={styles.search}>
                    <div className={styles.title}>{pageInfo.searchTitle}</div>
                    <div className={styles.searchInputContainer}>
                        <input className={styles.searchInput} type="search" placeholder={pageInfo.placeholder} 
                            onChange={(event)=>validate(event)} onKeyPress={(event)=>handleKeyPress(event, pageInfo.type)}/>
                    </div>
                </div>
                <hr className={styles.hr} />
                {searchResult.map((result, index)=><FriendItemForSearchResult item={result} key={index}/>)}
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = [
        {
            params:{type:"email"},
        },
        {
            params:{type:"qrcode"},
        },
        {
            params:{type:"phone"},
        },
    ]
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const pageData = {
        "email":{
            type:"email",
            pageTitle:"퀴즈톡 ID로 큐친 등록",
            searchTitle:"큐친 아이디 검색",
            placeholder:"등록할 큐친 퀴즈톡 아이디를 입력해주세요."
        },
        "qrcode":{
            type:"qrcode",
            pageTitle:"QR코드로 큐친 등록",
            searchTitle:"",
            placeholder:""
        },
        "phone":{
            type:"phone",
            pageTitle:"연락처로 큐친 등록",
            searchTitle:"연락처 검색",
            placeholder:"-없이 숫자만 입력해주세요."
        }
    }
    const pageInfo = pageData[params.type];

    return { props: { pageInfo } }
}