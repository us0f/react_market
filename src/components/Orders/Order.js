import React from 'react';
import { RxCross2 } from "react-icons/rx";
import OrderProduct from './OrderProduct';

const Order = ({orders}) => {
  
  return (
    <>
    {orders.map((order) => (
      <div key={order.id} className='mt-7 border border-gray-300 pt-9'>


        <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
            <div className="data">
                <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order: #{order.id}</p>
                <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Date: {new Date(order.date).toLocaleString()}</p>
            </div>
            <p className="ml-96 text-center font-medium text-xl leading-8 text-gray-500 max-sm:py-4">Total Qty: {order.totalQty}</p>
        </div>
        

        {order.products.map((product) => (
          <OrderProduct key={product.id} product={product} />
        ))}

        <svg className="mt-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
          <path d="M0 1H1216" stroke="#D1D5DB" />
        </svg>

        <div className="px-3 md:px-11 flex items-center max-sm:flex-col-reverse">
            <div className="flex max-sm:flex-col-reverse items-center">
                <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-red-600">
                  <RxCross2 className='size-7'/> Delete Order</button>
            </div>
            <p className="ml-96 text-center font-medium text-xl leading-8 text-green-600 max-sm:py-4"> <span className="text-gray-500">Total Price: </span> {order.totalPrice} EGP</p>
        </div>
      
      </div>   
    ))}
    </>
  )
}

export default Order;