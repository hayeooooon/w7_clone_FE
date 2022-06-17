import "./App.css";
import React, {useState} from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/CreateSocialing";
import RegiProfile from "./components/RegiProfile";
import Interest from "./components/Interest";
import RegisterStep1 from "./components/RegisterStep1";
import RegisterStep2 from "./components/RegisterStep2";
import RegisterStep3 from "./components/RegisterStep3";
import RegisterStep4 from "./components/RegisterStep4";

function App() {
	const location = useLocation();
  const [step, setStep] = useState();

  return (
    <div
			className="App"
			style={{
				width: "100%",
				maxWidth: "500px",
				minHeight: "100vh",
				margin: "0 auto",
				border: "1px solid #ddd",
				overflowX: "hidden",
			}}
		>
      {/* 최대 가로 사이즈 500 고정, 가운데 정렬하는 style */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/regiProfile" element={<RegiProfile />} />
        <Route path="/interest" element={<Interest />} />
				<Route path="register" element={<Register/>}>
          <Route path="step_1" element={<RegisterStep1/>}></Route>
          <Route path="step_2" element={<RegisterStep2/>}></Route>
          <Route path="step_3" element={<RegisterStep3/>}></Route>
          <Route path="step_4" element={<RegisterStep4/>}></Route>
				</Route>
      </Routes>
    </div>
  );
}

export default App;
