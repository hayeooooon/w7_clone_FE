import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const onClickRegi = () => {
    navigate("/register");
  };
  return (
    <div className="regi_main">
      <h1>MUNTO</h1>
      <div className="regi_mid">
        <h5>이메일</h5>
        <input type="text" placeholder="이메일을 입력해 주세요." />
        <h5>비밀번호</h5>
        <input type="text" placeholder="비밀번호를 입력해 주세요." />
      </div>
      <div className="regi_btn">
        <button>로그인</button>
      </div>
      <div className="regi_bottom">
        <u>계정정보를 잊으셨나요?</u>
        <a onClick={onClickRegi}>회원가입하기</a>
      </div>
    </div>
  );
};

export default Login;
