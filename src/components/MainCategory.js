import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MainCategory = ({categories, setTab}) => {
	const [activeTab, setActiveTab] = useState(1);
	return (
		<>
			<Category className="set_inner">
				<ul>
					{categories?.map((v, i) => {
						return (
							<li
								key={i}
								onClick={() => {
									setActiveTab(v.id);
								}}
								style={{
									borderBottom:
										activeTab === v.id
											? "2px solid #373535"
											: "2px solid transparent",
								}}
							>
								<button
									type="button"
									style={{
										color: activeTab === v.id ? "#222" : "#989696",
										fontWeight: activeTab === v.id ? "500" : "400",
									}}
									onClick={()=>{
										setTab(v.id);
									}}
								>
									{v.name}
								</button>
							</li>
						);
					})}
				</ul>
			</Category>
		</>
	);
};

const Category = styled.div`
	white-space: nowrap;
	overflow-x: auto;
	background-color: #fff;
	ul {
		display: inline-flex;
		li {
			height: 45px;
			box-sizing: border-box;
			button {
				display: block;
				padding: 0 15px;
				height: 100%;
				font-size: 16px;
				line-height: 45px;
			}
		}
	}
`;
export default MainCategory;
