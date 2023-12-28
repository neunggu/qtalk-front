import { useContext } from "react";
import Link from "next/link"
import styles from '/styles/components/Nav.module.css'
import { useRouter } from 'next/router'
import MyInfoContext from "/components/contexts/MyInfoContext";

export default function Nav(props) {
  const myInfo = useContext(MyInfoContext);
  const { asPath } = useRouter();
  const links = [
    {
      path:`/talks/openTalks?accessToken=${myInfo.accessToken}`,
      label:"오픈톡",
    },
    {
      path:`/talks/myTalks?accessToken=${myInfo.accessToken}`,
      label:"참여톡",
    },
  ]; 
  return (
    <div className={styles.nav}>
      {links.map((link, index)=>{
        return (
          <Link href={link.path} key={index}>
            <a className={asPath === link.path ? styles.active:""}>{link.label}</a>
          </Link>
        )
      })}
    </div>
  )
}
