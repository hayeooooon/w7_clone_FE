import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import TextInput from "./TextInput";
import ic_fee from "../images/ic_detail_fee.png";
import ic_fee_info from "../images/ic_fee_info.png";

const CreateStep7 = ({ setStep, setData, page, editState }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nextButton = useRef();
	const param = useParams().id;
	const [entryFee, setEntryFee] = useState(null);
	const [feeValue, setFeeValue] = useState('');
	const [feeInfo, setFeeInfo] = useState();
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [feeData, setFeeData] = useState();
	const [feeInfoData, setFeeInfoData] = useState();

	useEffect(()=>{
		setStep(7);
		setData((prev)=>{
			const newData = {...prev, nickname: 'nickname'};
			return newData
		})
	},[])
	
	useEffect(() => {
		setBtnDisabled(true);
		if (entryFee === 0) {
			setFeeData(0);
			setFeeInfo('');
			setFeeValue('');
			setBtnDisabled(false);
		}
		if (
			entryFee !== 0 &&
			feeValue?.length > 3 &&
			feeInfo?.length > 0
		) {
			setFeeData(parseInt(feeValue))
			setFeeInfo(feeInfo);
			setBtnDisabled(false);
		}
	}, [entryFee, feeValue, feeInfo]);

	useEffect(() => {
		setStep(8);
	}, []);

	useEffect(() => {
		if(page === 'edit'){
			if(sessionStorage.getItem('entryFee')){
				setEntryFee(sessionStorage.getItem('entryFee') > 0 ? 1 : 0);
				setFeeValue(sessionStorage.getItem('entryFee'));
				setFeeInfo(sessionStorage.getItem('entryFeeInfo'));
			}else{
				setEntryFee(editState?.entryFee > 0 ? 1 : 0);
				setFeeValue(editState?.entryFee);
				setFeeInfo(editState?.entryFeeInfo);
			}
		}
	}, [editState?.entryFee]);

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 0" }}>
				참가비가 필요한가요?
			</h3>
			<div style={{ margin: "20px 0" }}>
				<ul style={{ display: "flex", gap: "8px" }}>
					<li
						style={{
							flexBasis: "50%",
						}}
					>
						<label
							style={{
								display: "block",
								height: "50px",
								lineHeight: "46px",
								border: `1px solid ${entryFee === 0 ? "#E1483C" : "#DBDBDB"}`,
								backgroundColor: `${
									entryFee === 0 ? "#E1483C" : "transparent"
								}`,
								color: `${entryFee === 0 ? "#fff" : "#222"}`,
								borderRadius: "6px",
								textAlign: "center",
								boxSizing: "border-box",
							}}
						>
							<input
								type="radio"
								name="meetingType"
								checked={entryFee === 0 ? true : false}
								onChange={() => setEntryFee(0)}
							/>
							무료
						</label>
					</li>
					<li
						style={{
							flexBasis: "50%",
						}}
					>
						<label
							style={{
								display: "block",
								height: "50px",
								lineHeight: "46px",
								border: `1px solid ${entryFee > 0 ? "#E1483C" : "#DBDBDB"}`,
								backgroundColor: `${entryFee > 0 ? "#E1483C" : "transparent"}`,
								color: `${entryFee > 0 ? "#fff" : "#222"}`,
								borderRadius: "6px",
								textAlign: "center",
								boxSizing: "border-box",
							}}
						>
							<input
								type="radio"
								name="meetingType"
								checked={entryFee > 0 ? true : false}
								onChange={() => setEntryFee(1)}
							/>
							유료
						</label>
					</li>
				</ul>
				{entryFee > 0 && (
					<>
						<div style={{ marginTop: "22px" }}>
							<p
								className="label"
								style={{
									display: "flex",
									alignItems: "center",
									fontSize: "13px",
									marginBottom: "6px",
								}}
							>
								<em
									style={{
										display: "inline-block",
										background: `url(${ic_fee}) center / 20px 20px no-repeat`,
										width: "20px",
										height: "20px",
										margin: "1px 3px 0 0",
									}}
								></em>
								참가비
							</p>
							<InputArea className="type_box">
								<input
									type="number"
									placeholder="참가비를 입력해주세요. (최소 금액 1,000원)"
									style={{ fontSize: "15px", color: "#222" }}
									onInput={(e) => setFeeValue(e.target.value)}
									value={feeValue}
									minLength="4"
									maxLength="7"
								/>
							</InputArea>
						</div>
						<div style={{ marginTop: "22px" }}>
							<p
								className="label"
								style={{
									display: "flex",
									alignItems: "center",
									fontSize: "13px",
									marginBottom: "6px",
								}}
							>
								<em
									style={{
										display: "inline-block",
										background: `url(${ic_fee_info}) center / 20px 20px no-repeat`,
										width: "20px",
										height: "20px",
										margin: "1px 3px 0 0",
									}}
								></em>
								참가비 정보
							</p>

							<InputArea className="type_box">
								<input
									type="text"
									placeholder="참가비에 포함된 사항을 알려주세요."
									style={{ fontSize: "15px", color: "#222" }}
									onInput={(e) => setFeeInfo(e.target.value)}
									value={feeInfo}
								/>
							</InputArea>
						</div>
					</>
				)}
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
					disabled={btnDisabled}
					onClick={() => {
						sessionStorage.setItem('entryFee', feeData);
						sessionStorage.setItem('entryFeeInfo', feeInfo);
						navigate(page !== 'edit' ? '/create/step_8' : `/edit/${param}/step_8`);
						setStep(8);
					}}
				>
					등록하기
				</Button>
			</div>
		</>
	);
};

const InputArea = styled.div`
	&.type_box {
		input {
			border: 1px solid #d9d9d9;
			border-radius: 6px;
			overflow: hidden;
			border-bottom-color: #d9d9d9;
			height: 44px;
			box-sizing: border-box;
			padding: 0 14px;
			&:focus {
				border-bottom: 1px solid #d9d9d9;
			}
		}
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
export default CreateStep7;
