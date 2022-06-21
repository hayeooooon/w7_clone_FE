import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import img_1 from "../images/img_slider_1.jpeg";
import img_2 from "../images/img_slider_2.jpeg";
import img_3 from "../images/img_slider_3.jpeg";
import img_4 from "../images/img_slider_4.jpeg";

const MainSlider = () => {
	const sliders = [
		{
			img: img_1,
			link: "https://www.naver.com/",
		},
		{
			img: img_2,
			link: "https://github.com/MUNTOcloned/FE",
		},
		{
			img: img_3,
			link: "https://github.com/MUNTOcloned/BE",
		},
		{
			img: img_4,
			link: "https://spartacodingclub.kr/",
		},
	];
	const [current, setCurrent] = useState(1); // 최근 슬라이드 번호

	// start: 슬라이드 script
	const slidersRef = useRef();
	const [slidePosition, setSlidePosition] = useState(1); // translateX 값 state로 저장
	const intervalTime = `${4000}`; // setInterval 도는 시간
	let touchStart, touchEnd;
	let idx = 1;
	let initIntervalEvent;

	const showNextSlide = (sliders, width, reverse) => {
		const length = sliders.length - 2;
		if (reverse) {
			// 왼쪽(반대방향)으로 슬라이딩 되는 경우
			idx--;
			if (idx === 0) {
				// 첫번째 슬라이드(= 마지막 슬라이드 복제본)일 경우
				setTimeout(() => {
					slidersRef.current.setAttribute(
						"style",
						`transform: translateX(-${width * length}px); transition: none`
					);
					idx = length;
				}, 400); // 트랜지션 400ms 후에 마지막(첫번째 슬라이드 복제본 이전) 슬라이드 위치로 translateX 값 변경
				let position_x = idx * width;
				setSlidePosition(position_x);
			}
			let position_x = idx * width;
			setSlidePosition(position_x);
			idx === 0 ? setCurrent(length) : setCurrent(idx);
		} else {
			// 오른쪽으로 슬라이딩 되는 경우
			idx++;
			if (idx > length + 1) idx = 2; // 첫버째 슬라이드(마지막 슬라이드 복제본)일 경우
			if (idx === length + 1) {
				console.log(idx, length + 1, "?");
				setTimeout(() => {
					slidersRef.current.setAttribute(
						"style",
						`transform: translateX(-${width}px); transition: none`
					);
				}, 400); // 트랜지션 400ms 후에 첫번째(마지막 슬라이드 복제본 다음) 슬라이드 위치로 translateX 값 변경
			}
			let position_x = idx * width;
			setSlidePosition(position_x);
			idx === length + 1 ? setCurrent(1) : setCurrent(idx);
		}
	};
	useEffect(() => {
		// slidePosition값 변할때마다 = setInterval 때마다 translateX 값 이동
		slidersRef.current.setAttribute(
			"style",
			`transform: translateX(-${slidePosition}px);`
		);
	}, [slidePosition]);

	useEffect(() => {
		const sliderWidth = slidersRef.current?.offsetWidth;
		const sliderNodes = slidersRef.current?.childNodes;
		slidersRef.current.setAttribute(
			"style",
			`transform: translateX(-${sliderWidth}px);`
		);
		setTimeout(() => (slidersRef.current.className = "transition"), 100);
		let sliderArr = [];
		for (let i = 0; i < sliderNodes?.length; i++) {
			sliderArr.push(sliderNodes[i]);
		}
		// intervalTime 마다 showNextSlide 함수 실행
		console.log('set')
		initIntervalEvent = setInterval(showNextSlide, intervalTime, sliderArr, sliderWidth, false);
		slidersRef.current.addEventListener("touchstart", (e) => {
			touchStart = e.touches[0].pageX;
		});
		slidersRef.current.addEventListener("touchend", (e) => {
			touchEnd = e.changedTouches[0].pageX;
			clearInterval(initIntervalEvent); // 터치 이벤트 실행됐을 경우 clearInterval
			if(touchStart > touchEnd){
				showNextSlide(sliderArr, sliderWidth, false)
			}else{
				showNextSlide(sliderArr, sliderWidth, true)
			}
			initIntervalEvent = setInterval(showNextSlide, intervalTime, sliderArr, sliderWidth, false); // 다시 interval 시작
		});
	}, []);
	// end: 슬라이드 script

	return (
		<Sliders>
			<ul ref={slidersRef}>
				<li>
					<a
						href={sliders[sliders.length - 1].link}
						taget="_blank"
						style={{ display: "block" }}
					>
						<ImageBox
							style={{
								backgroundImage: `url(${sliders[sliders.length - 1].img})`,
							}}
						></ImageBox>
					</a>
				</li>
				{sliders.map((v, i) => {
					return (
						<li key={i}>
							<a href={v.link} taget="_blank" style={{ display: "block" }}>
								<ImageBox
									style={{ backgroundImage: `url(${v.img})` }}
								></ImageBox>
							</a>
						</li>
					);
				})}
				<li>
					<a href={sliders[0].link} taget="_blank" style={{ display: "block" }}>
						<ImageBox
							style={{ backgroundImage: `url(${sliders[0].img})` }}
						></ImageBox>
					</a>
				</li>
			</ul>
			<p className="slider_navi">
				{current} / {sliders.length < 10 ? sliders.length : "0" + sliders.length}
			</p>
		</Sliders>
	);
};

const Sliders = styled.div`
	position: relative;
	ul {
		white-space: nowrap;
		&.transition {
			transition: ease-out 400ms;
		}
		li {
			display: inline-block;
			width: 100%;
			vertical-align: top;
		}
	}
	.slider_navi{
		position: absolute;
		right: 8px;
		bottom: 8px;
		display: inline-block;
		font-size: 10px;
		color: #fff;
		line-height: 20px;
		padding: 0 8px;
		border-radius: 10px;
		background: rgba(0,0,0,.6);
		font-weight: 700;
	}
`;
const ImageBox = styled.div`
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 0;
	padding-bottom: 62.5%;
`;
export default MainSlider;
