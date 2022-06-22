import React, { useEffect, useState } from "react";
import "../css/Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadDetailAxios, loadMembersAxios } from "../redux/moduels/socialing";
import { loadUserInfoAxios } from "../redux/moduels/user";

import { IoMdPeople } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { AiFillDollarCircle, AiFillInfoCircle } from "react-icons/ai";
import { MdAccessTimeFilled, MdAccountBox } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { set } from "date-fns";

const Detail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams().id;
	const dataState = useSelector((state) => state.socialing.view);
	const membersState = useSelector((state) => state.socialing.members)
	const userState = useSelector((state)=> state.user.user)[0];
	const [data, setData] = useState();
	const [members, setMembers] = useState();
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const [fee, setFee] = useState();

	const setDateFormat = () => {
		const origin = data.startDate;
		const _month = origin.split("-")[1];
		const new_month = _month < 10 ? _month.split("0")[1] : _month;
		const new_day = origin.split("-")[2];
		const day = new Date(origin).getDay();
		const day_kr = ["일", "월", "화", "수", "목", "금", "토", "일"];
		setDate(`${new_month}.${new_day} (${day_kr[day]})`);
	};
	const setTimeFormat = () => {
		const origin = data.startTime;
		const _hour = origin.split(":")[0] / 1;
		const new_hour =
			_hour > 12 ? "오후 " + (_hour - 12) + "시" : "오전 " + _hour + "시";
		const new_min = origin.split(":")[1] + "분";
		setTime(new_hour + new_min);
	};
	const setFeeFormat = () => {
		const origin = data.entryFee.toString();
		const letters = origin.split('');
		letters.splice(-3,0,',');
		setFee(letters.join(''));
	}
	useEffect(() => {
		dispatch(loadDetailAxios(id));
		const token = sessionStorage.getItem('token');
		if(token) dispatch(loadUserInfoAxios());

	}, []);
	useEffect(() => {
		setData(dataState);
	}, [dataState]);
	useEffect(() => {
		if (data?.id) {
			dispatch(loadMembersAxios(id));
			setDateFormat();
			setTimeFormat();
			if(data.entryFee > 0) setFeeFormat();
		}
	}, [data]);
	useEffect(() => {
		setMembers(membersState);
		console.log(membersState, '444@@@@@@@@@@@@@@')
	}, [membersState]);

	console.log(data, members, userState);

	return (
		<div className="detail_main">
			<div className="Detail_img_box">
				<span
					style={{
						backgroundImage: `url(${data?.socialImageUrl})`,
					}}
				></span>
				<ul className="labels_group">
					{data?.limitHeadcount > members?.members?.length + 1 && (
						<li className="info_label">
							잔여 {data?.limitHeadcount - (members?.members?.length + 1)}명
						</li>
					)}
					{/* <li className="info_label subject">서핑</li> */}
				</ul>
			</div>
			<div className="detail_head">
				<div className="detail_head_inner">
					<div className="detail_profile_box">
						<div
							className="detail_profile"
							style={{
								backgroundImage: `url(${members?.owner?.memberProfileUrl})`,
							}}
						></div>
					</div>
					<div className="text_box">
						<p>{members?.owner?.name}</p>
						<h4>{data?.title}</h4>
					</div>
				</div>
			</div>
			<div className="detail_body">
				<div className="Detail_line">
					{data?.recruitmentType === "early bird" ? (
						<>
							<MdAccountBox size={15} />
							<p>선착순</p>
						</>
					) : (
						<>
							<MdAccessTimeFilled size={14} />
							<p>승인제</p>
						</>
					)}

					<BsCalendar3 size={12} />
					<p className="date_time">
						{data?.meetingType === "offline" && (
							<span>
								{data?.address?.split(" ")[0]} {data?.address?.split(" ")[1]}·
							</span>
						)}
						<span>
							{date} {time}
						</span>
					</p>
				</div>
				<div className="Detail_desc">
					<p>{data?.content}</p>
				</div>
				<div className="Detail_member">
					<span className="box_ttl">맴버소개</span>
					<p className="box_sub">우리 반갑게 만나요</p>
					<div className="member_list">
						<div className="Detail_member_profile">
							<span
								className="profile"
								style={{
									backgroundImage: `url(${members?.owner?.memberProfileUrl})`,
								}}
							></span>
						</div>
						<div className="Detail_member_profile_Desc">
							<span>{members?.owner?.name}</span>
							{members?.owner?.greeting && <p>{members?.owner?.greeting}</p>}
						</div>
					</div>
					{members?.members?.length > 0 && (
						members.members.map((member,index)=>{
							return (
								<div className="member_list" key={index}>
									<div className="Detail_member_profile">
										<span
											className="profile"
											style={{
												backgroundImage: `url(${member.memberProfileUrl})`,
											}}
										></span>
									</div>
									<div className="Detail_member_profile_Desc">
										<span>{member.name}</span>
										{member?.greeting && <p>{member.greeting}</p>}
									</div>
								</div>
							)
						})
					)}
				</div>
				<div className="Detail_info">
					<div className="Detail_info_title">
						<span className="box_ttl">안내사항</span>
						<p className="box_sub">자세한 정보를 알려드릴게요</p>
					</div>
					<div className="Detail_info_desc">
						<div className="info_desc">
							<IoMdPeople size={19} />
							<p>{data?.limitHeadcount}명</p>
						</div>
						{
							(data?.entryFee > 0) && (
								<>
									<div className="info_desc">
										<AiFillDollarCircle size={19} />
										<p>{fee}원</p>
									</div>
									<div className="info_desc">
										<AiFillInfoCircle size={19} />
										<p>{data?.entryFeeInfo}</p>
									</div>
								</>
							) 
						}
						<div className="info_desc">
							<MdAccessTimeFilled size={19} />
							<p>{data?.recruitmentType === 'early bird' ? '선착순' : '승인제'} 소셜링</p>
						</div>
						<div className="info_desc">
							<BsCalendar3 size={19} />
							<p>{date} {time}</p>
						</div>
						{
							data?.meetingType === 'offline' && (
								<div className="info_desc">
									<ImLocation size={19} />
									<p>{data?.address}</p>
								</div>
							)
						}
					</div>
				</div>
				{
					data?.meetingType === 'offline' && (
						<div className="detail_map">
							<div className="detail_map_inner">
								<img src="https://velog.velcdn.com/images/guswnschl45/post/63ffa478-1d13-45d0-89e1-7a644fc28316/image.jpg" />
								<div className="detail_map_desc">
									<p>{data?.address?.split(" ")[0]} {data?.address?.split(" ")[1]}</p>
									<span>{data?.address}</span>
								</div>
							</div>
						</div>
					)
				}
			</div>
			<div
				style={{
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "0 12px 40px",
					background:
						"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
					zIndex: 2,
				}}
			>
				<div className="Detail_join_create" style={{gap: '10px'}}>
					{
						data?.participate === false
						?
						(<Button type="button" onClick={()=>{navigate(`/join/${id}`)}}>참여하기</Button>)
						:
						members?.owner?.memberId === userState?.id
						?
						(
							<>
								{
									members?.members?.length > 0 && (
										<button type="button" className="btn_like" onClick={()=>navigate(`/manage/${id}`)}>
											<IoSettingsSharp className="mr-4" size={40} color="#e1483c" />
										</button>
									)
								}
								<Button className="type_2" type="button" onClick={()=>{navigate(`/edit/${id}/step_1`)}}>수정하기</Button>
							</>
						)
						:
						(
							<Button className="type_2" type="button" onClick={()=>{navigate(`/join/${id}`)}}>참여 취소하기</Button>
						)
					}
					
				</div>
			</div>
		</div>
	);
};

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
	&.type_2{
		background-color: #F8D7D6;
		color: #E1483C;
	}
	&:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
`;
export default Detail;
