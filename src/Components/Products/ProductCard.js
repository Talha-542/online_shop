import React from 'react';
import {Card , Button} from 'react-bootstrap'
const ProductCard = ({ imageUrl, altText, title, description, price }) => {
  return (
    <Card className="mb-4" style={{border:"none "}}>
      <Card.Img 
        variant="top" 
        src={imageUrl}  style={{ width: "15rem" , height: "15rem" , margin:"50px" }}
        alt={altText} 
        className="product-card-img" 
      />
      <Card.Body>
        <Card.Title style={{ fontSize: "17px" }}>{title}</Card.Title>
        {/* <Card.Text>
          {description}
        </Card.Text> */}
         <Card.Text style={{ fontSize: "18px" }}>
          <strong>${price}</strong>
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
