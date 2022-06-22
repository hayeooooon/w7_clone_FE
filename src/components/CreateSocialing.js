import "../css/common.css";
import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";


const Register = () => {
	return (
		<>
			<div
				className="content"
				style={{paddingBottom: '120px', boxSizing: 'border-box'}}
			>
				<div className="set_inner">
        <Outlet />
				</div>
			</div>
		</>
	);
};




export default Register;
