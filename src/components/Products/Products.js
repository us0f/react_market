import React from 'react';
import Product from './Product';

const Products = ({ products }) => {

  return (
    <>

     {products.map( (product, id) => (
        <Product key={id} product={product} />
     ))}
     
    </>
  )
}

export default Products;