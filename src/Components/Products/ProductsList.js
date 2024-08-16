import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/productsSlice';
import ProductCard from './ProductCard'; 
import { Button, Card } from 'react-bootstrap';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
        <p><strong>Error:</strong> {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard
              imageUrl={product.image}
              altText={product.title}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
