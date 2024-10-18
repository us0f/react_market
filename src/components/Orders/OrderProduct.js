import React from 'react'
const OrderProduct = ({ product }) => {

    let prodImg;

    try {
     prodImg = require(`../../assets/prodImages/${product.id}.png`);
    } catch (error) {
     prodImg = require(`../../assets/unknown.png`);
    }

  return (
    <>

        <svg className="mt-9 w-full mb-9" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
            <path d="M0 1H1216" stroke="#D1D5DB" />
        </svg>

        <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">

            <div className="grid grid-cols-6 w-full">

                <div className="col-span-6 sm:col-span-1">
                    <img src={prodImg} alt="" className="max-sm:mx-auto object-cover" />
                </div>

                <div
                    className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">{product.name}</h6>

                    <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Price: {product.price} EGP</span>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">

                <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Qty</p>
                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">{product.quantity}</p>
                </div>

                <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Total</p>
                    <p className="font-semibold text-lg leading-8 text-green-600 text-left whitespace-nowrap">{product.quantity * product.price} EGP</p>
                </div>

            </div>

        </div>

    </>
  )
}

export default OrderProduct;