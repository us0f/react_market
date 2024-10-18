import React from 'react';
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice"; 

const Product = ({ product }) => {
  let prodImg;

  try {
   prodImg = require(`../../assets/prodImages/${product.id}.png`);
  } catch (error) {
   prodImg = require(`../../assets/unknown.png`);
  }

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
  };

  return (
    <div className='flex flex-wrap w-60 group p-4 lg:p-5 lg:m-5 rounded-t-3xl lg:hover:scale-110 focus:scale-110 drop-shadow-2xl '>

      <div className="relative overflow-hidden cursor-pointer" onClick={() => handleAddToCart(product)}>

      <img src={ prodImg } className='w-full object-cover bg-white' alt={product.name} />

      <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-100">
        <button className="bg-[#59b18c] text-white py-6 px-6 rounded-2xl">

          <FaCartPlus className='text-white scale-150' />

        </button>

      </div>

      </div>

      <div className='flex w-full h-10 justify-around items-center bg-[#75c06e]'>

        <h1>Stock : {product.stock}</h1>
        <h1>Price : {product.price} EGP</h1>

      </div>

    </div>
  )
}

export default Product;