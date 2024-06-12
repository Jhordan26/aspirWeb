import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Left from './left';
import Right from './right';
import { API_BASE_URL } from '../../config';


const Showcase = () => {
  // Estado para almacenar la lista de cursos
  const [cursos, setCursos] = useState([]);

  // Lógica para cargar los cursos desde la API
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        // Realizar la solicitud GET para obtener la lista de cursos desde la API
        const response = await axios.get(`${API_BASE_URL}/api/cursos`);
        // Actualizar el estado con la lista de cursos obtenida
        setCursos(response.data);
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    // Llamar a la función de carga de cursos al montar el componente
    fetchCursos();
  }, []);

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <Left />
      <Right cursos={cursos} />
    </section>
  );
};

export default Showcase;
