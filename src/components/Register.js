import React from 'react';
import { Outlet } from "react-router-dom";


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
  )
}

export default Register;