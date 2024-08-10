import React from 'react';
import { Link } from 'react-router-dom';

const AllPages = () => {
  return (
    <div className="container mt-4">
      <h2>Доступ ко всем страницам</h2>
      <ul>
        <li><Link to="/calendar">Календарь</Link></li>
        {/* Добавьте ссылки на другие страницы, если они есть */}
      </ul>
    </div>
  );
};

export default AllPages;
