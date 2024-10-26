'use client';
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import styles from './PromotionModal.module.css';
import Image from 'next/image';

export default function PromotionModal({
  open,
  onClose,
  openRegisterModal,
  openSearchModal,
}) {
  const handleRegister = () => {
    onClose();
    openRegisterModal();
  };
  const handleSearch = () => {
    onClose();
    openSearchModal();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.promotionModalContent}>
        <img
          src='/sorteo.png'
          alt="sorteo"
          className={styles.sorteoImage}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={handleRegister} className={styles.registerButton}>
            REGISTRARME
          </button>
          <button onClick={handleSearch} className={styles.searchButton}>
            Consultar mi código
          </button>
        </div>
      </Box>
    </Modal>
  );
}
