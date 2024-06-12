import React from 'react';
import { motion } from 'framer-motion';
import { Cursos } from '../../../types';

interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  plan_precio: number;
  imagen: string;
}

interface StaticsImagesProps {
  items: Cursos[];
}

const StaticsImages: React.FC<StaticsImagesProps> = ({ items }) => {
  return (
    <div className='w-full h-full absolute flex flex-wrap justify-center items-center top-6 left-0 lg:px-30 lg:py-4 gap-4'>
      {items.map((curso: Cursos, index: number) => (
        <motion.div
          key={index}
          className='cursor-pointer w-[calc(33.3333% - 2rem)] max-w-[300px] drop-shadow-lg bg-white rounded-xl overflow-hidden'>
          <img
            src={curso.imagen}
            alt={curso.nombre}
            className='w-full h-auto'
          />
          <div className='p-4'>
            <p className='text-base lg:text-lg font-semibold text-textColor mb-2'>{curso.nombre}</p>
            <p className='text-[10px] lg:text-lg text-lightGray font-semibold mb-3'>{curso.descripcion}</p>
            <p className='text-sm font-semibold text-headingColor'>
              <span className='text-xs text-red-600'>S/</span> {curso.plan_precio}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StaticsImages;
