import React from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
const CreateSocialing = () => {
  const nagivate = useNavigate();

  const onClickNext = () => {
    nagivate("/regiprofile");
  };
  return (
    <div className="regi_main">
      <h1>MUNTO</h1>
      <div className="regi_mid">
        <h5>이메일</h5>
        <input type="text" placeholder="이메일을 입력해 주세요." />
        <h5>닉네임</h5>
        <input type="text" placeholder="닉네입을 입력해 주세요." />
        <h5>비밀번호</h5>
        <input type="text" placeholder="비밀번호를 입력해 주세요." />
        <h5>비밀번호 확인</h5>
        <input type="text" placeholder="비밀번호 확인." />
      </div>
      <div className="regi_btn">
        <button onClick={onClickNext}>다음</button>
      </div>
    </div>
  );
};

export default CreateSocialing;
