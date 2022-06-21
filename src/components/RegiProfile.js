import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegiProfile.css";
import { useDispatch } from "react-redux";

const Regiprofile = ({ setData }) => {
  const nagivate = useNavigate();

  // const onClickNext = () => {
  //   nagivate("/interest");
  // };

  return (
    <div className="regiPro_main">
      <div className="regiPro_mid">
        <h2>프로필 사진을 등록해 주세요</h2>
        <h4>새롭게 만날 친구들이 나를 더 잘 알수 있도록</h4>
        <h4>나를 잘 나타내는 프로필 사진을 등록해 주세오.</h4>
      </div>
      <div className="regiPro_photo">
        <input type="file"></input>
      </div>
      <div className="regiPro_mid_ex">
        <h3>좋은 프로필 사진 예시</h3>
        <img
          src="https://velog.velcdn.com/images/guswnschl45/post/11ee6363-4c65-462e-b12d-65afb518cefa/image.jpg"
          alt="Profile"
        ></img>
        <ul>
          <li>좋아하는 취미를 즐기는 사진</li>
          <li>전시, 공간, 여행지에서 나의 사진</li>
          <li>책, 영화, 음악 등 내가 좋아하는 것을 나타내는 사진</li>
        </ul>
      </div>
      <div className="regi_btn">
        <button onClick={handleUpload}>다음</button>
      </div>
    </div>
  );
};

export default Regiprofile;
