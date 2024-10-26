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
        <Image
          src="/camionetaWithoutBg.png"
          alt="camioneta"
          className={styles.promotionCarImage}
          width={320}
          height={200}
        />
        <div className={styles.content}>
          <Image
            src="/sorteoNeon.jpg"
            alt="sorteo"
            className={styles.sorteoImage}
            width={320}
            height={300}
          />
          <Typography>
            Participa sin costo en el sorteo de un auto cero kilómetros.
          </Typography>
          <Typography className={styles.tycLabel}>Válido hasta 30/11/2024</Typography>
          <div className={styles.buttonsContainer}>
            <Button onClick={handleRegister}>Registrarme</Button>
            <Button onClick={handleSearch}>Consultar mi código</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
