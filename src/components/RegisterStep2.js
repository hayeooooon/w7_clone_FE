import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterStep2 = ({ setStep }) => {
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [interest, setInterest] = useState(null);
	const interests = [
		"문화·예술",
		"운동·액티비티",
		"푸드·드링크",
		"여행·레져",
		"비즈니스·사교",
		"추천받는다",
	];
	useEffect(() => {
		setStep(2);
	}, []);
	useEffect(()=>{
		if(interest !== null){
			setBtnDisabled(false);
		}
	},[interest])
	

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 0" }}>
				관심사를 선택해 주세요.
				<span
					style={{
						display: "block",
						fontSize: "15px",
						color: "#989696",
						marginTop: "14px",
					}}
				>
					내 관심사에 딱 맞는 맞춤형 모임을 추천해 드려요.
				</span>
			</h3>
			<div style={{ margin: "30px 0 0" }}>
				<div className="input_area radio">
					<InterestGroup>
						{interests.map((v, i) => {
							return (
								<InterestList key={i}>
									<label>
										<input type="radio" name="interest" onChange={()=>setInterest(i)}/>
										<span>{v}</span>
									</label>
								</InterestList>
							);
						})}
					</InterestGroup>
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
					onClick={()=>{
						navigate('/register/step_3');
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
const InterestGroup = styled.ul`
	font-size: 0;
	margin: -5px -7px;
`
const InterestList = styled.li`
	display: inline-block;
	width: 33.3333%;
	vertical-align: top;
	padding: 5px 7px;
	box-sizing: border-box;
  label{
		position: relative;
		display: block;
		box-sizing: border-box;
		text-align: center;
		input{
			& + span{
				display: block;
				height: 50px;
				line-height: 48px;
				font-size: 14px;
				border-radius: 25px;
				border: 1px solid rgb(161, 161, 161);
			}
			&:checked{
				& + span{
					background-color: #e1483c;
					border-color: #e1483c;
					color: #fff;
					font-weight: 700;
				}
			}
		}
  }
`;
export default RegisterStep2;
