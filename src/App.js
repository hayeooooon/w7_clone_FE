import './App.css';
import {Routes, Route} from 'react-router-dom';

import Main from './components/Main';

function App() {
  return (
     <div className="App" style={{width: '100%', maxWidth: '500px', minHeight: '100vh', margin: '0 auto', border: '1px solid #ddd'}}> {/* 최대 가로 사이즈 500 고정, 가운데 정렬하는 style */}
      <Routes>
      <Route path="/" element={<Main/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
