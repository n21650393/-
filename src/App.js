import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ExperienceBar from './ExperienceBar';
import SocialLinks from './SocialLinks';
import './App.css';

function App() {
  const [currentExp, setCurrentExp] = useState(0);
  const [maxExp, setMaxExp] = useState(100);
  const [level, setLevel] = useState(1);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [backgroundImages, setBackgroundImages] = useState(['background1.png', 'background2.png', 'background3.png']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addBackgroundImage = (newImage) => {
    setBackgroundImages(prevImages => [...prevImages, newImage]);
  };

  return (
    <Router>
      <div className="App">
        <div className="background-slider">
          <div className="background-blur" style={{backgroundImage: `url(${backgroundImages[currentBgIndex]})`}}></div>
          <div className="background-content" style={{backgroundImage: `url(${backgroundImages[currentBgIndex]})`}}></div>
        </div>
        <ExperienceBar currentExp={currentExp} maxExp={maxExp} level={level} />
        <div className="main-content">
          <Navbar onNavClick={handleOpenModal} />
          <SocialLinks />
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
            bgcolor: 'transparent',
            boxShadow: 24,
            p: 4,
            mt: 8,
          }}>
            {modalContent && React.cloneElement(modalContent, { setCurrentExp, addBackgroundImage, setMaxExp, setLevel })}
          </Box>
        </Modal>
      </div>
    </Router>
  );
}

export default App;