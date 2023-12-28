import { useState } from "react";
import Qtalk from "/components/Qtalk";
import FriendItems from "/components/items/FriendItems";
import MyTalkItems from "/components/items/MyTalkItems";
import AddFriendsSnackbar from "/components/AddFriendsSnackbar"
import {dataOpenTalks} from '/util/data.js';

export default function MyTalks(props) {
    const [showAddFriendsSnackbar, setShowAddFriendsSnackbar] = useState(false);
    return (
        <Qtalk pageName="myTalks">
            <FriendItems friendItems={props.friendItems} setShowAddFriendsSnackbar={setShowAddFriendsSnackbar}/>
            <hr size="1px" width="100%"/>
            <MyTalkItems myTalkItems={props.myTalkItems}/>
            <AddFriendsSnackbar showAddFriendsSnackbar={showAddFriendsSnackbar} setShowAddFriendsSnackbar={setShowAddFriendsSnackbar}/>
        </Qtalk>
    )
}

export async function getServerSideProps ({query}) {
    const headers = {
        'Authorization':query.accessToken
    }
    const res = await fetch(`${process.env.CHAT_API_URL}/friend/all`,  {headers});
    const items = await res.json();
    // const res = await fetch(`https://randomuser.me/api/?results=10`);
    // const items = await res.json();
    const friendItems = items;

    const myTalkItems = dataOpenTalks;

    return { props: { friendItems, myTalkItems } }
}
