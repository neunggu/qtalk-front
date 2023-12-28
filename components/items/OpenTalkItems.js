import { useState, useContext } from "react";
import Image from 'next/image'
import styles from '/styles/components/items/OpenTalkItems.module.css'
import OpenTalkItem from '/components/items/item/OpenTalkItem'


export default function OpenTalkItems(props) {
  const {items} = props; 

  return (
    <div className={styles.grid}>
      {items.map((item,index)=><OpenTalkItem item={item} key={index}/>)}
    </div>
  )
}
