import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {loadCategoryAxios} from '../redux/moduels/socialing';

const CreateStep1 = ({setStep, setData, page}) => {
	const dispatch = useDispatch();
  const navigate = useNavigate()
	const param = useParams().id;
  const nextButton = useRef();
	const [checkedCategory, setCheckedCategory] = useState(null);
	const categoryStates = useSelector((state)=>state.socialing.category);
	const [category, setCategory] = useState();

	useEffect(()=>{
		if(categoryStates.length > 0){
			setCategory(categoryStates);
		}
	},[categoryStates])

	const colors = [
		"#2e5986",
		"#6FC4E3",
		"#ED7740",
		"#BCBF56",
		"#42886C",
		"#DDA65B",
		"#A3A7AA",
	];
	useEffect(()=>{
		setStep(1);
		dispatch(loadCategoryAxios());
		sessionStorage.removeItem('title');
		sessionStorage.removeItem('content');
		sessionStorage.removeItem('imageFile');
		sessionStorage.removeItem('startDate');
		sessionStorage.removeItem('startTime');
		sessionStorage.removeItem('meetingType');
		sessionStorage.removeItem('address');
		sessionStorage.removeItem('recruitmentType');
		sessionStorage.removeItem('question');
		sessionStorage.removeItem('limitHeadcount');
		sessionStorage.removeItem('entryFee');
		sessionStorage.removeItem('entryFeeInfo');
		sessionStorage.removeItem('category');
	},[]);
  
	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				어떤 소셜링을 열어볼까요?
			</h3>
			<CagegoryGroup>
				{category?.map((v, i) => {
					return (
						<li key={i}>
							<label
								style={{
									border:
										checkedCategory === v.id
											? "1px solid #E1483C"
											: "1px solid #d9d9d9",
								}}
							>
								<input
									type="radio"
									name="category"
									onChange={() => setCheckedCategory(v.id)}
								/>
								<span
									className="icon_box"
									style={{ backgroundColor: colors[i] }}
								></span>
								<div className="text_box">
									<p>
										{v.name} 
										{/* <label>인기</label> */}
									</p>
									<span>{v.sub}</span>
								</div>
							</label>
						</li>
					);
				})}
			</CagegoryGroup>
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
				<Button type="button" disabled={checkedCategory !== null ? false : true} ref={nextButton} onClick={()=>{
					sessionStorage.setItem('category', checkedCategory);
					navigate(page !== 'edit' ? '/create/step_2' : `/edit/${param}/step_2`);
					setStep(2);
				}}>다음</Button>
			</div>
		</>
	);
};

const CagegoryGroup = styled.ul`
	li {
		& + li {
			margin-top: 10px;
		}
		& > label {
			position: relative;
			display: block;
			display: flex;
			padding: 10px;
			border: 1px solid #d9d9d9;
			align-items: center;
			border-radius: 8px;
		}
		input:checked {
		}
		.icon_box {
			flex-shrink: 0;
			width: 34px;
			height: 34px;
			border-radius: 50%;
			margin-right: 10px;
		}
		.text_box {
			p {
				font-size: 15px;
				line-height: 1.2;
				label {
					display: inline-block;
					vertical-align: middle;
					padding: 0 6px;
					font-size: 10px;
					color: #fff;
					font-weight: 500;
					background-color: #e1483c;
					line-height: 16px;
					border-radius: 8px;
					margin-top: -5px;
					margin-left: 2px;
				}
			}
			span {
				display: block;
				font-size: 13px;
				color: #989696;
				margin-top: 4px;
			}
		}
	}
`;
const Button = styled.button`
  display: block;
  width: 100%;
	height: 46px;
	line-height: 46px;
  border-radius: 20px;
  background-color: #E1483C;
  color: #fff;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  :disabled{
    background-color: #d9d9d9;
    color: #989696;
  }
`
export default CreateStep1;
