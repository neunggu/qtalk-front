import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/components/Qtalk.module.css'
import Nav from "/components/Nav";
import Gnb from "/components/gnb/Gnb";
import MyInfoContext from "/components/contexts/MyInfoContext";
import { getUserInfo } from '/util/auth.js';

export default function Qtalk(props) {
  const {pageName, children} = props;
  const [myInfo, setMyInfo] = useState({});

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    if (!accessToken) {
      localStorage.clear();
      window.location.replace(`/`);
    } else {
      getUserInfo().then((userInfo)=>{
        setMyInfo(userInfo);
      });
    }
  },[])
  return (
    <div className={styles.phone}>
      <MyInfoContext.Provider value={myInfo}>
        <Head>
          <title>Quack talk</title>
          <meta name="description" content="qtalk qtalk" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <Gnb pageName={pageName} />
          <main className={styles.main}>
            <Nav />
            <hr className={styles.hr} />
            {children}
          </main>
        </div>
      </MyInfoContext.Provider>
    </div>
  )
}
