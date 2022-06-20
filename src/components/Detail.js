import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Detail.css";
import { IoMdPeople } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";
import { AiFillDollarCircle, AiFillInfoCircle } from "react-icons/ai";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { ImLocation } from "react-icons/im";

const Detail = () => {
  const nagivate = useNavigate();

  const toLogin = () => {
    nagivate("");
  };
  return (
    <div className="Detail_main">
      <div className="Detail_img_box">
        <img
          src="https://file.intereuro.co.kr/Puzzle/ProductTicketImg/ProductTicketImg_2017525174858_364_80_0.jpeg"
          alt="detail_imge"
        />
        <p id="input_box1"></p>
        <p id="input_box2"></p>
        <p id="input_box3"></p>
        <div className="Detail_profile">
          <img
            className="profile"
            src="https://velog.velcdn.com/images/guswnschl45/post/93c2071e-9bd6-4d4e-bc7a-823338afde5a/image.jpg"
          />
        </div>
      </div>
      <div className="Detail_line">
        <MdAccessTimeFilled size={21} />
        <p>선착순</p>
        <BsCalendar3 size={21} />
        <p>용산구·6.26(일) 오전 10시 20분</p>
      </div>
      <div className="Detail_desc">
        <p>👌오케이 맞아? 이거 클론 하는거 맞아? (feat.예비 퇴소자)</p>
        <p>
          여기는 한번 따라 써봄 있어보이려고. 줄곧 여성분들위한 요가 소셜링을
          진행하다 많은 남성분들의 문의로 맨즈요가를 진행하게 되었습니다.
          굳이?😶
        </p>

        <p>
          여행 혼자 오기에 쑥스러운 마음이 이런거였을까요?(..?) 제가 얼마전에
          여행을 시작하면서 식당을 입성하는 순간..
        </p>
      </div>
      <div className="Detail_member">
        <span>맴버소개</span>
        <p>우리 반갑게 만나요</p>
        <div className="Detail_member2">
          <div className="Detail_member_profile">
            <img
              className="profile"
              src="https://velog.velcdn.com/images/guswnschl45/post/3dc10681-d0c5-476e-9cde-96bc4e5a415d/image.jpg"
            />
          </div>
          <div className="Detail_member_profile_Desc">
            <span>강초롱</span>
            <p>생각해보니 여기에서 사람 3명 어떻게 띄우냐..? </p>
          </div>
        </div>
        <div className="Detail_member2">
          <div className="Detail_member_profile">
            <img
              className="profile"
              src="https://velog.velcdn.com/images/guswnschl45/post/2332734c-3c95-4a06-84ce-63a0f6912287/image.jpg"
            />
          </div>
          <div className="Detail_member_profile_Desc">
            <span>서민정</span>
            <p>이거 Map()돌려야 하는거여? 관자놀이 체크점.</p>
          </div>
        </div>
        <div className="Detail_member2">
          <div className="Detail_member_profile">
            <img
              className="profile"
              src="https://velog.velcdn.com/images/guswnschl45/post/93c2071e-9bd6-4d4e-bc7a-823338afde5a/image.jpg"
            />
          </div>
          <div className="Detail_member_profile_Desc">
            <span>권중경</span>
            <p>머리 슬슬 아파온다 정신차리자 현준아.</p>
          </div>
        </div>
      </div>
      <div className="Detail_info">
        <div className="Detail_info_title">
          <span>안내사항</span>
          <p>자세한 정보를 알려드릴게요</p>
        </div>
        <div className="Detail_info_desc">
          <div className="info_desc">
            <IoMdPeople size={21} />
            <p>7명</p>
          </div>
          <div className="info_desc">
            <AiFillDollarCircle size={21} />
            <p>29,876원</p>
          </div>
          <div className="info_desc">
            <AiFillInfoCircle size={21} />
            <p>문토 수수료, 쾌적한 요가 스튜디오, 1:1 핸즈온, 인생샷</p>
          </div>
          <div className="info_desc">
            <MdAccessTimeFilled size={21} />
            <p>선착순 소셜링</p>
          </div>
          <div className="info_desc">
            <BsCalendar3 size={21} />
            <p>6.26(일) 10시 20분</p>
          </div>
          <div className="info_desc">
            <ImLocation size={21} />
            <p>이태원역 6호선 (서울 용산구 이태원동 119-23)</p>
          </div>
        </div>
      </div>
      <div className="Detail_map">
        <img src="https://velog.velcdn.com/images/guswnschl45/post/63ffa478-1d13-45d0-89e1-7a644fc28316/image.jpg" />
        <div className="Detail_map_desc">
          <p>야탑역 1번 출구</p>
          <span>성남시 분당구 야탑동 119-99</span>
        </div>
      </div>
      <div className="Detail_join">
        <div className="Detail_join_create">
          <span>
            <IoHeartCircleSharp classname="mr-4" size={65} color="#fc4700" />
          </span>
          <button>참여하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
