import React, { useEffect, useState, forwardRef } from "react";
import styled from "styled-components";

const TextInput = ({ placeholder, maxLength, setTextValue, st, hideLength, fieldType, emailRef }, ref) => {
	const [inputValue, setInputValue] = useState();
	useEffect(() => {
		setTextValue && setTextValue(inputValue);
	}, [inputValue]);
	return (
		<>
			<InputArea className={`input_area ${st && "type_box"}`}>
				<input
					type={fieldType ? fieldType : 'text'}
					placeholder={placeholder}
					maxLength={maxLength}
					style={{ fontSize: "15px", color: "#222" }}
					onInput={(e) => setInputValue(e.target.value)}
					ref={ref && ref}
				/>
			</InputArea>
			{
				(hideLength === undefined || !hideLength) && 
				<div
					style={{
						fontSize: "11px",
						color: "#B8B6B6",
						marginTop: "3px",
						textAlign: "right",
						letterSpacing: "0.03em",
					}}
				>
					<span style={{ color: "#222" }}>
						{inputValue?.length > 0 ? inputValue.length : 0}
					</span>
					/ {maxLength}
				</div>
			}
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
export default forwardRef(TextInput);
