import React from 'react';

const ManageHead = () => {

    return (
        <thead>

            <tr className="py-8 w-full h-16 border-gray-300 dark:border-gray-200 border-b">

                <th className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Product Image</th>
                <th className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Product Id</th>
                <th className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Product Name</th>
                <th className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Price</th>
                <th className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Stock</th>
                <td className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4">Sold</td>
                <td className="text-gray-600 dark:text-gray-400 font-normal text-left text-sm tracking-normal leading-4"> </td>

            </tr>

        </thead>
    )
}

export default ManageHead;