import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import TextInput from "./TextInput";
import {signInAxios} from '../redux/moduels/user';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(true);
	const emailRef = useRef();
	const pwRef = useRef();
	const [email, setEmail] = useState(emailRef.current?.value);
	const [pw, setPw] = useState(pwRef.current?.value);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const validate = () => {
    const regExpEamil = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if(emailRef.current?.value.match(regExpEamil) === null){
      setInvalidEmail(true);
    }else{
      setInvalidEmail(false);
			dispatch(signInAxios(emailRef.current.value, pwRef.current.value))
    }
  }

	useEffect(() => {
		if (email?.trim().length > 0 && pw?.trim().length > 0) {
      setBtnDisabled(false);
		}else{
      setBtnDisabled(true);
    }
	}, [email, pw]);

	return (
		<>
			<div
				className="content"
				style={{ paddingBottom: "120px", boxSizing: "border-box" }}
			>
				<div className="set_inner">
					<div style={{ paddingTop: "30px" }}>
						<div className="input_area">
							<p className="label">이메일</p>
							<TextInput
								placeholder="이메일을 입력해 주세요."
								st="box"
								hideLength={true}
								fieldType="email"
								ref={emailRef}
								setTextValue={setEmail}
							/>
              {
                invalidEmail && ( <p className="txt_err">이메일 형식을 확인해주세요.</p> )
              }
						</div>
						<div className="input_area">
							<p className="label">비밀번호</p>
							<TextInput
								placeholder="비밀번호를 입력해 주세요."
								st="box"
								hideLength={true}
								fieldType="password"
								ref={pwRef}
								setTextValue={setPw}
							/>
						</div>
					</div>
					<div
						style={{
              padding: '22px 0 0',
							background:
								"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
						}}
					>
						<Button type="button" disabled={btnDisabled} onClick={validate}>
							다음
						</Button>
            <div style={{textAlign: 'right', padding: '22px 0 0'}}>
              <button type="button" 
                onClick={()=>navigate('/register/step_1')}
                style={{display: 'inline-block', color: '#989696', fontSize: '14px', fontWeight: '500', padding: '0 2px 0 0'}}
              >회원가입하기</button>
              <p style={{fontSize: '11px', color: '#BBBBBB', textAlign: 'center', margin: '42px 0 0'}}>가입을 진행할 경우, <em style={{fontStyle: 'normal', borderBottom: '1px solid #ccc'}}>서비스 약관</em> 및 <em style={{fontStyle: 'normal', borderBottom: '1px solid #ccc'}}>개인정보 처리방침</em>에 동의한 것으로 간주합니다.</p>
            </div>
					</div>
				</div>
			</div>
		</>
	);
};

const Button = styled.button`
	display: block;
	width: 100%;
	height: 46px;
	line-height: 46px;
	border-radius: 20px;
	background-color: #e1483c;
	color: #fff;
	font-size: 15px;
	text-align: center;
	font-weight: 500;
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
`;
export default Login;
