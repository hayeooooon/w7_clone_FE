import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import RegiProfile from "./components/RegiProfile";
import Interest from "./components/Interest";
import Detail from "./components/Detail";
import CreateSocialing from "./components/CreateSocialing";
import CreateStep1 from "./components/CreateStep1";
import CreateStep2 from "./components/CreateStep2";
import CreateStep3 from "./components/CreateStep3";
import CreateStep4 from "./components/CreateStep4";

function App() {
  const location = useLocation();
  const [step, setStep] = useState(1);

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
        <Route path="/detail" element={<Detail />} />
        <Route path="/create" element={<CreateSocialing step={step} />}>
          <Route
            path="step_1"
            element={<CreateStep1 setStep={setStep} />}
          ></Route>
          <Route
            path="step_2"
            element={<CreateStep2 setStep={setStep} />}
          ></Route>
          <Route
            path="step_3"
            element={<CreateStep3 setStep={setStep} />}
          ></Route>
          <Route
            path="step_4"
            element={<CreateStep4 setStep={setStep} />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
