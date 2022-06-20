import "../css/common.css";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";


const Register = ({step, setStep}) => {
	const navigate = useNavigate();
	return (
		<>
			<header style={{position: 'relative'}}>
        <div style={{height: '4px', backgroundColor: '#F4F4F4'}}><span style={{width: `${(step/8)*100}%`, height: '100%', display: 'block', backgroundColor: '#E1483C', transition: 'ease .4s'}}></span></div>
				<ButtonGoBack type="button" onClick={() => {navigate(-1)}}></ButtonGoBack>
			</header>
			<div
				className="container"
				style={{paddingBottom: '120px', boxSizing: 'border-box'}}
			>
				<div className="set_inner">
        <Outlet />
				</div>
			</div>
		</>
	);
};

const ButtonGoBack = styled.div`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  &:before{
    position: absolute;
    left: 16px;
    top: 50%;
    margin: -7px 0 0;
    width: 12px;
  height: 12px;
  border-left: 2px solid #222;
  border-bottom: 2px solid #222;
  transform: rotate(45deg);
  content: '';
  }
`


export default Register;
