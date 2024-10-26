'use client';
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import styles from './Header.module.css';

const MODAL_TYPE = {
  register: 'register',
  search: 'search',
};

export default function Header({ openRegisterModal, openSearchModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (type) => {
    setAnchorEl(null);
    if (type && type === MODAL_TYPE.register) {
      openRegisterModal();
    } else if (type && type === MODAL_TYPE.search) {
      openSearchModal();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftNav}>
        <a>VEHÍCULOS</a>
        <a>CONCESIONARIOS</a>
        <a>VEHÍCULOS USADOS</a>
      </div>
      <div className={styles.rightNav}>
        <Button
          className={styles.navSorteoButton}
          onClick={handleOpenMenu}
          variant="outlined"
          size="medium"
        >
          SORTEO
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleCloseMenu(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleCloseMenu(MODAL_TYPE.register)}>
            Registrarme
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu(MODAL_TYPE.search)}>
            Consultar mi código
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
