import React from 'react';
import { useState } from 'react';
import { HiOutlineTrash } from "react-icons/hi2";
import DeleteProduct from './DeleteProduct';

const Stock = ({ category, product }) => {

    let prodImg;

    try {
     prodImg = require(`../../assets/prodImages/${product.id}.png`);
    } catch (error) {
     prodImg = require(`../../assets/unknown.png`);
    }

    const [showDeleteProductConfirmation, setShowDeleteProductConfirmation] = useState(false);

    const handleDeleteProduct = () => {
        setShowDeleteProductConfirmation(true);
    };

    return (
    <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">

        <td className="text-sm whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            <div className="text-gray-400 relative">
                <img src={prodImg} alt="" className="size-24 max-sm:mx-auto object-cover" />
            </div>
        </td>

        <td className="text-md whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{product.id}</td>

        <td className="text-md  whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            {product.name}
        </td>

        <td className="whitespace-no-wrap">
            <div className="flex items-center">
                <p className="text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-md">{product.price}</p>
            </div>
        </td>

        <td className="text-md whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
            {product.stock}
        </td>

        <td className="text-md whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{product.sold}</td>

        <td className="text-md whitespace-no-wrap text-red-400 tracking-normal leading-4 cursor-pointer hover:text-red-600" onClick={handleDeleteProduct} ><HiOutlineTrash className="size-5" /></td>

        {/* Delete Product Modal */}
        {showDeleteProductConfirmation && (
          <DeleteProduct category={category} product={product} setShowDeleteProductConfirmation={setShowDeleteProductConfirmation}  />
        )}

    </tr>
    )
}

export default Stock;