import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { LoginPage } from "./login.tsx"
import { Link } from "react-router-dom"

export const SignupPage:React.FC = () => {
    const [ signFin, setSignFin ] = useState(false)

    const [ email, setEmail ] = useState<string|null>(null)
    const [ id, setId ] = useState<string|null>(null)
    const [ password,setPassword ] = useState<string|null>(null)
    
    const handleMailInput = (e) => {
        //이메일 중복 조건 -> 하려면 중복확인버튼도 넣어야함
        setEmail(e.target.value);
    }
    const handleIDInput = (e) => {
        //아이디 중복 조건 -> 하려면 중복확인버튼
        setId(e.target.value);
    }
    const handlePwInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        //비밀번호 조건
        const nowValue = event.currentTarget.value
        if(nowValue.length > 7 && nowValue.length < 16){
            setPassword(nowValue)
        }else{
            setPassword(null)
        }
    }

    const handleLogin = () => {
        if(password === null){
            alert("비밀번호 자리 수를 지켜주세요!")
        }else{
            fetch('http://tobehome.kro.kr:8080/signup', {
                method: 'post',
                headers: {
                    "Content-Type":"application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    email: email,
                    nickname: id,
                    password: password
                })
            })
            .then((response) => response.json())
            .then((data) => { 
            if(data.id){
                alert("회원가입 완료! 로그인 해주세요~");
                setSignFin(true);
            }
            else{
                alert(data.message);
                
            }
            });
        }
    }

    return <div className="LoginPageBg flex justify-center">
    <div>
        <img className="absolute top-0 right-0 max-h-full z-0" alt="LoginFlower" src="/img/loginFlower.svg"/>
        <div className="fixed w-[498px] h-[498px] -bottom-60 right-2/3 -left-40 bg-[#a0d4680d] rounded-[249px]" />
        <div className="fixed w-[650px] h-[650px] -bottom-80 right-2/3 -left-60 bg-[#a0d4680d] rounded-[325px]" />
        <div className="fixed w-[822px] h-[822px] -bottom-96 right-2/3 -left-80 bg-[#a0d4680d] rounded-[411px]" />
    </div>
    
    <div className="flex flex-col items-center justify-center h-full w-1/4 ">
        <img className='w-[130px]' alt="leaf" src='/img/logo.png'/>
        <img className="w-[123px] mb-4" alt="hand" src="/img/hand.png"/>
        <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md mb-4">
            <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/guest.png"/>
            <input 
                onChange={ handleMailInput }
                type="text" 
                placeholder="E-Mail" 
                className="LoginInput"/>
        </div>
        <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md mb-4">
            <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/guest.png"/>
            <input 
                onChange={ handleIDInput }
                type="text" 
                placeholder="ID" 
                className="LoginInput"/>
        </div>
        <div className="h-[16px] ml-auto text-xs font-extralight">
            {password ? 'Vaild Form!':
                '비밀번호 자리수: 8~15 자리'
            }
        </div>
        <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md mb-4">
            <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/lock.png"/>
            <input 
                onChange={ handlePwInput }
                type="password" 
                placeholder="password" 
                className="LoginInput"/>
        </div>
        
        <button 
        onClick={ handleLogin }
        className={`bg-white h-[50px] w-full z-30 rounded-md mb-4 border transition-all ${password ? 'hover:border-[#507e1f]':'hover:border-zinc-400'}`}>
            SIGN UP
        </button>
        {signFin && <Link to='/login' className="z-30"><button className="z-30 hover:font-semibold transition-all">로그인하러 가기</button></Link>}
    </div>
    
</div>
}