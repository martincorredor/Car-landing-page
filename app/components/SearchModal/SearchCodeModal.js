'use client';
import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
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
              <Button
                onClick={handleAccept}
                variant="contained"
                color="success"
              >
                Aceptar
              </Button>
            </div>
          ) : (
            <>
              <h2>Consulta tu código</h2>
              <form>
                <div className={styles.userBox}>
                  <input
                    type="text"
                    required
                    value={documentToSearch}
                    onChange={(e) => setDocumentToSearch(e.target.value)}
                  />
                  <label>Número de Documento</label>
                </div>
                <Button
                  onClick={handleSearch}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '30px', width: '100%' }}
                >
                  Consultar
                </Button>
              </form>
              {errorMessage && (
                <div className={styles.modalResponse}>
                  <Typography color="error">{errorMessage}</Typography>
                  <Button
                    onClick={handleAccept}
                    variant="contained"
                    color="success"
                  >
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
