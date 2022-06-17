import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Interest.css";

const Interest = () => {
  const nagivate = useNavigate();

  const toLogin = () => {
    nagivate("/login");
  };
  return (
    <div className="inter_main">
      <div className="inter_mid">
        <h2>관심사를 선택해 주세요</h2>
        <h4>내 관심사에 딱 맞는 맞춤형 모임을 추천해 드려요.</h4>
      </div>
      <div className="inter_mid_ex">
        <button>문화·예술</button>
        <button>운동·액티비티</button>
        <button>푸드·드링크</button>
        <button>여행·레져</button>
        <button>비즈니스·사교</button>
        <button>추천받는다</button>
      </div>
      <div className="regi_btn">
        <button onClick={toLogin}>다음</button>
      </div>
    </div>
  );
};

export default Interest;
