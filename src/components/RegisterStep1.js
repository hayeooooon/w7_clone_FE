import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TextInput from "./TextInput";

const RegisterStep1 = ({ setStep }) => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const nameRef = useRef();
	const pwRef = useRef();
	const pwCheckRef = useRef();
	const [btnDisabled, setBtnDisabled] = useState(true);
  const [email, setEmail] = useState(emailRef.current?.value);
  const [name, setName] = useState(nameRef.current?.value);
  const [pw, setPw] = useState(pwRef.current?.value);
  const [pwCheck, setPwCheck] = useState(pwCheckRef.current?.value);
  const [error, setError] = useState([]);
	const inputs = [emailRef.current?.value, nameRef.current?.value, pwRef.current?.value, pwCheckRef.current?.value];

  useEffect(() => {
		setStep(1);
	}, []);
	useEffect(()=>{
		if(inputs[0] !== undefined){
			for(let i=0; i<inputs.length; i++){
				if(inputs[i].trim().length <= 0){
					break;
				}else if(inputs[i].trim().length > 0 && i === inputs.length-1){
					setBtnDisabled(false);
				}
			}
		}
	}, [inputs])
	
  const validate = () => {
		const new_error = [];
    const regExpEamil = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const regExpPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,15}$/;
		const inputsLabel = ['Email', 'Name', 'Pw', 'PwCheck'];
		let failureLength = inputs.length;
		for(let i=0; i<inputs.length; i++){	
			// 빈칸 있을 경우 검사	
			if(inputs[i]?.trim().length <= 0 || inputs[i] === undefined){
				new_error.push(`blank${inputsLabel[i]}`);
				setError([...new_error]);
			}else{
				failureLength--;
			}
		}
		// 빈칸 없을 경우 유효성 검사 시작
		if(failureLength === 0){
			setError([]);
			if(emailRef.current?.value.match(regExpEamil) === null){
				setError(()=>{
					new_error.push('invalidEmail');
					return new_error;
				});
				return;
			}
			if(pwRef.current?.value.match(regExpPw) === null){
				setError((prev)=>{
					new_error.push('invalidPassword');
					return new_error;
				});
				return;
			}
			if(pwRef.current?.value !== pwCheckRef.current?.value){
				setError((prev)=>{
					new_error.push('unmatchedPassword');
					return new_error;
				});
				return;
			}
			sessionStorage.setItem('email', emailRef.current.value);
			sessionStorage.setItem('name', nameRef.current.value);
			sessionStorage.setItem('password', pwRef.current.value);
			navigate('/register/step_2');
			setStep(2);
		}
  }
  
	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 0" }}>
				정보를 입력해주세요.
        <span
					style={{
						display: "block",
						fontSize: "15px",
						color: "#989696",
						marginTop: "14px",
					}}
				>
					로그인 시 사용할 정보를 입력해주세요.
				</span>
			</h3>
			<div style={{ margin: "30px 0 0" }}>
      <div className="input_area">
          <p className="label">이메일</p>
          <TextInput
            placeholder="example@munto.kr"
            st="box"
            hideLength={true}
            fieldType="email"
						ref={emailRef}
						setTextValue={setEmail}
          />
         { error.indexOf('invalidEmail') > -1 && (<p className="txt_err">이메일 형식을 확인해주세요.</p>) }
				 { error.indexOf('blankEmail') > -1 && (<p className="txt_err">이메일을 입력해주세요.</p>) }
        </div>
        <div className="input_area">
          <p className="label">닉네임</p>
          <TextInput
            placeholder="닉네임을 입력해주세요."
            st="box"
            hideLength={true}
						ref={nameRef}
						setTextValue={setName}
          />
					{ error.indexOf('blankName') > -1 && (<p className="txt_err">닉네임을 입력해주세요.</p>) }
        </div>
        <div className="input_area">
          <p className="label">비밀번호</p>
          <TextInput
            placeholder="영문과 숫자를 포함하여 6~15자를 작성해 주세요."
            st="box"
            hideLength={true}
            fieldType="password"
						ref={pwRef}
						setTextValue={setPw}
          />
					{ error.indexOf('invalidPassword') > -1 && (<p className="txt_err">비밀번호는 영문과 숫자를 포함하여 6~15자를 작성해 주세요.</p>) }
					{ error.indexOf('blankPw') > -1 && (<p className="txt_err">비밀번호를 입력해주세요.</p>) }        
				</div>
        <div className="input_area">
          <p className="label">비밀번호 확인</p>
          <TextInput
            placeholder="영문과 숫자를 포함하여 6~15자를 작성해 주세요."
            st="box"
            hideLength={true}
            fieldType="password"
						ref={pwCheckRef}
						setTextValue={setPwCheck}
          />
					{ error.indexOf('unmatchedPassword') > -1 && (<p className="txt_err">비밀번호가 일치하지 않습니다.</p>) }
					{ error.indexOf('blankPwCheck') > -1 && (<p className="txt_err">비밀번호를 입력해주세요.</p>) }        
				</div>
			</div>
			<div
				style={{
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "0 12px 40px",
					background:
						"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
				}}
			>
				<Button
					type="button"
					disabled={btnDisabled}
					onClick={validate}
					>
					다음
				</Button>
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
export default RegisterStep1;
