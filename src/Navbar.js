import React, { useState } from 'react';
import { FaHome, FaTasks, FaTrophy, FaGraduationCap, FaUpload } from 'react-icons/fa';
import Tasks from './Tasks';
import Achievements from './Achievements';
import Skills from './Skills';
import UploadWork from './UploadWork';

function Navbar({ onNavClick }) {
  const [selectedNav, setSelectedNav] = useState('home');

  const handleNavClick = (content, navName) => {
    if (navName !== 'home') {
      setSelectedNav(navName);
      onNavClick(content);
    }
  };

  return (
    <nav className="nav-container" style={{ userSelect: 'none' }}>
      <span className="nav-link home-link selected">
        <FaHome /> 首頁
      </span>
      <button onClick={() => handleNavClick(<Tasks />, 'tasks')} className={`nav-link ${selectedNav === 'tasks' ? 'selected' : ''}`}>
        <FaTasks /> 每日任務
      </button>
      <button onClick={() => handleNavClick(<Achievements />, 'achievements')} className={`nav-link ${selectedNav === 'achievements' ? 'selected' : ''}`}>
        <FaTrophy /> 成就
      </button>
      <button onClick={() => handleNavClick(<Skills />, 'skills')} className={`nav-link ${selectedNav === 'skills' ? 'selected' : ''}`}>
        <FaGraduationCap /> 技能
      </button>
      <button onClick={() => handleNavClick(<UploadWork />, 'upload')} className={`nav-link ${selectedNav === 'upload' ? 'selected' : ''}`}>
        <FaUpload /> 上傳作品
      </button>
    </nav>
  );
}

export default Navbar;