import React, {useState, useRef, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadMembersAxios } from "../redux/moduels/socialing";

const Manage = () => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
  const id = useParams().id;
  const membersState = useSelector((state) => state.socialing.members)[0]
  ?.members;
  const [btnDisabled, setBtnDisabled] = useState(true);
  console.log(membersState)

  useEffect(()=>{
    dispatch(loadMembersAxios(id));
  }, [])
	return (
		<div className="content">
			{/* <div className="set_inner">
				<div style={{ padding: "30px 0" }}>
					<JoinIcon></JoinIcon>
					<h3 className="section_title v2">
						소셜링 참여가<br/>완료되었습니다.
					</h3>
					<p style={{fontSize: '14px', color: '#989696', margin: '13px 0 0'}}>취향이 통하는 사람들과 설레는 일상을 함께해요.</p>
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
					onClick={()=>navigate('/')}
				>
					소셜링 리스트로 가기
				</Button>
			</div>
			</div> */}
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
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
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
	&:before{
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		width: 6px;
		height: 13px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		transform: rotate(225deg);
		content: '';
		margin: -8px auto 0;
	}
`;
export default Manage;
