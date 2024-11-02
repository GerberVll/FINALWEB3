import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);

  // Función para obtener la lista de productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      console.log("API Response:", response.data); // Agrega esta línea
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} 
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => onDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
