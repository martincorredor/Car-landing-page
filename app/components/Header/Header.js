import React, { useState } from 'react';
import styles from './Header.module.css';

export default function Header({ openRegisterModal, openSearchModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCloseMenu = (type) => {
    setIsMenuOpen(false);
    if (type === 'register') openRegisterModal();
    else if (type === 'search') openSearchModal();
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftNav}>
        <a>VEHÍCULOS</a>
        <a>CONCESIONARIOS</a>
        <a>VEHÍCULOS USADOS</a>
      </div>
      <div className={styles.rightNav}>
        <button onClick={handleOpenMenu} className={styles.registerButton}>
          SORTEO
        </button>
        {isMenuOpen && (
          <div className={styles.menu}>
            <div
              className={styles.menuItem}
              onClick={() => handleCloseMenu('register')}
            >
              Registrarme
            </div>
            <div
              className={styles.menuItem}
              onClick={() => handleCloseMenu('search')}
            >
              Consultar mi código
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
