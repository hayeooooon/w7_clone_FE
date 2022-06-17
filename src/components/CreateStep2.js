import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateStep2 = () => {
  const navigate = useNavigate();
	const [inputValue, setInputValue] = useState("");
	const nextButton = useRef();

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				소셜링 제목을 작성해볼까요?
			</h3>
			<div className="input_area">
				<input
					type="text"
					placeholder="연희동으로 카페 투어가요 :)"
					maxLength="80"
					style={{ fontSize: "14px", color: "#222" }}
					onInput={(e) => setInputValue(e.target.value)}
				/>
			</div>
			<div
				style={{
					fontSize: "10px",
					color: "#B8B6B6",
					marginTop: "3px",
					textAlign: "right",
					letterSpacing: "0.03em",
				}}
			>
				<span style={{ color: "#222" }}>
					{inputValue.length > 0 ? inputValue.length : 0}
				</span>
				/ 80
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
					disabled={inputValue.trim().length >= 5 ? false : true}
					ref={nextButton}
					onClick={() => navigate("/register/step_3")}
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
	height: 40px;
	line-height: 40px;
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
