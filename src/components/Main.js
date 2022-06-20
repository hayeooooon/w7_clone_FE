import "../css/common.css";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import MainCategory from "./MainCategory";
import MainSlider from "./MainSlider";
import SocialingList from "./SocialingList";

const Main = () => {
	return (
		<>
			<header>
				<div className="set_inner">
					<H1>
						<Link to="/">MUNTO</Link>
					</H1>
				</div>
			</header>
			<div className="container" style={{minHeight: '100vh',backgroundColor: '#F4F4F4'}}>
				<MainCategory></MainCategory>
				<MainSlider></MainSlider>
        <SocialingList stlyle={{backgroundColor: '#F4F4F4'}}></SocialingList>
			</div>
		</>
	);
};

const H1 = styled.h1`
	font-size: 30px;
	color: #e1483c;
	letter-spacing: 0.05em;
	line-height: 50px;
`;

export default Main;
