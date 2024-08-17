import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000); 
  };

  return (
    
    <Card className="mb-4" style={{ border: 'none' }}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: '15rem', width: '15rem', paddingLeft: '10px' }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary" onClick={addToCartHandler}>
          Add to Cart
        </Button>
        {showAlert && (
          <div className="alert alert-primary mt-2" role="alert">
            Added to cart!
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
