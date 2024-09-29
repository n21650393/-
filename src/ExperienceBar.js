import React from 'react';

function ExperienceBar({ currentExp, maxExp, level }) {
  const progress = (currentExp / maxExp) * 100;
  const levelTitle = getLevelTitle(level);

  return (
    <div className="experience-bar-container">
      <div className="level-info">等級 {level} - {levelTitle}</div>
      <div className="experience-bar">
        <div className="experience-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="experience-info">
        <span>{currentExp} / {maxExp} XP</span>
      </div>
    </div>
  );
}

function getLevelTitle(level) {
  if (level < 5) return '新手';
  if (level < 10) return '學徒';
  if (level < 20) return '熟練者';
  if (level < 30) return '專家';
  return '大師';
}

export default ExperienceBar;