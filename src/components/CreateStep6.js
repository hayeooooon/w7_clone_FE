import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const CreateStep6 = ({ setStep, setData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nextButton = useRef();
	const [participants, setParticipants] = useState(3);
	useEffect(() => {
		setStep(6);
		setData((prev)=>{
			const newData = {...prev, id: 'idid', password: 'password'};
			return newData;
		})
	}, []);

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 0" }}>
				몇 명과 함께할까요?
				<span
					style={{
						display: "block",
						fontSize: "15px",
						color: "#989696",
						marginTop: "14px",
					}}
				>
					본인을 포함한 총 참여 인원 수를 알려주세요.
				</span>
			</h3>
			<div style={{margin: '40px 0 30px'}}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<MinusButton
						type="button"
						disabled={participants <= 3}
						onClick={() => {
							if (participants > 3) {
								setParticipants(participants - 1);
							}
						}}
					>
						빼기
					</MinusButton>
					<span
						style={{
							fontSize: "22px",
							fontWeight: "700",
							padding: "0 40px",
							marginTop: "-4px",
							minWidth: "2em",
							textAlign: "center",
						}}
					>
						{participants}
					</span>
					<PlusButton
						type="button"
						disabled={participants === 10}
						onClick={() => {
							if (participants < 10) {
								setParticipants(participants + 1);
							}
						}}
					>
						더하기
					</PlusButton>
				</div>
				<div>
					<p
						style={{
							fontSize: "13px",
							textAlign: "center",
							fontWeight: "500",
							marginTop: "10px",
						}}
					>
						온라인
					</p>
				</div>
			</div>
			<div>
				<dl
					style={{
						borderRadius: "6px",
						backgroundColor: "#F4F4F4",
						padding: "12px 14px",
						fontSize: "13px",
						color: "#656060",
					}}
				>
					<dt style={{ color: "#222", fontWeight: "500", marginBottom: "8px" }}>
						소셜링 인원 제한 안내
					</dt>
					<dd style={{ marginBottom: "2px" }}>오프라인 : 3명 ~ 10명</dd>
					<dd>온라인 : 3명 ~ 10명</dd>
				</dl>
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
					ref={nextButton}
					onClick={() => {
						sessionStorage.setItem('limitHeadcount', participants)
						navigate("/create/step_7");
						setStep(7);
					}}
				>
					다음
				</Button>
			</div>
		</>
	);
};

const MinusButton = styled.button`
	position: relative;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #e1483c;
	font-size: 0;
	&:before {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		width: 12px;
		height: 2px;
		background-color: #fff;
		margin: -1px auto 0;
	}
	&:disabled {
		background-color: #dbdbdb;
	}
`;
const PlusButton = styled.button`
	position: relative;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #e1483c;
	font-size: 0;
	&:before,
	&:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		width: 12px;
		height: 2px;
		background-color: #fff;
		margin: -1px auto 0;
	}
	&:after {
		transform: rotate(90deg);
	}
	&:disabled {
		background-color: #dbdbdb;
	}
`;
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
export default CreateStep6;
