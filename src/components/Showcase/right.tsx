import React from 'react';
import StaticsImages from './Statics';

interface Cursos {
  id: number;
  nombre: string;
  descripcion: string;
  plan_precio: number;
  categoria_curso:string;
  duracion:string;
  link: string;
  imagen: string;
}

interface RightProps {
  cursos: Cursos[];
}

const Right: React.FC<RightProps> = ({ cursos }) => {
  return (
    <div className="py-2 flex-1 flex items-center relative">
      {cursos.map((curso) => (
        <div key={curso.id}>
          <StaticsImages items={cursos} />
        </div>
      ))}
    </div>
  );
};

export default Right;
