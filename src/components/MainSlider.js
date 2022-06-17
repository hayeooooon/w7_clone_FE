import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
	return (
		<Sliders>
			<ul>
				{sliders.map((v, i) => {
					return (
						<li key={i}>
							<Link to={v.link} taget="_blank" style={{display: 'block'}}>
								<ImageBox
									style={{ backgroundImage: `url(${v.img})` }}
								></ImageBox>
							</Link>
						</li>
					);
				})}
			</ul>
		</Sliders>
	);
};

const Sliders = styled.div`
  ul{
    white-space: nowrap;
    li{
      display: inline-block;
      vertical-align: top;
    }
  }
`
const ImageBox = styled.div`
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
  height: 0;
  padding-bottom: 62.5%;
`;
export default MainSlider;
