import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { signupDB } from "../redux/moduels/user";

const CreateSocialing = ({ setData }) => {
  const nagivate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  // const onClickNext = () => {
  //   nagivate("/regiprofile");
  // };

  const emailCheck = (email) => {
    let reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return reg.test(email);
  };
  //비밀번호 영문/숫자 포함(8_20자)
  const password2 = (password) => {
    let _reg2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return _reg2.test(password);
  };

  const handleSignUp = () => {
    // e.preventDefault();
    // if (!email || !nickname || !password || !passwordCheck) {
    //   return window.alert("내용을 입력하세요");
    // }
    // if (!emailCheck(email)) {
    //   window.alert("이메일을 형식에 맞게 입력해주세요.");
    //   return;
    // }
    // if (!password2(password)) {
    //   window.alert("비밀번호를 형식에 맞게 입력해주세요");
    // }
    // if (password !== passwordCheck) {
    //   return window.alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    // }
    dispatch(signupDB(email, nickname, password));
  };

  return (
    <div className="regi_main">
      <h1>MUNTO</h1>
      <div className="regi_mid">
        <h5>이메일</h5>
        <input
          type="text"
          placeholder="이메일을 입력해 주세요."
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h5>닉네임</h5>
        <input
          type="text"
          placeholder="닉네입을 입력해 주세요."
          required
          onChange={(e) => {
            setNickname(e.target.value);
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
        <h5>비밀번호 확인</h5>
        <input
          type="text"
          placeholder="비밀번호 확인."
          required
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
        />
      </div>
      <div className="regi_btn">
        <button onClick={handleSignUp}>다음</button>
      </div>
    </div>
  );
};

export default CreateSocialing;
