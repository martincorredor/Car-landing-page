'use client';
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import styles from './RegisterModal.module.css';
import { addUser } from '@/app/firebase/firebase';
import { generateUserCode } from '@/app/utils/utils';
import { getUserByDocument } from '@/app/firebase/firebase';

const RegisterModal = ({
  open,
  onClose,
  departmentsList,
  cities,
  fetchCities,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    document: '',
    department: '',
    city: '',
    phone: '',
    email: '',
    habeasData: false,
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      const selectedDepartment = departmentsList.find(
        (dept) => dept.name === value
      );
      if (selectedDepartment) fetchCities(selectedDepartment.id);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        city: '',
      }));
    } else {
      setFormData({
        ...formData,
        [name]: e.target.type === 'checkbox' ? e.target.checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobar si ya está registrado
    const existingUser = await getUserByDocument(formData.document);
    if (existingUser) {
      setIsRegistered(true);
      setErrorMessage('Ya estás registrado.');
      return; // Salir si ya está registrado
    }

    // Si no está registrado, generar el código y añadir al usuario
    const userCode = generateUserCode();
    setGeneratedCode(userCode);
    await addUser({ ...formData, userCode });
  };

  const handleAccept = () => {
    // Limpiar los datos del formulario y cerrar el modal
    setFormData({
      firstName: '',
      lastName: '',
      document: '',
      department: '',
      city: '',
      phone: '',
      email: '',
      habeasData: false,
    });
    setGeneratedCode(''); // Limpiar el código generado
    setIsRegistered(false); // Reiniciar estado de registro
    setErrorMessage(''); // Limpiar mensaje de error
    onClose(); // Cerrar el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.registerModalContent}>
        {!generatedCode && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ pattern: '[A-Za-z ]+' }}
            />
            <TextField
              label="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ pattern: '[A-Za-z ]+' }}
            />
            <TextField
              label="Cédula"
              name="document"
              value={formData.document}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ pattern: '[0-9]+' }}
            />
            <Select
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecciona tu Departamento
              </MenuItem>
              {departmentsList.length > 0 ? (
                departmentsList.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No hay departamentos disponibles</MenuItem>
              )}
            </Select>
            <Select
              label="Ciudad"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              fullWidth
              displayEmpty
              margin="normal"
              disabled={!formData.department}
            >
              <MenuItem value="" disabled>
                Selecciona tu Ciudad
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Celular"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              inputProps={{ pattern: '[0-9]+' }}
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="email"
            />
            <div className={styles.habeasContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="habeasData"
                    checked={formData.habeasData}
                    onChange={handleChange}
                    required
                  />
                }
              />
              <label>
                Autorizo el tratamiento de mis datos de acuerdo con la finalidad
                establecida en la política de protección de datos personales
              </label>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.registerButton}
            >
              Registrar Usuario
            </Button>
          </form>
        )}
        {isRegistered ? (
          <div className={styles.modalResponse}>
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
            <Button onClick={handleAccept} variant="contained" color="success">
              Aceptar
            </Button>
          </div>
        ) : (
          generatedCode && (
            <div className={styles.modalResponse}>
              <Typography className={styles.responseText}>
                Te registraste con éxito. <br /> Tu código para participar en el
                sorteo es
                <Typography color="primary" className={styles.codeResponse}>
                  {generatedCode}
                </Typography>
              </Typography>
              <Button
                onClick={handleAccept}
                variant="contained"
                color="success"
              >
                Aceptar
              </Button>
            </div>
          )
        )}
      </Box>
    </Modal>
  );
};

export default RegisterModal;
