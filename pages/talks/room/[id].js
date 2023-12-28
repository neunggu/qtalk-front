
import { useState, useEffect} from "react";
import Image from 'next/image'

import ChatRoomGnb from '/components/gnb/ChatRoomGnb'
import Message from '/components/chat/Message'
import InfoMessage from '/components/chat/InfoMessage'
import MessageInput from '/components/chat/MessageInput'
import styles from '/styles/pages/talks/room.module.css'
import {dataOpenTalks, chats} from '/util/data.js';
import Stomp from 'stompjs';


export default function ChatRoom(props) {
    const { roomInfo } = props;
    
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState({room:roomInfo, isNewEnterUser:false, unReadMessages:[]});
    useEffect(()=>{
        //add listner
        async function fetchRoom(client){
            const res = await fetch(`${process.env.CHAT_API_URL}/room/enter?roomId=${roomInfo.roomId}`,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:localStorage.getItem('accessToken')
                },
            });
            const room = await res.json();
            setRoom(room);
            if (room.newEnterUser) {
                const messageObj = {
                    type:'JOIN',
                    roomId:room.room.roomId,
                    sender:localStorage.getItem('name'),
                }
                client.send(`/pub/chat/message`, {}, JSON.stringify(messageObj));
            } else {
                //localStorage 저장
                const allMessage = saveLocal(room.room.roomId, room.unReadMessages||[]);
                //set message
                setMessages(prev=>[...prev, ...allMessage]);
                readComplete(room.unReadMessages||[]);
                // sendMessage('READ','aaaad');
            }
            
        }
        //socket
        getSocket(fetchRoom);
    },[])
     
    useEffect(()=>{
        window.scrollTo(0,document.body.scrollHeight);
    },[messages])

    const getSocket = (firstJoinSendMessage)=>{
        const subscribeCallback = (msg) =>{
            // if (msg.type!=='READ') {
                const newMessage = JSON.parse(msg.body);
                setMessages(prev=>[...prev, newMessage]);
                saveLocal(room.room.roomId, [newMessage]);
                // 읽었다.
                readComplete([newMessage]);
                // sendMessage('READ', 'aaab');
            // }
        }
        const apiReply = (msg)=>{
            console.log('abcddd',msg.body);
        }

        const headers = {
          login: 'mylogin',
          passcode: 'mypasscode',
          // additional header
          'client-id': 'my-client-id'
        };
        const client = Stomp.client(`${process.env.SOCKET_ADDRESS}/ws`);
        // client.debug=true;
        client.reconnect_delay = 5000;
        client.heartbeat.outgoing = 10000; 
        client.heartbeat.incoming = 0;
        client.connect(headers, ()=>{
            setSocket(client);
            console.log("ws Connected!!");
            // 메세지 연결
            client.subscribe(`/sub/chat/room/${roomInfo.roomId}`, (msg)=>subscribeCallback(msg));
            // api 연결
            // client.subscribe(`/user/api/reply`, (msg)=>apiReply(msg));
            // first JOIN message
            if(firstJoinSendMessage){
                firstJoinSendMessage(client);
            }
        });
    }

    const sendMessage = (type, message)=>{
        const messageObj = {
          type,
          roomId:room.room.roomId,
          title:room.room.title,
          message,
          sender:localStorage.getItem('name'),
          senderId:localStorage.getItem('userId'),
          senderImage:localStorage.getItem('image'),
        }
        //send message
        if (socket && socket.connected) {
            socket.send(`/pub/chat/message`, {}, JSON.stringify(messageObj));
            document.querySelector("#messageInput").value='';
            
            //test
            // callApi();
        } else {
            getSocket();
        }
    }

    const callApi = (content)=>{
        console.log('callApi');
        const apiObj = {
          path:'abc',
          header:{Authorization:'아아'},
          body:{}
        }
        //send message
        if (socket.connected) {
            socket.send(`/api/call`, {}, JSON.stringify(apiObj));
        } else {
            getSocket();
        }
    }

    const close = async ()=>{
        //socket close
        socket.disconnect(()=>{
            console.log('disconnected');
        })
        //window close
        window.close();
    }
    const saveLocal = (roomId, unReadMessages)=>{
        let roomMessagesStr = localStorage.getItem("room:messages");
        if (!roomMessagesStr) {
            roomMessagesStr = JSON.stringify([]);
        }
    
        const roomMessages = JSON.parse(roomMessagesStr);
        const currentRoomMessagesIndex =roomMessages.findIndex(e=>e.roomId===roomId);
        let currentRoomMessages = {
                roomId, 
                messages:[]
            };
        if (currentRoomMessagesIndex >= 0) {
            currentRoomMessages = roomMessages.splice(currentRoomMessagesIndex,1)[0];
        } 
        currentRoomMessages.messages = [...currentRoomMessages.messages, ...unReadMessages];
        roomMessages.unshift(currentRoomMessages);
        localStorage.setItem("room:messages", JSON.stringify(roomMessages));
        return currentRoomMessages.messages;
    }
    const readComplete = async (messages)=>{
        if (messages.length === 0) {
            return;
        }
        // messages array
        // const chatIds = messages.map((message)=>message.chatId);
        // // rest 버전
        // const res = await fetch(`${process.env.CHAT_API_URL}/room/read`,{
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json',
        //         Authorization:localStorage.getItem('accessToken')
        //     },
        //     body: JSON.stringify(chatIds)
        // });
        // return res.json();

        // websocket 버전
        // if (socket) {
        //     const messageObj = {
        //         type:'READ',
        //         roomId:room.chatRoom.roomId,
        //         message:JSON.stringify(chatIds),
        //         senderId:localStorage.getItem('userId'),
        //       }
        //     socket.send(`/pub/chat/message`, {}, JSON.stringify(messageObj));
        // } else {
        //     sendMessage('READ', JSON.stringify(chatIds));
        // }
    }
    console.log(room);
    return (
        <div className={styles.room}>
            <ChatRoomGnb title={room.room.title} userCount={room.room.userCount} close={close}/>
            <div className={styles.container}>
                <main className={styles.main}>
                    {messages.map((chat, index, array)=>{
                        const prevChat = array[index-1]
                        return chat.senderId === 'info' ?
                        (<InfoMessage chat={chat} key={index} />)
                        :(<Message room={room.room} chat={chat} prevChat={prevChat} key={index} />)
                        
                    })}
                </main>
            </div>
            <MessageInput sendMessage={sendMessage} />
        </div>
    )
}

export async function getServerSideProps({params}) {
    const res = await fetch(`${process.env.CHAT_API_URL}/room/${params.id}`)
    const roomInfo = await res.json();
    return { props: { roomInfo, chats } }
}


