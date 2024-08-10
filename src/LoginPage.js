import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для сообщений об ошибках

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Очистить старые сообщения об ошибках

    if (username === '' || password === '') {
      setErrorMessage('Пожалуйста, заполните все поля');
      return;
    }

    // Проверка логина и пароля
    if (username === '123' && password === '123') {
      onLogin(username, password);
    } else if (username === '321' && password === '321') {
      onLogin(username, password);
    } else {
      setErrorMessage('Неверный логин или пароль'); // Сообщение об ошибке
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-12 col-lg-10"> {/* Увеличиваем ширину колонки */}
          <div className="card shadow" style={{ width: '100%' }}> {/* Устанавливаем ширину карточки на 100% */}
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Вход</h2>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>} {/* Новое сообщение об ошибке */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Логин</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Войти</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
