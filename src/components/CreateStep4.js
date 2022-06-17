import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ic_image from '../images/ic_image.png'

const CreateStep4 = () => {
  const navigate = useNavigate()

  
	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				언제 만날까요?
			</h3>
			<div className="input_area">
        <label>
        <input type="date"/>
        <p className="label"></p>
        <div>
          <div>
            
          </div>
        </div>
        </label>
			</div>
			<div className="input_area">
        <label>
        <input type="time"/>
        </label>
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
				<Button type="button" disabled="" onClick={()=>navigate('/register/step_4')}>다음</Button>
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
  height: 40px;
  line-height: 40px;
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
export default CreateStep4;
