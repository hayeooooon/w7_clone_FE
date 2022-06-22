import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TimePicker from "rc-time-picker";
import DatePicker from "react-datepicker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { useDispatch } from "react-redux";

const CreateStep3 = ({ setStep, setData, page, members }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams().id;
	useEffect(() => {
		setStep(3);
	}, []);
	const [time, setTime] = useState("06:00 PM");
	var _date = new Date();
	var next_week = new Date(_date.getTime() + 7 * 24 * 60 * 60 * 1000);
	const hours = "18";
	const minutes = "00";
	var date = moment(next_week).set("hour", hours).set("minute", minutes);
	const [startDate, setStartDate] = useState(next_week);
	const [headerDate, setHeaderDate] = useState(
		`${startDate.getFullYear()}년 ${startDate.getMonth()}월`
	);
	const days = ["일", "월", "화", "수", "목", "금", "토"];
	const [day, setDay] = useState(days[startDate.getDay()]);
	const [isOpen, setIsOpen] = useState(false);
	const handleChange = (e) => {
		setIsOpen(!isOpen);
		setStartDate(e);
	};
	const handleClick = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};
	useEffect(() => {
		setDay(days[startDate.getDay()]);
		setHeaderDate(`${startDate.getFullYear()}년 ${startDate.getMonth()}월`);
	}, [startDate]);
	// 달력 헤더에 요일 한국어로 바꾸기
	const setNameOfDay = (days) => {
		const kr_day = (days === 'Monday') ? '월' : (days === 'Tuesday') ? '화' : (days === 'Wednesday') ? '수' : (days === 'Thursday') ? '목' : (days === 'Friday') ? '금' : (days === 'Saturday') ? '토' : '일';
		return kr_day;
	}
	// 시간 데이터 api 전송 형식에 맞게 바꾸기
	const [timeData, setTimeData] = useState();
	useEffect(()=>{ 
			const _split = time.split(' ')[0];
			const _hour = _split.split(':')[0]/1;
			const _min = _split.split(':')[1];
		if(time.split(' ')[1] === 'PM'){
			const new_hour = _hour + 12;
			const new_time = `${new_hour}:${_min}`
			setTimeData(new_time);
		}else{
			const new_hour = _hour < 10 ? '0'+_hour : _hour;
			const new_time = `${new_hour}:${_min}`
			setTimeData(new_time);
		}
	}, [time])
	// 날짜 데이터 api 전송 형식에 맞게 바꾸기
	const [dateData, setDateData] = useState();
	useEffect(()=>{
		const _year = startDate.getFullYear();
		const _month = (startDate.getMonth()+1) < 10 ? '0' + startDate.getMonth() : startDate.getMonth();
		const _day = startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate();
		setDateData(`${_year}-${_month}-${_day}`);
	},[startDate])
		
	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				언제 만날까요?
			</h3>
			<div className="input_area date">
				<button className={`example-custom-input ${isOpen ? 'is_active': ''}`} onClick={handleClick}>
					{format(startDate, `M.dd (${day})`)}
				</button>
				{isOpen && (
					<DatePicker
							style={{display: isOpen ? 'block' : 'none'}}
							renderCustomHeader={({
							decreaseMonth,
							prevMonthButtonDisabled,
							increaseMonth,
							nextMonthButtonDisabled,
						}) => (
							<CalendarHeader>
								<p>{headerDate}</p>
								<div>
									<CalendarButton
										className="prev"
										onClick={decreaseMonth}
										disabled={prevMonthButtonDisabled}
									>
										{"<"}
									</CalendarButton>
									<CalendarButton
										className="next"
										onClick={increaseMonth}
										disabled={nextMonthButtonDisabled}
									>
										{">"}
									</CalendarButton>
								</div>
							</CalendarHeader>
						)}
						selected={startDate}
						onChange={handleChange}
						inline
						minDate={moment().toDate()}
						maxDate={addMonths(new Date(), 6)}
						formatWeekDay={nameOfDay=>setNameOfDay(nameOfDay)}
						disabledKeyboardNavigation
					/>
				)}
			</div>
			<div className="input_area time">
				<TimePicker
					use12Hours
					showSecond={false}
					focusOnOpen={true}
					format="hh:mm A"
					onChange={(e) => {
						setTime(e.format("LT"));
					}}
					minuteStep={10}
					defaultValue={date}
				/>
			</div>
			<div
				style={{
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "0 12px 40px",
					background:
						"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
				}}
			>
				<Button
					type="button"
					disabled=""
					onClick={() => {
						if(page === 'edit'){
							if(members?.members.length > 0){
								sessionStorage.setItem('startDate', dateData);
								sessionStorage.setItem('startTime', timeData);
								sessionStorage.setItem('meetingType', '')
								sessionStorage.setItem('address', '')
								sessionStorage.setItem('recruitmentType', '');
								sessionStorage.setItem('question', '');
								navigate(`/edit/${param}/step_6`);
								setStep(6);
							}else{
								sessionStorage.setItem('startDate', dateData);
								sessionStorage.setItem('startTime', timeData);
								navigate(`/edit/${param}/step_4`);
								setStep(4);
							}
						}else{
							sessionStorage.setItem('startDate', dateData);
							sessionStorage.setItem('startTime', timeData);
							navigate("/create/step_4");
							setStep(4);
						}
					}}
				>
					다음
				</Button>
			</div>
		</>
	);
};

const CalendarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 5vw 14px;
	& > div{
		margin-right: -3vw;
	}
`

const CalendarButton = styled.button`
	position: relative;
	width: 30px;
	height: 30px;
	font-size: 0;
	&:before{
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		top: 50%;
		width: 7px;
		height: 7px;
		border-top: 2px solid #666;
		border-right: 2px solid #666;
		transform: rotate(45deg);
		margin: -5px auto 0;
	}
	&.prev{
		&:before{
			border-left: 2px solid #666;
			border-right: none;
			transform: rotate(-45deg);
		}
	}
	&:disabled{
		&:before{
			border-color: #9E9E9E;
		}
	}
`;
const Button = styled.button`
	display: block;
	width: 100%;
	height: 46px;
	line-height: 46px;
	border-radius: 20px;
	background-color: #e1483c;
	color: #fff;
	font-size: 15px;
	text-align: center;
	font-weight: 500;
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
`;
export default CreateStep3;
