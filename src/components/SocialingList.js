import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import img_1 from "../images/img_slider_1.jpeg";
import img_2 from "../images/img_slider_2.jpeg";

const SocialingList = () => {
	return (
		<div style={{ padding: "22px 12px" }}>
			<h3 className="section_title" style={{paddingBottom: '13px'}}>추천 소셜링</h3>
			<ul>
				<SocialingItem>
					<Link to={`/detail/1`}>
						<div
							className="img_area"
							style={{ backgroundImage: `url(${img_1})` }}
						></div>
						<div className="info_area">
							<p className="info_title">계양구 해방클럽 :) 문화예술</p>
							<p className="info_date">
								<i>icon</i>
								<span>마포구</span>
								<span>6.17(금)</span>
								<span>오후 8시</span>
							</p>
							<ul className="members">
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
							</ul>
						</div>
					</Link>
				</SocialingItem>
				<SocialingItem>
					<Link to={`/detail/1`}>
						<div
							className="img_area"
							style={{ backgroundImage: `url(${img_1})` }}
						></div>
						<div className="info_area">
							<p className="info_title">계양구 해방클럽 :) 문화예술</p>
							<p className="info_date">
								<i>icon</i>
								<span>마포구</span>
								<span>6.17(금)</span>
								<span>오후 8시</span>
							</p>
							<ul className="members">
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
							</ul>
						</div>
					</Link>
				</SocialingItem>
				<SocialingItem>
					<Link to={`/detail/1`}>
						<div
							className="img_area"
							style={{ backgroundImage: `url(${img_1})` }}
						></div>
						<div className="info_area">
							<p className="info_title">계양구 해방클럽 :) 문화예술</p>
							<p className="info_date">
								<i>icon</i>
								<span>마포구</span>
								<span>6.17(금)</span>
								<span>오후 8시</span>
							</p>
							<ul className="members">
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
								<li>
									<span style={{ backgroundImage: `url(${img_2})` }}></span>
								</li>
							</ul>
						</div>
					</Link>
				</SocialingItem>
			</ul>
		</div>
	);
};


const SocialingItem = styled.li`
	border-radius: 10px;
	overflow: hidden;
	background-color: #fff;
	& + li {
		margin-top: 20px;
	}
	& > a {
		display: flex;
	}
	.img_area {
		width: 40%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.info_area {
		width: 60%;
		padding: 15px 10px;
		box-sizing: border-box;
		.info_title {
			font-size: 15px;
			font-weight: 500;
			line-height: 1.2;
			height: 1.2em;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.info_date {
			font-size: 11px;
			color: #989696;
			line-height: 1;
			padding: 10px 0 16px;
		}
	}
	.members {
		font-size: 0;
		li {
			display: inline-block;
			width: 15.2173%;
			vertical-align: top;
			border: 1px solid #f5f5f5;
			box-sizing: border-box;
			border-radius: 50%;
			overflow: hidden;
			& + li {
				margin-left: 5px;
			}
			span {
				display: block;
				height: 0;
				padding-bottom: 100%;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
`;
export default SocialingList;
