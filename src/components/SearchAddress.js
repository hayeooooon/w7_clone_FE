import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";

const SearchAddress = ({ setAddress, popupIsVisible, setPopupIsVisible }) => {
	const [activeClass, setActiveClass] = useState();
	useEffect(()=>{
		popupIsVisible ? setActiveClass('is_active') : setActiveClass('')
	},[popupIsVisible])
	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = "";
		if (data.addressType === "R") {
			if (data.bname !== "") {
				extraAddress += data.bname;
			}
			if (data.buildingName !== "") {
				extraAddress +=
					extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
		}
		setAddress(fullAddress);
		setPopupIsVisible(false);
	};

	if (popupIsVisible) {
		const themeObj = {
			bgColor: "#FFFFFF", //바탕 배경색
			pageBgColor: "#FFFFFF", //페이지 배경색
			textColor: "#222222", //기본 글자색
			queryTextColor: "#222222", //검색창 글자색
			outlineColor: "#FFFFFF", //테두리
			outlinePadding: 0,
		};
		return (
			<PopupWrap className={activeClass}>
				<p
					style={{
						textAlign: "center",
						fontWeight: "700",
						lineHeight: "32px",
						fontSize: "15px",
					}}
				>
					장소 선택
				</p>
				<ClosePopupBtn type="button" onClick={() => setPopupIsVisible(false)}>
					닫기
				</ClosePopupBtn>
				<DaumPostcodeEmbed
					onComplete={handleComplete}
					style={{ width: "100%", height: "100%" }}
					theme={themeObj}
					useBannerLink={false}
				/>
			</PopupWrap>
		);
	}
};

const PopupWrap = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 100%;
	bottom: 0;
	background-color: #fff;
	border-radius: 10px 10px 0 0;
	padding: 12px 18px 18px;
	transition: top ease-out .2s;
	&:before{
		position: absolute;
		content: '';
		left: 0;
		right: 0;
		top: -100vh;
		height: 200vh;
		z-index: -1;
		background: rgba(0,0,0,.4);
		transition: opacity ease-out .2s;
		opacity: 0;
	}
	&.is_active{
		top: 100px;
		&:before{
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
const ClosePopupBtn = styled.button`
	position: absolute;
	width: 32px;
	height: 32px;
	right: 18px;
	top: 12px;
	font-size: 0;
	&:before,
	&:after {
		position: absolute;
		left: 0;
		right: 0;
		width: 18px;
		margin: -1px auto 0;
		top: 50%;
		height: 2px;
		background-color: #222;
		content: "";
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
`;
export default SearchAddress;
