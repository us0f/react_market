import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import AddProduct from "./AddProduct";

const ManageToolBar = () => {
    const { categoryId } = useParams();

    const currentCategory = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleAddProduct = () => {
        setShowAddProduct(true);
    };

    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
                <div className="flex items-center">

                    <div className="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray">
                        <FaRegEdit className="size-5"/>
                    </div>

                </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                <div className="flex items-center border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:mr-48">
                    <p className="text-3xl font-bold text-black" id="page-view">
                        {currentCategory}
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">

                {/* <div className="flex items-center lg:border-r border-gray-300 dark:border-gray-200 py-3 lg:py-0 lg:px-6">
                    <p className="text-base text-gray-600 dark:text-gray-400" id="page-view">
                        Viewing - 20 of 60
                    </p>
                </div> */}

                <div className="lg:ml-6 flex items-center">
                    <button onClick={handleAddProduct} className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded text-sm font-medium leading-none text-white">Add Product</button>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
                <AddProduct categoryId={categoryId} setShowAddProduct={setShowAddProduct} />
            )}
            
        </div>
    )
}

export default ManageToolBar;