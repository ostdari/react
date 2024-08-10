import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap
import { Dropdown } from 'react-bootstrap'; // Импортируем компонент Dropdown из Bootstrap

const Header = ({ hasFullAccess, username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Meeting Scheduler</h1>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/calendar" style={navLinkStyle}>Calendar</Link>
          </li>
          {hasFullAccess && (
            <>
              <li style={navItemStyle}>
                <Link to="/find-time" style={navLinkStyle}>Organize Meetings</Link>
              </li>
              <li style={navItemStyle}>
                <Link to="/meetings" style={navLinkStyle}>Meetings</Link>
              </li>
            </>
          )}
          {username && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="user-menu" style={dropdownToggleStyle}>
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  justifyContent: 'space-between'
};

const titleStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold'
};

const navListStyle = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
};

const navItemStyle = {
  margin: 0
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'color 0.3s ease'
};

const dropdownToggleStyle = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  border: 'none',
  backgroundColor: 'transparent'
};

export default Header;
