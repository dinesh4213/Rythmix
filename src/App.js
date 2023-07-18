import './App.css';
import "./output.css";
import { useState } from 'react';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import MyMusic from './routes/MyMusic';
import SearchPage from './routes/SearchPage';
import LoggedInHomeComponent from './routes/LoggedInHome';
import { BrowserRouter as Router, Routes, Route, Navigate, useAsyncError } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import UploadSong from './routes/UploadSong';
import { useCookies } from "react-cookie";
import songContext from './contexts/songContext';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="w-screen h-screen">
      <LoadingBar color='#f11946' progress={100} />
      <Router>
        {cookie.token ? (
          <songContext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused }}>
            <Routes>
              <Route path="/" element={<div>Hello</div>} />
              <Route path='/home' element={<LoggedInHomeComponent />} />
              <Route path='/uploadSong' element={<UploadSong />} />
              <Route path='/mysong' element={<UploadSong />} />
              <Route path='/myMusic' element={<MyMusic />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='*' element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path='/login' element={<LoginComponent />} />;
            <Route path='/signup' element={<SignupComponent />} />;
            <Route path='/home' element={<HomeComponent />} />;
            <Route path='*' element={<Navigate to="/login" />} />;
          </Routes>
        )
        }
      </Router>
    </div>
  );
}

export default App;
