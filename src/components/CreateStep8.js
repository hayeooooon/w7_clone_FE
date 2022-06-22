import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createSocialingAxios } from '../redux/moduels/socialing';

import ic_image from '../images/ic_image.png'

const CreateStep8 = ({setStep, setData}) => {
  const navigate = useNavigate()
	const dispatch = useDispatch();
	const fileInput = useRef();
	const preview = useRef();
	const textarea = useRef();
	const [file, setFile] = useState();
	const [fileData, setFileData] = useState();

	useEffect(()=>{
		setStep(8);
	},[]);

	const createSocialing = () => {
		const formdata = new FormData();
		formdata.append('title', sessionStorage.getItem('title'));
		formdata.append('content', sessionStorage.getItem('content'));
		formdata.append('imageFile', file);
		formdata.append('startDate', sessionStorage.getItem('startDate'));
		formdata.append('startTime', sessionStorage.getItem('startTime'));
		formdata.append('meetingType', sessionStorage.getItem('meetingType'));
		formdata.append('address', sessionStorage.getItem('address'));
		formdata.append('recruitmentType', sessionStorage.getItem('recruitmentType'));
		formdata.append('question', sessionStorage.getItem('question'));
		formdata.append('limitHeadcount', sessionStorage.getItem('limitHeadcount'));
		formdata.append('entryFee', sessionStorage.getItem('entryFee'));
		formdata.append('entryFeeInfo', sessionStorage.getItem('entryFeeInfo'));
		const category = sessionStorage.getItem('category');
		dispatch(createSocialingAxios(category, formdata))
	}
	const uploadImg = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
			const reader = new FileReader();
			reader.onload = function (event) {
				preview.current.setAttribute("style", `background-image: url(${event.target.result})`);
				preview.current.setAttribute("class", "has_image");
				setFileData(event.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};  

	

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				소셜링을 소개해볼까요?
			</h3>
			<div className="input_area">
				<ImageFile>
					<input type="file"
					ref={fileInput}
					onChange={uploadImg}
					/>
					<div ref={preview}>
						<img src={ic_image} alt="image" style={{width: '23px'}}/>
						<p style={{color: '#989696', fontSize: '13px', fontWeight: '500'}}>사진 추가</p>
					</div>
				</ImageFile>
			</div>
			<div className="input_area" style={{marginTop: '10px'}}>
				<textarea ref={textarea} placeholder="내용을 입력해주세요. (선택)" style={{height: '200px', width: '100%'}}></textarea>
				<p className="txt_info" style={{marginTop: '4px'}}>소셜링 상세 내용을 자세히 작성할수록 멤버들의 신청률도 높아져요!</p>
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
				<Button type="button" onClick={()=>{
					if(file !== undefined) sessionStorage.setItem('imageFile', file);
					if(textarea.current?.value !== undefined && textarea.current?.value.trim().length > 0) sessionStorage.setItem('content', textarea.current.value);
					createSocialing();
				}}>다음</Button>
			</div>
		</>
	);
};


const ImageFile = styled.label`
display: block;
width: 100%;
input[type=file] + div{
	height: 82px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #F4F4F4;
	border: 1px solid #DBDBDB;
	border-radius: 6px;
	box-sizing: border-box;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	&.has_image{
		img, p{
			display: none;
		}
	}
}
`
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
export default CreateStep8;
