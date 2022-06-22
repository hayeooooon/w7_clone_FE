import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { loadDetailAxios, updateAnswerAxios } from "../redux/moduels/socialing";


const JoinSocialing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;
  const dataState = useSelector((state) => state.socialing.view);
  const [data, setData] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const checkboxRef = useRef();
  useEffect(()=>{
    dispatch(loadDetailAxios(id));
  }, [])

	return (

		<div className="content">
			<div className="set_inner">
				<div style={{ padding: "30px 0" }}>
					<JoinIcon></JoinIcon>
					<h3 className="section_title v2">
						모두가 즐거운 소셜링이
						<br />될 수 있도록 함께 지켜주세요.
					</h3>
					<ul className="notice_list" style={{ marginTop: "40px" }}>
						<li>
							<span>1</span>
							<p>
								모임 시작 전 부득이하게 참여가 어려워진 경우, 반드시 호스트에게
								미리 알려주세요.
							</p>
						</li>
						<li>
							<span>2</span>
							<p>
								나와 다른 의견에도 귀 기울이며, 함께하는 멤버들을 존중하는
								태도를 지켜주세요.
							</p>
						</li>
					</ul>
					<Agreement className="input_area" style={{ margin: "30px 0 0" }}>
						<label>
							<input type="checkbox" ref={checkboxRef} onChange={(e)=>{
                setBtnDisabled(!e.target.checked)
              }}/>
							<div>
								<p>
									무단으로 불참하거나, 함께하는 멤버들을 <br />
									존중하지 않고 피해를 주는 경우 <br />
									신고 제도를 통해 문토 이용에 제재를 받게 됩니다.
								</p>
								<span>
									<em></em>소셜링 이용 규칙을 지키겠습니다!
								</span>
							</div>
						</label>
					</Agreement>
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
					disabled={btnDisabled}
          onClick={()=>{
            (dataState?.recruitmentType === 'early bird')
            ?
            dispatch(updateAnswerAxios(id, ''))
            :
            navigate(`/question/${id}`);
          }}
				>
					다음
				</Button>
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
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
`;
const Agreement = styled.div`
	label {
    position: relative;
		& > div {
			display: block;
			border-radius: 6px;
			background-color: #f4f4f4;
      border: 2px solid #f4f4f4;
			padding: 12px 12px 14px;
			font-size: 14px;
			font-weight: 500;
      box-sizing: border-box;
			span {
				display: block;
				font-size: 16px;
				color: #989696;
				font-weight: 700;
				margin-top: 18px;
				em {
					position: relative;
					display: inline-block;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: #dbdbdb;
					vertical-align: middle;
					margin: -2px 8px 0 0;
					&:before {
						position: absolute;
						left: 0;
						right: 0;
						top: 50%;
						margin: -6px auto;
						width: 4px;
						height: 7px;
						border-top: 2px solid #fff;
						border-left: 2px solid #fff;
						content: "";
						transform: rotate(-135deg);
					}
				}
			}
		}
    input:checked {
      & + div {
			background-color: #F8D7D6;
      border-color: #E1483C;
      color: #E1483C;
      span{
        color: #e1483c;
        em {
          background-color: #e1483c;
        }
      }
        
      }
    }
}
`;
const JoinIcon = styled.span`
	position: relative;
	display: block;
	width: 30px;
	height: 25px;
	border-radius: 10px;
	background-color: #e1483c;
	margin-bottom: 15px;
	&:before {
		position: absolute;
		left: 12px;
		bottom: -3px;
		width: 7px;
		height: 7px;
		border-radius: 2px;
		content: "";
		margin: 0 auto;
		transform: rotate(45deg);
		background-color: #e1483c;
	}
	&:after {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		content: "!";
		color: #fff;
		text-align: center;
		font-size: 18px;
		font-weight: 700;
		transform: translateY(-50%);
	}
`;
export default JoinSocialing;
