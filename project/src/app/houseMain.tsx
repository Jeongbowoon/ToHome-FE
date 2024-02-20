import React, { useEffect, useState } from "react"
import { Menu } from "../interface/menu.tsx";
import { ListData } from '../interface/ListData.tsx';
import { topHouses } from '../interface/topHouses.tsx';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { PostData } from "../interface/PostData.tsx";

const TopCard = ({post_id, title, short_description, content, material_category, username}) => {
    //이렇게 받는지, 아이디만 받아서 id.contents 같이 써야하는지 모르겠음
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [contents, setContents] = useState('');
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState('');
*/
    //fetch로 GET 요청 -> 각각 저장

    return (
        <div className="flex items-center w-[650px] h-[480px] bg-[#ffffffb2] rounded-[52px] p-5 gap-4">
            <div className="w-[371px] h-[371px] bg-[#8181811a] rounded-[52px]">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgURl} alt="Photo" className="w-[482px] h-[482px] rounded-[52px]" />
                */}
            </div>
            
            <div className="flex flex-col max-w-[223px] max-h-[460px] gap-4">
                <h1 className="min-h-[45px] text-[30px] text-[#6C9441] overflow-y-hidden">{title}</h1>
                <hr className="w-full bg-black"/>
                <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{short_description}</div>
                <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{content}</div>
                
                <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                    {material_category.map((each, index) => {
                        return (
                            <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                        )
                    })}
                </div>

                <div className="mt-2 flex items-center gap-1">
                    <div className="w-[57px] h-[57px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                        */}
                    </div>
                    <div className="flex-col">
                        <div className="text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-[20px] text-[#000000b2]">{username}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HouseCard = ({ post_id, title, username }) => {
    const [ thisHouse, setThisHouse ] = useState<PostData>()
    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${post_id}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setThisHouse(data) }
            else{ alert(data.message) }
        });
    },[])

    return (
        <Link to={`/house/${post_id}`}>
        <div className="flex flex-col">
            <img src={thisHouse?.imageUrl} alt="Photo" className="w-[230px] h-[230px] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400" />
            <div className="flex justify-between items-end">
                <h1 className="w-[132px] text-[22px] text-left text-black overflow-hidden">{title}</h1>
                <div className="w-[80px] text-[18px] text-right text-[#00000080] overflow-hidden">{username}</div>
            </div>
        </div>
        </Link>
    )
}

export const HouseMainPage:React.FC = ()=>{
    const [ housesData, setHousesData ] = useState<ListData>();

    useEffect(() => {
        fetch("http://tobehome.kro.kr:8080/api/posts?page=1&size=100", {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setHousesData(data);
        })
    },[])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
    };
    
    return (
    <div className="flex flex-col items-center">
        <Menu/>

        {/* 상단 명예의 전당 */}
        <div className="flex mt-10 items-center gap-2">
            <Slider {...settings} className="MainSliderCSS">
                {topHouses.map((each, index) => {
                    return (
                        <TopCard key={index} {...each}/>
                    )
                })}
            </Slider>
        </div>

        {/* 집 사진들 3열 */}
        <div className="mt-10 grid grid-cols-3 gap-3">
            {housesData?.content.map((each,index) => {
                const reversedIndex = housesData.content.length - 1 - index;
                const currentPost = housesData.content[reversedIndex];

                if(currentPost.type==='interior'){
                    return (
                        <HouseCard
                            key={index}
                            post_id={currentPost.id}
                            title={currentPost.title}
                            username={currentPost.userId}
                        />
                    )
                }else {
                    return null;
                }
            })}
        </div>
    </div>
    )
}