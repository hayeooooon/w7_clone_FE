import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import TextInput from './TextInput';

const CreateStep2 = ({setStep, setData, page}) => {
  const navigate = useNavigate();
	const param = useParams().id;
	const [textValue, setTextValue] = useState("");
	const nextButton = useRef();

	useEffect(()=>{
		setStep(2);
	},[]);


	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				소셜링 제목을 작성해볼까요?
			</h3>
			<TextInput placeholder="연희동으로 함께 카페투어가요 :)" maxLength="80" setTextValue={setTextValue}/>
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
					disabled={textValue?.trim().length >= 5 ? false : true}
					ref={nextButton}
					onClick={() => {
						sessionStorage.setItem('title', textValue);
						navigate(page !== 'edit' ? '/create/step_3' : `/edit/${param}/step_3`);
						setStep(3);
					}}
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
export default CreateStep2;
