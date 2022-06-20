import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MainCategory = () => {
	const category = [
		"문화·예술",
		"운동·액티비티",
		"푸드·드링크",
		"취미",
		"여행·나들이",
		"창작",
		"성장·자기계발",
	];
	const [activeTab, setActiveTab] = useState(1);

	return (
		<>
			<Category className="set_inner">
				<ul>
					{category.map((v, i) => {
						return (
							<li
								key={i}
								onClick={() => {
									setActiveTab(i);
								}}
								style={{
									borderBottom:
										activeTab === i
											? "2px solid #373535"
											: "2px solid transparent",
								}}
							>
								<button
									type="button"
									style={{
										color: activeTab === i ? "#222" : "#989696",
										fontWeight: activeTab === i ? "500" : "400",
									}}
								>
									{v}
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
