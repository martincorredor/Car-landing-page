'use client';
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { getUserByDocument } from '@/app/firebase/firebase';
import styles from './SearchCodeModal.module.css';

const SearchCodeModal = ({ open, onClose }) => {
  const [documentToSearch, setDocumentToSearch] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    const user = await getUserByDocument(documentToSearch);
    if (user) {
      setUserCode(user.userCode);
      setErrorMessage('');
    } else {
      setUserCode('');
      setErrorMessage('Aún no estás registrado');
    }
  };

  const handleAccept = () => {
    // Limpia todos los campos y mensajes
    setDocumentToSearch('');
    setUserCode('');
    setErrorMessage('');
    // Cierra el modal
    onClose();
  };

  return (
    <Modal open={open} onClose={handleAccept}>
      <Box className={styles.searchModalContent}>
        <div className={styles.searchContainer}>
          <TextField
            label="Número de Documento"
            value={documentToSearch}
            onChange={(e) => setDocumentToSearch(e.target.value)}
          />
          <Button onClick={handleSearch} variant="contained">
            Consultar
          </Button>
        </div>
        {userCode && (
          <div className={styles.modalResponse}>
            <Typography color="primary" className={styles.codeResponse}>
              Tu código es: {userCode}
            </Typography>
            <Button onClick={handleAccept} variant="contained" color="success">
              Aceptar
            </Button>
          </div>
        )}
        {errorMessage && (
          <div className={styles.modalResponse}>
            <Typography color="error">{errorMessage}</Typography>
            <Button onClick={handleAccept} variant="contained" color="success">
              Aceptar
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default SearchCodeModal;
