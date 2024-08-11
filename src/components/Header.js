import React, { useState } from 'react'; // Добавлен импорт useState
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap
import { Dropdown } from 'react-bootstrap'; // Импортируем компонент Dropdown из Bootstrap
import 'font-awesome/css/font-awesome.min.css'; // Импортируем стили Font Awesome

const Header = ({ hasFullAccess, username, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false); // Добавлено состояние для отслеживания клика на выход
  const [hoveredItem, setHoveredItem] = useState(null); // Состояние для отслеживания наведения на элемент
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutClicked(true); // Устанавливаем состояние при клике на выход
    setTimeout(() => {
      onLogout();
      navigate('/');
    }, 100); // Небольшая задержка для визуального эффекта изменения фона
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Планировщик встреч</h1>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/calendar" style={navLinkStyle}>Календарь</Link>
          </li>
          {hasFullAccess && (
            <>
              <li style={navItemStyle}>
                <Link to="/find-time" style={navLinkStyle}>Организация встреч</Link>
              </li>
              <li style={navItemStyle}>
                <Link to="/meetings" style={navLinkStyle}>Встречи</Link>
              </li>
            </>
          )}
          {username && (
            <li
              style={navItemStyle}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Dropdown align="end" show={showDropdown}>
                <Dropdown.Toggle
                  as="div"
                  id="user-menu"
                  style={dropdownToggleStyle}
                >
                  <div style={avatarStyle}></div>
                  <span style={usernameStyle}>{username}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    ...dropdownMenuStyle,
                    opacity: showDropdown ? 1 : 0,
                    transition: 'opacity 0.3s ease, top 0.3s ease',
                    top: showDropdown ? 'calc(100% + 2px)' : 'calc(100% - 10px)', // Опускаем меню на 2 пикселя
                    visibility: showDropdown ? 'visible' : 'hidden' // Управляем видимостью
                  }}
                >
                  <a
                    href="#/profile"
                    style={{
                      ...dropdownItemStyle,
                      backgroundColor: hoveredItem === 'profile' ? '#e0e0e0' : '#fff'
                    }}
                    onMouseEnter={() => setHoveredItem('profile')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Профиль
                  </a>
                  <a
                    href="#logout"
                    onClick={handleLogout}
                    style={{
                      ...dropdownItemStyle,
                      backgroundColor: logoutClicked ? '#e0e0e0' : (hoveredItem === 'logout' ? '#e0e0e0' : '#fff')
                    }}
                    onMouseEnter={() => setHoveredItem('logout')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    Выход <i className="fa fa-sign-out" style={iconStyle}></i>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  padding: '15px 30px',
  background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
  color: '#fff',
  borderBottom: '2px solid #ddd',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '"Arial", sans-serif' // Шрифт по умолчанию
};

const titleStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
  fontFamily: '"Arial", sans-serif' // Шрифт по умолчанию
};

const navListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0, // Убрали отступы
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  fontFamily: '"Arial", sans-serif' // Шрифт по умолчанию
};

const navItemStyle = {
  margin: 0,
  position: 'relative',
  padding: '5px' // Увеличенный padding для области наведения
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none', // Убрали подчеркивание
  fontSize: '16px',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  fontFamily: '"Arial", sans-serif' // Шрифт по умолчанию
};

const dropdownToggleStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textDecoration: 'none', // Убрали подчеркивание
  fontFamily: '"Arial", sans-serif', // Шрифт по умолчанию
  margin: '5px' // Отступ 5 пикселей для user-menu
};

const avatarStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  marginRight: '10px'
};

const usernameStyle = {
  textDecoration: 'none', // Убрали подчеркивание
  color: '#fff'
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  width: '100px', // Ширина меню
  zIndex: '1000',
  fontFamily: '"Arial", sans-serif', // Шрифт по умолчанию
  opacity: 0, // Начальное состояние для анимации
  visibility: 'hidden', // По умолчанию скрыто
  transition: 'opacity 0.3s ease, top 0.3s ease', // Плавное изменение прозрачности и позиционирования
  display: 'flex',
  flexDirection: 'column'
};

const dropdownItemStyle = {
  padding: '10px 20px',
  color: '#333',
  textDecoration: 'none', // Убрали подчеркивание
  display: 'flex',
  alignItems: 'center',
  fontFamily: '"Arial", sans-serif', // Шрифт по умолчанию
  borderBottom: '1px solid #ddd', // Разделитель между пунктами
  transition: 'background-color 0.3s ease',
  backgroundColor: 'transparent'
};

const iconStyle = {
  marginLeft: '8px', // Отступ слева для иконки
  color: '#000', // Черный цвет иконки
  fontSize: '16px'
};

export default Header;