// client/src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ selectedProduct, onFormSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, price, description };

    try {
      if (selectedProduct) {
        await axios.put(`${process.env.REACT_APP_API_URL}/products/${selectedProduct.id}`, product);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/products`, product);
      }
      onFormSubmit();
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ProductForm;
