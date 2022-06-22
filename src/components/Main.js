import "../css/common.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';

import {apis} from '../api/index';
import {loadCategoryAxios, loadSocialingsAxios} from '../redux/moduels/socialing';

import MainCategory from "./MainCategory";
import MainSlider from "./MainSlider";
import SocialingList from "./SocialingList";

const Main = ({socialing_id}) => {
	const dispatch = useDispatch();
	const [category, setCategory] = useState(0);
	const categoryStates = useSelector((state)=>state.socialing.category);
	const socialings = useSelector((state)=>state.socialing.list);
	const [tab, setTab] = useState(1);

	console.log(tab, socialings)
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
	},[])

	useEffect(()=>{
		dispatch(loadSocialingsAxios(tab));
	},[tab]);


	return (
		<>
			<div className="container" style={{minHeight: '100vh',backgroundColor: '#F4F4F4'}}>
				<MainCategory categories={categoryStates} setTab={setTab} ></MainCategory>
				<MainSlider></MainSlider>
        <SocialingList stlyle={{backgroundColor: '#F4F4F4'}} socialings={socialings}></SocialingList>
			</div>
		</>
	);
};


export default Main;
