'use client';
import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { getUserByDocument } from '@/app/firebase/firebase';
import styles from './SearchCodeModal.module.css';

const SearchCodeModal = ({ open, onClose }) => {
  const [documentToSearch, setDocumentToSearch] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    if (errorMessage != '') {
      setErrorMessage('');
    }
    const { name, value } = e.target;

    const validateNumericInput = (value) => {
      return value.replace(/\D/g, '');
    };
    const numericValue = validateNumericInput(value);
    setDocumentToSearch(numericValue);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (documentToSearch.length >= 7 && documentToSearch.length <= 10) {
      const user = await getUserByDocument(documentToSearch);
      if (user) {
        setUserCode(user.userCode);
        setErrorMessage('');
      } else {
        setUserCode('');
        setErrorMessage('Aún no estás registrado');
      }
    } else {
      setErrorMessage('El documento debe tener entre 7 y 10 dígitos.');
    }
  };

  const handleAccept = () => {
    setDocumentToSearch('');
    setUserCode('');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleAccept}>
      <Box className={styles.searchModalContent}>
        <div className={styles.loginBox}>
          {userCode ? (
            <div className={styles.modalResponse}>
              <Typography color="primary" className={styles.codeResponse}>
                Tu código es: {userCode}
              </Typography>
              <Button onClick={handleAccept} className={styles.aceptButton}>
                Aceptar
              </Button>
            </div>
          ) : (
            <>
              <h2>Consulta tu código</h2>
              <form onSubmit={handleSearch}>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="document"
                    required
                    value={documentToSearch}
                    onChange={handleChange}
                    minLength={7}
                    maxLength={10}
                  />
                  <label>Número de Documento</label>
                </div>
                <Button type="submit" className={styles.searchButton}>
                  Consultar
                </Button>
              </form>
              {errorMessage && (
                <div className={styles.modalResponse}>
                  <Typography color="error">{errorMessage}</Typography>
                  <Button onClick={handleAccept} className={styles.aceptButton}>
                    Aceptar
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default SearchCodeModal;
