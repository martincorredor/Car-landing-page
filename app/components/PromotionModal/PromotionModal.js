'use client';
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import styles from './PromotionModal.module.css';

const PromotionModal = ({ open, onClose, code }) => {
  const [userCode, setUserCode] = useState(code || null);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.PromotionModalContent}>
        <Button onClick={onClose} variant="contained">
          Consultar
        </Button>
        {userCode && (
          <Typography color="primary">Tu código es: {userCode}</Typography>
        )}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>
    </Modal>
  );
};

export default SearchCodeModal;
