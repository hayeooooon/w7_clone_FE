import "../css/common.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {apis} from '../api/index';
import {loadCategoryAxios, loadSocialingsAxios, clearSocialings, clearSocialingList} from '../redux/moduels/socialing';

import MainCategory from "./MainCategory";
import MainSlider from "./MainSlider";
import SocialingList from "./SocialingList";
import { useNavigate } from "react-router-dom";

const Main = ({socialing_id}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [category, setCategory] = useState(0);
	const categoryStates = useSelector((state)=>state.socialing.category);
	const socialings = useSelector((state)=>state.socialing.list);
	const [tab, setTab] = useState(1);

	useEffect(()=>{
		// socialing 리스트 로드
		const loadSocialings = async() => {
			try{
				let category_load = await apis.getCategory();
				if(category_load.data){
					dispatch(loadSocialingsAxios(tab));
				}
			}catch(err){
				console.log(err, 'catch')
			}finally{
			}
		}
		loadSocialings();
		// 카테고리 리스트 로드
		dispatch(loadCategoryAxios());
		return () => {
			dispatch(clearSocialings());
		}
	},[])
	useEffect(()=>{
		dispatch(loadSocialingsAxios(tab));
		return () => {
		dispatch(clearSocialingList());
		}
	},[tab]);
	


	return (
		<>
			<div className="container" style={{minHeight: '100vh',backgroundColor: '#F4F4F4'}}>
				<MainCategory categories={categoryStates} setTab={setTab} ></MainCategory>
				<MainSlider></MainSlider>
        <SocialingList stlyle={{backgroundColor: '#F4F4F4'}} socialings={socialings} tab={tab}></SocialingList>
			</div>
			<CreateButton type="button" onClick={()=>navigate('/create/step_1')}>등록하기</CreateButton>
		</>
	);
};
const CreateButton = styled.button`
	position: fixed;
	right: 20px;
	bottom: 20px;
	margin: 0 auto;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 3px solid #989696;
	box-sizing: border-box;
	font-size: 0;
	background-color: #fff;
	box-shadow: 4px 4px 8px rgba(0,0,0,.1);
	&::before,
	&::after{
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		width: 20px;
		height: 3px;
		margin: -1px auto 0;
		content: '';
		background: #989696;
	}
	&::after{
		transform: rotate(90deg);
	}
`

export default Main;
