'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { addUser, getUserByDocument } from './firebase/firebase';
import styles from './page.module.css';


const generateUserCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));
  const randomNumbers = Math.floor(100 + Math.random() * 900);
  return `${randomLetters}${randomNumbers}`;
};

export default function Home() {
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
  const [cities, setCities] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [documentToSearch, setDocumentToSearch] = useState('');
  const [userCode, setUserCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);

  console.log('departamentos>> ', departmentsList)
  console.log('ciudades>> ', cities)

  const departmentsAPI = 'https://api-colombia.com/api/v1/Department';

  const fetchDepartments = async () => {
    try {
      const response = await fetch(departmentsAPI);
      const data = await response.json();
      const departmentData = data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      console.log('está acá?')
      setDepartmentsList(departmentData);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  };

  const fetchCities = async (departmentId) => {
    const citiesAPI = `https://api-colombia.com/api/v1/Department/${departmentId}/cities`;
    try {
      const response = await fetch(citiesAPI);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error al obtener las ciudades:', error);
    }
  };

  useEffect(() => {
    fetchDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'department') {
      const selectedDepartment = departmentsList.find(
        (dept) => dept.name === value
      );

      if (selectedDepartment) {
        fetchCities(selectedDepartment.id);
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
          city: '',
        }));
      }
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
      alert('Este usuario ya está registrado.');
    } else {
      const userCode = generateUserCode();
      setGeneratedCode(userCode);


      addUser({ ...formData, userCode });
      alert(`Usuario añadido con éxito: ${formData.firstName}`);
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
    }
  };

  
  const handleSearchChange = (e) => {
    setDocumentToSearch(e.target.value);
  };


  const handleSearch = async () => {
    const user = await getUserByDocument(documentToSearch);
    if (user) {
      setUserCode(user.userCode);
      setErrorMessage('');
    } else {
      setUserCode('');
      setErrorMessage('Aún no estás registrado');
    }
    setDocumentToSearch('');
  };

  return (
    <div className={styles.page}>
      <Header />
      {/* Formulario de Registro */}
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
          margin="normal"
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
              {city.name}{' '}
              {/* Asegúrate de que estás usando el nombre correcto aquí */}
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
        <FormControlLabel
          control={
            <Checkbox
              name="habeasData"
              checked={formData.habeasData}
              onChange={handleChange}
              required
            />
          }
          label="Autorizo el tratamiento de mis datos de acuerdo con la finalidad establecida en la política de protección de datos personales."
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar Usuario
        </Button>
        {generatedCode && (
          <Typography
            variant="body1"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Tu código para participar en el sorteo es: {generatedCode}
          </Typography>
        )}
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
