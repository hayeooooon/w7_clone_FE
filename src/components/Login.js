import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginDB } from "../redux/moduels/user";
import { useDispatch } from "react-redux";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const emailCheck = (email) => {
    let reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return reg.test(email);
  };

  const passwordCheck = (password) => {
    let _reg2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    return _reg2.test(password);
  };

  const handleLogin = () => {
    console.log("되니?");

    if (email === "" || password === "") {
      window.alert("이메일,비밀번호 모두 입력해주세요.");
    }
    if (!emailCheck) {
      window.alert("이메일 형식에 맞게 작성해주세요요");
    }
    if (!passwordCheck(password)) {
      window.alert("비밀번호를 형식에 맞게 입력해주세요");
    }

    dispatch(loginDB(email, password));
  };

  // const onClickRegi = () => {
  //   navigate("/register");
  // };

  return (
    <div className="regi_main">
      <h1>MUNTO</h1>
      <div className="regi_mid">
        <h5>이메일</h5>
        <input
          type="text"
          placeholder="이메일을 입력해 주세요."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h5>비밀번호</h5>
        <input
          type="text"
          placeholder="비밀번호를 입력해 주세요."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="regi_btn">
        <button>로그인</button>
      </div>
      <div className="regi_bottom">
        <u>계정정보를 잊으셨나요?</u>
        <a onClick={handleLogin}>회원가입하기</a>
      </div>
    </div>
  );
};

export default Login;
