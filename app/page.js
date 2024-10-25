'use client';
import { useState } from 'react';
import Header from './components/Header';
import { Button, TextField, Typography } from '@mui/material';
import { addUser, getUserByDocument } from './firebase/firebase';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    userName: '',
    document: '',
    userCode: '',
  });
  const [documentToSearch, setDocumentToSearch] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Manejar cambios en el formulario de registro
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingUser = await getUserByDocument(formData.document);
    if (existingUser) {
      alert('Este usuario ya está registrado.');
    } else {
      addUser(formData); // Agregar el usuario si no existe
      alert(`Usuario añadido con éxito: ${formData.userName}`);
      setFormData({ userName: '', document: '', userCode: '' });
    }
  };

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setDocumentToSearch(e.target.value);
  };

  // Consultar el código de usuario por documento
  const handleSearch = async () => {
    const user = await getUserByDocument(documentToSearch);
    if (user) {
      setUserCode(user.userCode);
      setErrorMessage('');
    } else {
      setUserCode('');
      setErrorMessage('Aún no estás registrado');
    }
    setDocumentToSearch(''); // Limpiar el input
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* Formulario de Registro */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Nombre"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Documento"
          name="document"
          value={formData.document}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Código de Usuario"
          name="userCode"
          value={formData.userCode}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Añadir Usuario
        </Button>
      </form>

      {/* Consultar Código de Usuario */}
      <div className={styles.searchSection}>
        <Typography variant="h6" gutterBottom>
          Consultar Código del Sorteo
        </Typography>
        <TextField
          label="Número de Documento"
          value={documentToSearch}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleSearch} variant="contained" color="secondary">
          Consultar
        </Button>
        {userCode && (
          <Typography variant="body1" color="primary">
            Tu código es: {userCode}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
      </div>
    </div>
  );
}
