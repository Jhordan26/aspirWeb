import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Cursos } from '../../types';
import StaticsImages from '../components/Showcase/Statics';

const Showcase: React.FC = () => {
  const [cursos, setCursos] = useState<Cursos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get<Cursos[]>(`${API_BASE_URL}/api/Cursos/`);
        setCursos(response.data);
        setLoading(false);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <StaticsImages items={cursos} />
    </section>
  );
};

export default Showcase;
