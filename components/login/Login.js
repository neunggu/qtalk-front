import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from '/styles/components/Login.module.css'
import { signIn } from '/util/auth.js';

export default function Login(props) {
  const {setAuthorized}= props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = ()=>{
    try {
      signIn({ email, password })
    } catch (e) {
      alert("Failed to login");
      setEmail("");
      setPassword("");
    }
  }
  const handleClick = () => {
    login();
  };
  const handleKeyPress = (event) =>{
    if (event.key === 'Enter'){
      login();
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.login__title}>퀴즈톡 로그인</h1>
        <div className={styles.login__content}>
          <div className={styles.email}>
            <strong className={styles.login__text}>이메일 아이디</strong>
            <input 
              className={styles.login__input}
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              type="text" 
              placeholder="이메일 주소를 입력해주세요."/>
          </div>
          <div className={styles.pw}>
            <strong className={styles.login__text}>비밀번호</strong>
            <input 
              className={styles.login__input}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onKeyDown={handleKeyPress}/>
          </div>
          <button className={styles.login__btn} 
            onClick={handleClick}>로그인</button>
        </div>
      </div>

    </div>
  )
}
