import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import MyCalendar from './components/MyCalendar';
import TimeFinder from './components/TimeFinder'; // Импорт компонента поиска времени
import MeetingsPage from './components/MeetingsPage'; // Импорт страницы митингов
import Header from './components/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username, password) => {
    if (username === '123' && password === '123') {
      setIsLoggedIn(true);
      setHasFullAccess(false);
      setUsername('User 123');
    } else if (username === '321' && password === '321') {
      setIsLoggedIn(true);
      setHasFullAccess(true);
      setUsername('User 321');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHasFullAccess(false);
    setUsername('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          !isLoggedIn ? 
          <LoginPage onLogin={handleLogin} /> 
          : <Navigate to="/calendar" />} 
        />
        
        {isLoggedIn && (
          <>
            <Route path="/calendar" element={
              <>
                <Header hasFullAccess={hasFullAccess} username={username} onLogout={handleLogout} />
                <MyCalendar />
              </>
            } />
            {hasFullAccess && (
              <>
                <Route path="/find-time" element={
                  <>
                    <Header hasFullAccess={hasFullAccess} username={username} onLogout={handleLogout} />
                    <TimeFinder />
                  </>
                } />
                <Route path="/meetings" element={
                  <>
                    <Header hasFullAccess={hasFullAccess} username={username} onLogout={handleLogout} />
                    <MeetingsPage />
                  </>
                } />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;