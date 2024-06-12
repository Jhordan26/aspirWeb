// Filters.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { API_BASE_URL } from "../../config";
import { Category } from "../../../types";

const Filters = ({ filter, setFilter }: { filter: string; setFilter: any }) => {
  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categorias/`)
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full py-10 flex items-center justify-start lg:justify-center h-auto gap-4 md:gap-8 px-2 overflow-x-scroll scrollbar-hidden scroll-smooth"
    >
      {categorias.map((category) => (
        <Button key={category.id} category={category} filter={filter} setFilter={setFilter} />
      ))}
    </motion.div>
  );
};

export default Filters;
