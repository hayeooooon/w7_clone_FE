import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {apis} from '../api/index';
import {signUpAxios} from '../redux/moduels/user';

import default_profile from '../images/ic_profile_default.png';
import ic_photo from '../images/ic_photo.png';
import img_profile_1 from '../images/img_profile_1.png'
import img_profile_2 from '../images/img_profile_2.png'
import img_profile_3 from '../images/img_profile_3.png'
import img_profile_4 from '../images/img_profile_4.png'

const RegisterStep3 = ({ setStep }) => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(true);
  const fileInput = useRef();
  const preview = useRef();
  const [file, setFile] = useState();
	const uploadImg = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
			const reader = new FileReader();
			reader.onload = function (event) {
				preview.current.setAttribute("style", `background-image: url(${event.target.result})`);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	useEffect(() => {
		setStep(3);
	}, []);
  useEffect(()=>{
    if(file !== undefined){
      setBtnDisabled(false);
    }
  },[file])

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 0" }}>
				프로필 사진을 등록해 주세요.
				<span
					style={{
						display: "block",
						fontSize: "15px",
						color: "#989696",
						marginTop: "12px",
						lineHeight: "1.6",
					}}
				>
					새롭게 만날 친구들이 나를 더 잘 알수 있도록
					<br />
					나를 잘 나타내는 프로필 사진을 등록해 주세오.
				</span>
			</h3>
			<div>
				<FileAttachment>
					<div className="input_area">
            <label>
              <input type="file"
                ref={fileInput}
                onChange={uploadImg}
              />
              <div className="preview">
                <span ref={preview}></span>
              </div>
            </label>
          </div>
				</FileAttachment>
				<Examples>
          <h4 style={{ fontSize: "16px", fontWeight: "500" }}>
						좋은 프로필 사진 예시
					</h4>
					<ul style={{marginTop: '20px'}}>
						<li>
							<span style={{backgroundImage: `url(${img_profile_1})`}}></span>
						</li>
						<li>
              <span style={{backgroundImage: `url(${img_profile_2})`}}></span>
						</li>
						<li>
              <span style={{backgroundImage: `url(${img_profile_3})`}}></span>
						</li>
            <li>
              <span style={{backgroundImage: `url(${img_profile_4})`}}></span>
						</li>
					</ul>
          <p>
            <span>좋아하는 취미를 즐기는 사진</span>
            <span>전시, 공간, 여행지에서 나의 사진</span>
            <span>책, 영화, 음악 등 내가 좋아하는 것을 나타내는 사진</span>
          </p>
        </Examples>
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
					onClick={ async () => {
            const formdata = new FormData();
            const emailVal = sessionStorage.getItem('email');
            const nameVal = sessionStorage.getItem('name');
            const passwordVal = sessionStorage.getItem('password');
            formdata.append("name", nameVal);
            formdata.append("email", emailVal);
            formdata.append("password", passwordVal);
            formdata.append("profileImageFile", file);
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            dispatch(signUpAxios(formdata))
					}}
				>
					다음
				</Button>
			</div>
		</>
	);
};

const FileAttachment = styled.div`
  text-align: center;
  padding: 70px 0;
  .preview{
    position: relative;
    display: inline-block;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: #F4F4F4;
    background-size: 33px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${default_profile});
    span{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
      overflow: hidden;
      z-index: 1;
    }
    &:before{
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #B8B7B5;
      box-sizing: border-box;
      z-index: 2;
      background-color: #fff;
    }
    &:after{
      content: '';
      position: absolute;
      right: 3px;
      bottom: 7px;
      width: 20px;
      height: 14px;
      background: url(${ic_photo}) center / 20px 14px no-repeat;
      z-index: 2;
    }
  }
`;
const Examples = styled.div`
  ul{
    display: flex;
    gap: 15px;
    li{
      display: block;
      flex-basis: 56px;
      span{
        display: block;
        height: 0;
        padding-bottom: 100%;
        border-radius: 50%;
        background-color: #eee;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
  p{
    font-size: 13px;
    color: #989696;
    margin-top: 22px;
    span{
      display: block;
      &:before{
        display: inline-block;
        width: 2px;
        height: 2px;
        background: #989696;
        content: '';
        vertical-align: middle;
        margin: -2px 5px 0 0;
      }
      & + span{
        margin-top: 2px;
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

export default RegisterStep3;
