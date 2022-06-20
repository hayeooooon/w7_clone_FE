import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import ic_image from '../images/ic_image.png'

const CreateStep4 = ({setStep, setData}) => {
  const navigate = useNavigate()
	useEffect(()=>{
		setStep(4);
	},[]);
	const [time, setTime] = useState('');

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				언제 만날까요?
			</h3>
			<div className="input_area">
        <label>
        <input type="date" onChange={(e)=>{console.log(e.target.value, typeof(e.target.value))}}/>
        <p className="label"></p>
        <div>
          <div>
            
          </div>
        </div>
        </label>
			</div>
			<div className="input_area">
			<p>Selected Time: {time || '-'}</p>
      <TimePicker
        placeholder="Select Time"
        use12Hours
        showSecond={false}
        focusOnOpen={true}
        format="hh:mm A"
        onChange={e => setTime(e.format('LT'))}
      />

			
        <label>
        <input type="time" onChange={(e)=>{console.log(e.target.value, typeof(e.target.value))}}/>
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
				<Button type="button" disabled="" onClick={()=>{
					navigate('/create/step_5');
					setStep(5);
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
export default CreateStep4;
