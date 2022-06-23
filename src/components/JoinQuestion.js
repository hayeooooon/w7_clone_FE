import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadDetailAxios, loadMembersAxios, updateAnswerAxios } from "../redux/moduels/socialing";

const JoinQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;
  const dataState = useSelector((state) => state.socialing.view);
  const membersState = useSelector((state) => state.socialing.members);
  const [data, setData] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [answer, setAnswer] = useState();
  useEffect(()=>{
    dispatch(loadDetailAxios(id));
  }, []);
  useEffect(() => {
		setData(dataState);
	}, [dataState]);
  useEffect(() => {
		if (data?.id) {
			dispatch(loadMembersAxios(id));
		}
	}, [data]);

	return (
		<div className="content">
			<div className="set_inner">
				<div style={{ padding: "30px 0" }}>
					<JoinIcon></JoinIcon>
					<h3 className="section_title v2">
						호스트의 질문에<br/>답변을 작성해주세요.
					</h3>
					<p style={{fontSize: '14px', color: '#989696', margin: '13px 0 0'}}>작성한 답변은 호스트에게만 공개됩니다.</p>
				</div>
        <div style={{display: 'flex', alignItems: 'flex-start', width: '100%', gap: '10px'}}>
          <div style={{width: '60px', textAlign: 'center'}}>
            <span className="profile" style={{backgroundImage: `url(${membersState?.owner?.memberProfileUrl})`}}></span>
            <p style={{fontSize: '13px', color: '#333', margin: '5px 0 0'}}>{membersState?.name}</p>
          </div>
          {
            data?.question && (
              <div>
                <p style={{padding: '12px', fontSize: '13px', backgroundColor: '#F4F4F4', borderRadius: '0 6px 6px 6px', lineHeight: '1.4'}}>{data?.question}</p>
              </div>
            )
          }
        </div>
        <AnsewrBox>
          <textarea style={{border: '1px solid #DBDBDB', borderRadius: '6px', display: 'block', width: '100%', minHeight: '100px', resize: 'none', fontSize: '14px'}} placeholder="5글자 이상 답변을 작성해주세요."
            onInput={(e)=>{
              setAnswer(e.target.value);
              setBtnDisabled(e.target.value.trim().length >= 5  ? false : true);
            }}
          ></textarea>
        </AnsewrBox>
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
          disabled={btnDisabled}
					onClick={()=>dispatch(updateAnswerAxios(id, answer))}
				>
					참여 신청하기
				</Button>
			</div>
			</div>
		</div>
	);
};
const AnsewrBox = styled.div`
  margin-top: 20px;
  textarea{
    font-family: "Noto Sans KR", sans-serif;
    color: #222;
    letter-spacing: -0.03em;
    &::placeholder{
      font-size: 14px;
      color: #989696;
      letter-spacing: -0.03em;
    }
  }
`
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
export default JoinQuestion;
