import React from 'react';
import './Modal.css';

const Modal = ({isOpen, onClose, onLogin}) => {
    if (!isOpen) {
        return null;
    }

    return (
      <div className="modal-overlay">
          <div className="modal-container">
              <button className="modal-close" onClick={onClose}>
                  &times;
              </button>
              <h2 className="modal-title">Spotify Login</h2>
              <p className="modal-text">
                  Logging into your Spotify account is required to access features. Discover playlists or enter your own playlists that match your running cadence and keep the beat!
              </p>
              <button className="modal-button" onClick={onLogin }>
                  Login with Spotify
              </button>
          </div>
      </div>
    );
}

export default Modal;