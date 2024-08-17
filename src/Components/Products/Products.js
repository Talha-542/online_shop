import React, { Suspense, lazy } from 'react';

const ProductsList = lazy(() => import('./ProductsList'));

const Products = () => {
  return (
    <>
      <h1 style={{ marginTop: '15px', textAlign: 'center' , marginBottom:'10px'}}>Our Products</h1>
      <Suspense fallback={<h1>Loading Products..</h1>}>
        <ProductsList />
      </Suspense>
    </>
  );
};

export default Products;
