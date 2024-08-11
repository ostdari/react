import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для сообщений об ошибках
  const [showPassword, setShowPassword] = useState(false); // Состояние для показа пароля

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

  const primaryButtonStyle = {
    backgroundColor: '#3b4d99', // Основной цвет
    borderColor: '#3b4d99',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    padding: '12px 24px', // Увеличенное padding
    fontSize: '18px', // Увеличенный размер шрифта
    borderRadius: '8px', // Закругленные углы
    minWidth: '150px', // Минимальная ширина кнопки
  };

  const primaryButtonHoverStyle = {
    backgroundColor: '#2d3a6f', // Темнее при наведении
  };

  const primaryButtonActiveStyle = {
    backgroundColor: '#1a2a50', // Еще темнее при нажатии
  };

  const secondaryButtonStyle = {
    backgroundColor: '#5a6fca', // Основной цвет
    borderColor: '#5a6fca',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    padding: '12px 24px', // Увеличенное padding
    fontSize: '18px', // Увеличенный размер шрифта
    borderRadius: '8px', // Закругленные углы
    minWidth: '150px', // Минимальная ширина кнопки
  };

  const secondaryButtonHoverStyle = {
    backgroundColor: '#4a5a9a', // Темнее при наведении
  };

  const secondaryButtonActiveStyle = {
    backgroundColor: '#2a3f77', // Еще темнее при нажатии
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={containerStyle}>
      <div className="card shadow" style={cardStyle}> {/* Устанавливаем стиль карточки */}
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Вход</h2>
          {errorMessage && (
            <div className="alert alert-danger mb-3" role="alert" style={errorStyle}>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
              <label htmlFor="password">Пароль</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                id="showPassword"
                className="form-check-input"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="form-check-label">Показать пароль</label>
            </div>
            <div className="mb-3">
              <a href="#!" style={linkStyle}>Восстановить пароль</a>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary me-2"
                style={primaryButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryButtonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryButtonStyle.backgroundColor}
                onMouseDown={(e) => e.currentTarget.style.backgroundColor = primaryButtonActiveStyle.backgroundColor}
                onMouseUp={(e) => e.currentTarget.style.backgroundColor = primaryButtonHoverStyle.backgroundColor}
              >
                Войти
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                style={secondaryButtonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = secondaryButtonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = secondaryButtonStyle.backgroundColor}
                onMouseDown={(e) => e.currentTarget.style.backgroundColor = secondaryButtonActiveStyle.backgroundColor}
                onMouseUp={(e) => e.currentTarget.style.backgroundColor = secondaryButtonHoverStyle.backgroundColor}
              >
                Регистрация
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)', // Градиентный фон на всю ширину
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardStyle = {
  width: '100%',
  maxWidth: '500px', // Ограничиваем максимальную ширину карточки
  padding: '20px',
  borderRadius: '8px', // Округляем углы карточки
  position: 'relative', // Для внутреннего позиционирования
  backgroundColor: '#ffffff', // Фоновый цвет карточки
};

const errorStyle = {
  marginBottom: '1rem', // Отступ снизу
  position: 'relative', // Для размещения внутри карточки
  width: '100%', // Ширина сообщения об ошибке
};

const linkStyle = {
  color: '#000', // Черный цвет ссылки
  textDecoration: 'underline', // Подчеркивание ссылки
  fontSize: '14px'
};

export default LoginPage;
