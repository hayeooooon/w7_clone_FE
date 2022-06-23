import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
	loadPendingMembersAxios,
	approveMemberAxios,
	refuseMemberAxios,
} from "../redux/moduels/socialing";

const Manage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams().id;
	const status = useParams().status;
	const pendingMembersState = useSelector((state) => state.socialing.pending);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [question, setQuestion] = useState();
	const [alertClass, setAlertClass] = useState(false);
	useEffect(() => {
		dispatch(loadPendingMembersAxios(id));
		setQuestion(sessionStorage.getItem("question"));
		sessionStorage.removeItem("question");
		setAlertClass(true);
		if (pendingMembersState?.length === 0) {
			navigate(`/view/${id}`);
		}
	}, []);

	return (
		<div className="content">
			{question && (
				<Section>
					<h4 className="section_title" style={{ margin: "0 0 20px" }}>
						내가 작성한 질문
					</h4>
					<div>
						<p
							style={{
								padding: "10px",
								borderRadius: "6px",
								backgroundColor: "#F4F4F4",
								fontSize: "15px",
								wordBreak: 'break-all',
							}}
						>
							{question}
						</p>
					</div>
				</Section>
			)}
			<Section className="members">
				<h4 className="section_title" style={{ margin: "0 0 20px" }}>
					승인 대기중인 멤버
				</h4>
				<ul>
					{pendingMembersState?.map((v, i) => {
						return (
							<MemberList key={i}>
								<div className="member_list">
									<div className="profile_desc">
										<span
											className="profile"
											style={{
												backgroundImage: `url(${v.memberProfileUrl})`,
											}}
										></span>
									</div>
									<div className="profile_desc">
										<span>{v.name}</span>
										{v?.greeting && <p>{v.greeting}</p>}
									</div>
								</div>
								<div style={{margin: '10px 0 0'}}>
									<p
										style={{
											padding: "10px",
											borderRadius: "6px",
											backgroundColor: "#F4F4F4",
											fontSize: "15px",
											wordBreak: 'break-all',
										}}
									>
										{v?.answer}
									</p>
								</div>
								<ul
									style={{ display: "flex", gap: "10px", margin: "20px 0 0" }}
								>
									<li style={{ flexBasis: "50%" }}>
										<Button
											type="button"
											className="deny"
											onClick={() =>
												dispatch(refuseMemberAxios(id, v.memberId))
											}
										>
											거절
										</Button>
									</li>
									<li style={{ flexBasis: "50%" }}>
										<Button
											type="button"
											onClick={() =>
												dispatch(approveMemberAxios(id, v.memberId))
											}
										>
											수락
										</Button>
									</li>
								</ul>
							</MemberList>
						);
					})}
				</ul>
			</Section>
			{status !== "list" && status === "approved" && (
				<Alert className={alertClass ? "in" : ""}>승인이 완료되었습니다.</Alert>
			)}
			{status !== "list" && status === "refused" && (
				<Alert className={alertClass ? "in" : ""}>거절이 완료되었습니다.</Alert>
			)}
		</div>
	);
};

const fadeIn = keyframes`
0% {
	opacity: 0;
	margin: -20px auto 0;
}
50%{
	opacity: 1;
	margin: 0 auto;
}
90%{
	opacity: 1;
	margin: 0 auto;
	display: inline-block;
}
99%{
	display: none;
}

`;
const Alert = styled.div`
	position: fixed;
	display: inline-block;
	left: 0;
	right: 0;
	top: 50%;
	border-radius: 10px;
	background-color: #000;
	color: #fff;
	font-size: 15px;
	font-weight: 700;
	text-align: center;
	max-width: 90%;
	width: 50%;
	padding: 10px 15px;
	box-sizing: border-box;
	margin: -20px auto 0;
	transform: translateY(-50%);
	transition: ease-out 0.3s;
	opacity: 0;
	animation: ${fadeIn} 1s ease-out;
	pointer-events: none;
	z-index: 3;
`;
const Section = styled.section`
	padding: 20px 12px;
	& + section {
		margin-top: 10px;
	}
`;
const MemberList = styled.li`
	padding: 15px 0 20px;
	& + li {
		margin-top: 0 !important;
		border-top: 1px solid #f4f4f4;
	}
`;
const Button = styled.button`
	display: block;
	width: 100%;
	height: 46px;
	line-height: 46px;
	border-radius: 6px;
	color: #333;
	font-size: 15px;
	text-align: center;
	font-weight: 500;
	border: 1px solid #dbdbdb;
	box-sizing: border-box;
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
	&.deny {
		color: #e1483c;
	}
`;
const JoinIcon = styled.span`
	position: relative;
	display: block;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background-color: #e1483c;
	margin-bottom: 15px;
	&:before {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		width: 6px;
		height: 13px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		transform: rotate(225deg);
		content: "";
		margin: -8px auto 0;
	}
`;
export default Manage;
