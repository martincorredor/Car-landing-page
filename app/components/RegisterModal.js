"use client";
import { useState } from 'react';


export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    departamento: '',
    ciudad: '',
    celular: '',
    correo: '',
    aceptaHabeasData: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
    alert(`Te has registrado con éxito. Tu código es: ${codigo}`);
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          required
        />
        {/* Continúa con los demás campos según lo que requieres */}
        <label>
          <input
            type="checkbox"
            name="aceptaHabeasData"
            checked={formData.aceptaHabeasData}
            onChange={() =>
              setFormData({
                ...formData,
                aceptaHabeasData: !formData.aceptaHabeasData,
              })
            }
          />
          Autorizo el tratamiento de mis datos
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
