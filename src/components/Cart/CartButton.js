import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../features/cart/cartSlice"; 

const CartButton = ({ showCart, toggleCart }) => {

  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <div className={`flex h-12 w-12 mb-2 ml-2 bg-white justify-center items-center cursor-pointer rounded-full transition-all duration-300 ease-in-out ${showCart ? 'translate-y-[-16rem]' : 'translate-y-0'}`} onClick={toggleCart}>

        <div className="relative text-white">

        <FaCartShopping className="scale-150 text-black" />

            <div className="absolute top-1/2 left-[10px] bg-black text-white w-7 h-7 flex items-center justify-center rounded-full">
                {totalQuantity}
            </div>

        </div>

    </div>
  )
}

export default CartButton;