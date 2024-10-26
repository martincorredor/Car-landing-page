'use client';
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
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

  const handleInput = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, '');
    }
  };

  const handleValidation = (e) => {
    const minLength = e.target.minLength;
    const maxLength = e.target.maxLength;
    const valueLength = e.target.value.length;

    if (valueLength < minLength) {
      e.target.setCustomValidity(
        `El número debe tener entre ${minLength} y ${maxLength} digitos.`
      );
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleInputReset = (e) => {
    e.target.setCustomValidity('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const validateNumericInput = (value) => {
      return value.replace(/\D/g, '');
    };

    if (name === 'phone' || name === 'document') {
      const numericValue = validateNumericInput(value);

      setFormData((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    } else if (name === 'department') {
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

    const existingUser = await getUserByDocument(formData.document);
    if (existingUser) {
      setIsRegistered(true);
      setErrorMessage('Ya estás registrado.');
      return;
    }

    const userCode = generateUserCode();
    setGeneratedCode(userCode);
    await addUser({ ...formData, userCode });
  };

  const handleAccept = () => {
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
    setGeneratedCode('');
    setIsRegistered(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.registerModalContent}>
        {!generatedCode && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.userBox}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
              <label>Nombre</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onInput={handleInput}
                required
              />
              <label>Apellido</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                minLength={7}
                maxLength={10}
                onInvalid={handleValidation}
                onInput={handleInputReset}
                required
              />
              <label>Cédula</label>
            </div>
            <Select
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={(e) => {
                const selectedDepartment = departmentsList.find(
                  (dept) => dept.name === e.target.value
                );
                if (selectedDepartment) fetchCities(selectedDepartment.id);
                setFormData((prevState) => ({
                  ...prevState,
                  department: e.target.value,
                  city: '',
                }));
              }}
              required
              fullWidth
              displayEmpty
              className={styles.selectBox}
            >
              <MenuItem value="" disabled>
                Selecciona tu Departamento
              </MenuItem>
              {departmentsList.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))}
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
              className={styles.selectBox}
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
            <div className={styles.userBox}>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                minLength={8}
                maxLength={10}
                onInvalid={handleValidation}
                onInput={handleInputReset}
                required
              />
              <label>Celular</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Correo Electrónico</label>
            </div>
            <div className={styles.habeasContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="habeasData"
                    checked={formData.habeasData}
                    onChange={handleChange}
                    required
                    className={styles.checkBox}
                  />
                }
                label="Autorizo el tratamiento de mis datos de acuerdo con la finalidad establecida en la política de protección de datos personales"
              />
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
