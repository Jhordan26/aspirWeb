import React, { useState, useEffect } from 'react';
import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa";
import { API_BASE_URL } from "../config";

interface Categorias {
    id: number;
    nombre: string;
    urlParam: string;
    icon?: JSX.Element; // El icono es opcional
}

const CategoriesComponent: React.FC = () => {
    const [categories, setCategories] = useState<Categorias[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/categorias`);
                const data: Categorias[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            {categories.map(category => (
                <div key={category.id}>
                    <span>{category.nombre}</span>
                    {category.icon && category.icon} {/* Renderizar el icono si está disponible */}
                </div>
            ))}
        </div>
    );
};

export default CategoriesComponent;
