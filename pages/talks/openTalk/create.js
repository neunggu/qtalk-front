import { useState } from "react";
import Image from 'next/image'
import PopupGnb from '/components/gnb/PopupGnb'
import styles from '/styles/pages/talks/openTalk/create.module.css'

export default function Create(props) {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [title, setTitle] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [tags, setTags] = useState([]);
    const [searchPermit, setSearchPermit] = useState(false);

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    const uploadToServer = async (event) => {
        if ( !image || !title || !introduce || tags.length<1) {
            alert('입력하시오');
            return;
        }
        const headers = {
            'Authorization':localStorage.getItem('accessToken'),
        }
        const body = new FormData();
        body.append("file", image);
        const data = {
            roomType:'OPEN_CHAT',
            title,
            introduce,
            tags,
            searchPermit,
            // users:[{email:"abc@abc.com"}]
        }
        const blob = new Blob([JSON.stringify(data)],{type:'application/json'})
        body.append('data', blob);

        // body.append("createRoomDTO.type", 'CHAT');
        // body.append("createRoomDTO.title", title);
        // body.append("createRoomDTO.introduce", introduce);
        // body.append("createRoomDTO.tags", tags);
        // body.append("createRoomDTO.searchPermit", searchPermit);
        // body.append("createRoomDTO.users", JSON.stringify([{email:"abc@abc.com"}]));


        const response = await fetch(`${process.env.CHAT_API_URL}/room/create`, {
          method: "POST",
          headers,
          body
        });
        if (response.ok) {
            window.opener.location.reload();
            window.close();
        } else {
            alert('error')
        }
        
    };
    const validate = (event, key) => {
        let limit = 0;
        let value = event.target.value;
        if (!value || value.trim().length === 0) {
            return;
        }
        value = value.trim();
        switch (key) {
            case 'title':
                limit = 30;
                if (value.length <= limit) {
                    setTitle(value);
                } else {
                    event.target.value = value.substr(0,limit);
                }
                break;
            case 'introduce':
                limit = 50;
                if (value.length <= limit) {
                    setIntroduce(value);
                } else {
                    event.target.value = value.substr(0,limit);
                }
                break;
            case 'tags':
                limit = 5;
                if (tags.length < limit) {
                    let valueArray = value.split('#');
                    valueArray = valueArray.filter(v=>v.trim().length>0);
                    const mergeArray = [...tags, ...valueArray];
                    const uniqueArray = [...new Set(mergeArray)];
                    const lastIndex = uniqueArray.length > limit ? limit:uniqueArray.length;
                    const resultTags = uniqueArray.splice(0,lastIndex);
                    setTags(resultTags);
                    document.querySelector('#inputTags').value='';
                }
                break;
            default:
                break;
        }
    };
    const addValueToLabel = (event)=>{
        let value = event.target.value;
        if (!value || value.trim().length === 0) {
            return;
        }
        const inputTagsLabel = document.querySelector('#inputTagsLabel');
        inputTagsLabel.value = value.trim();
    }
    const removeTag = (tag)=>{
        setTags(tags.filter((currentTag)=>currentTag !== tag))
    }

    const handleKeyPress = (event)=>{
        if (event.key === 'Enter'){
            document.querySelector('#inputTagsLabel').click();
        }
    }
    
    const popupTitle="오픈톡 만들기";
    return (
        <div className={styles.createOpenTalk}>
            <PopupGnb title={popupTitle}/>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.imageContainer}>
                        <h4>대표 이미지</h4>
                        <div className={styles.imageBackground}>
                            {
                                createObjectURL ? 
                                    <Image className={styles.openTalkImage} src={createObjectURL} alt="opentalk image" layout="fill" 
                                        onClick={()=>document.querySelector("#inputImageLabel").click()}/>
                                    :''
                            }
                            <label id="inputImageLabel" htmlFor="inputImage" className={`${styles.btnAddImage} ${createObjectURL ? styles.hide:''}`}>이미지 첨부</label>
                            <input type="file" id="inputImage" onChange={uploadToClient} hidden/>
                        </div>
                    </div>
                    <div className={styles.title}>
                        <h4>채팅방 이름</h4>
                        <input type="text" placeholder="오픈톡의 이름을 입력해주세요." onChange={(event)=>validate(event, 'title')}/>
                        <div className={styles.lengthLimit}>{title.length}<span>/30</span></div>
                    </div>
                    <div className={styles.introduce}>
                        <h4>한 줄 소개</h4>
                        <input type="text" placeholder="오픈톡에 대한 설명을 한줄로 소개해 주세요." onChange={(event)=>validate(event, 'introduce')}/>
                        <div className={styles.lengthLimit}>{introduce.length}<span>/50</span></div>
                    </div>
                    <div className={styles.tags}>
                        <h4>태그</h4>
                        <div className={styles.inputTagsContainer}>
                            <span className={styles.sharp}>#</span>
                            <label id='inputTagsLabel' htmlFor="inputTags" className={styles.btnAddTag} value='' onClick={(event)=>validate(event, 'tags')}>등록</label>
                            <input type="text" id="inputTags" placeholder="태그를 등록해주세요.(최대 5개)" 
                                onChange={(event)=>addValueToLabel(event)} onKeyPress={handleKeyPress}/>
                        </div>
                        <div className={styles.addedTagsContainer}>
                            <h5>등록된 태그</h5>
                            <div className={styles.addedTags} data-placeholder="등록된 태그가 없어요.">
                                {tags.map((tag, index)=>
                                    <span className={styles.addedTag} key={index} onClick={()=>removeTag(tag)}>{tag}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.searchPermit}>
                        <h4>채팅방 검색 허용</h4>
                        <label className={styles.btnSwitch}> 
                            <input type="checkbox" onChange={(event)=>setSearchPermit(event.target.checked)}/>
                            <span className={styles.onoffSwitch}/>
                        </label>
                    </div>
                    <div className={styles.create}>
                        <div className={styles.btnCreate} onClick={uploadToServer}>오픈톡 만들기</div>
                    </div>
                </main>
            </div>
        </div>
    )
}
