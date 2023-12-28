import Qtalk from "/components/Qtalk";
import Banner from "/components/banner/Banner";
import OpenTalkItems from "/components/items/OpenTalkItems";
import {dataOpenTalks} from '/util/data.js';

export default function OpenTalks(props) {
    return (
        <Qtalk pageName="openTalks">
            <Banner title="오픈톡 만들고 함께 퀴즈풀기!" type="small" bgStyle={props.bgStyle} />
            <OpenTalkItems items={props.items} />
            <Banner title="광고배너!" type="big"  bgStyle={props.bgStyle} />
        </Qtalk>
    )
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.CHAT_API_URL}/room/all`)
    const items = await res.json();

    const bgColor = ['darkgoldenrod','brown','cadetblue','cornflowerblue','darkcyan'];
    const r = Math.floor(Math.random()*5);
    const bgStyle=`bg-${bgColor[r]}`;
    return { props: { items, bgStyle } }
}
  