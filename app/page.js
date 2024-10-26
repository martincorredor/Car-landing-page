'use client';
import React, { useState, useEffect } from 'react';
import RegisterModal from './components/RegisterModal/RegisterModal';
import SearchCodeModal from './components/SearchModal/SearchCodeModal';
import Header from './components/Header/Header';
import { Button } from '@mui/material';
import styles from './page.module.css';
import Footer from './components/Footer/Footer';
import PromotionModal from './components/PromotionModal/PromotionModal';

export default function Home() {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [cities, setCities] = useState([]);
  const [isPromotionModalOpen, setPromotionModalOpen] = useState(false);
  const departmentsAPI = 'https://api-colombia.com/api/v1/Department';

  const fetchDepartments = async () => {
    try {
      const response = await fetch(departmentsAPI);
      const data = await response.json();
      const departmentData = data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
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
    fetchDepartments();
    setPromotionModalOpen(true);
  }, []);

  return (
    <div className={styles.page}>
      <Header
        openRegisterModal={() => setRegisterModalOpen(true)}
        openSearchModal={() => setSearchModalOpen(true)}
      />
      <main>
        <div className={styles.videoContainer}>
          <video
            src="/lamborghini.mp4"
            autoPlay
            loop
            muted
            className={styles.videoBackground}
          />
        </div>
        <div className={styles.mainTitle}>
          MÁS QUE UN AUTO,
          <br />
          UN ESTILO DE VIDA
        </div>
      </main>
      <Footer />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        departmentsList={departmentsList}
        cities={cities}
        fetchCities={fetchCities}
      />

      <SearchCodeModal
        open={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <PromotionModal
        open={isPromotionModalOpen}
        onClose={() => setPromotionModalOpen(false)}
        openRegisterModal={() => setRegisterModalOpen(true)}
        openSearchModal={() => setSearchModalOpen(true)}
      />
    </div>
  );
}
