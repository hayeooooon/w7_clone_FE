import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadMembersAxios} from "../redux/moduels/socialing";
import { MdLocationOn } from "react-icons/md";

import img_1 from "../images/img_slider_1.jpeg";
import img_2 from "../images/img_slider_2.jpeg";

const SocialingList = ({ socialings, tab }) => {
	const dispatch = useDispatch();
	const membersState = useSelector((state)=>state.socialing.members)
	const [data, setData] = useState();
	const [members, setMembers] = useState();
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const setDateFormat = (origin, i) => {
		const _month = origin.split("-")[1];
		const new_month = _month < 10 ? _month.split("0")[1] : _month;
		const new_day = origin.split("-")[2];
		const day = new Date(origin).getDay();
		const day_kr = ["일", "월", "화", "수", "목", "금", "토", "일"];
		data[i].startDate = `${new_month}.${new_day} (${day_kr[day]})`;
	};
	const setTimeFormat = (origin, i) => {
		const _hour = origin.split(":")[0]/1;
		const new_hour =
			_hour > 12 ? "오후 " + (_hour - 12) + "시" : "오전 " + _hour + "시";
		const new_min = origin.split(":")[1] + "분";
		data[i].startTime = `${new_hour} ${new_min}`;
	};
	useEffect(() => {
		if (socialings?.length > 0) {
			setData(socialings);
		}else{
			setData();
		}
	}, [socialings]);
	useEffect(()=>{
		if(data?.length > 0){
			data.map((v,i)=>{
				dispatch(loadMembersAxios(v.id, 'list'));
				setTimeFormat(v.startTime, i);
				setDateFormat(v.startDate, i);
			})
		}
	}, [data])
	useEffect(()=>{
		setMembers();
	}, [tab])
	

	useEffect(()=>{
		if(membersState.length > 0 && (members?.length === undefined || data?.length > members?.length) ){
			setMembers(membersState);
		}
	}, [membersState])

	return (
		<div style={{ padding: "22px 12px 40px" }}>
			<h3 className="section_title" style={{ paddingBottom: "13px" }}>
				소셜링 리스트
			</h3>
			<ul>
				{
					data?.length > 0
					?
					data.map((v, i) => {
						return (
							<SocialingItem key={`list_${i}`}>
								<Link to={`/view/${v.id}`}>
									<div
										className="img_area"
										style={{ backgroundImage: `url(${v.socialImageUrl})` }}
									></div>
									<div className="info_area">
										<p className="info_title">{v.title}</p>
										<p className="info_date">
										<MdLocationOn size={14}/>
											<span>{v.address.split(' ')[0]} · </span>
											<span>{ v.startDate}</span>
											<span>{ v.startTime}</span>
										</p>
										<ul className="members">
											{
												members?.map((member, idx) => {
													if(member.id === v.id){
														return (
															<>
																<li key="owner">
																	<span style={{ backgroundImage: `url(${member.members.owner.memberProfileUrl})` }}></span>
																</li>
																{
																	member.members.members.length > 0 && member.members.members.map((participant, participant_idx)=>{
																		return (
																			idx < 6 && (
																				<li key={`member_${participant_idx}`}>
																					<span style={{ backgroundImage: `url(${participant.memberProfileUrl})` }}></span>
																				</li>
																			)
																		)
																	})
																}
															</>
														)
													}
												})
											}
										</ul>
									</div>
								</Link>
							</SocialingItem>
						);
					})
					:
					<div className="no_result no_box">
						<p>카테고리에 등록된 소셜링이 없습니다.</p>
					</div>
				}
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
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			font-size: 12px;
			color: #989696;
			line-height: 1;
			padding: 10px 0 6px;
			font-weight: 500;
			& > svg{
				flex-shrink: 0;
				margin-top: -1px;
			}
			& > span{
				flex-shrink: 0;
				& + span{
				margin-left: 3px;
			}
			}
			
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
