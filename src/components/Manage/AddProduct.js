import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateCategoryMutation, selectCategoryById, selectMaxProductId } from "../../features/categories/categoriesSlice";

const AddProduct = ({ categoryId, setShowAddProduct }) => {

    const [newProductName, setNewProductName] = useState("");
    const [newProductStock, setNewProductStock] = useState();
    const [newProductPrice, setNewProductPrice] = useState();

    const existingCategory = useSelector(state => selectCategoryById(state, categoryId));
    const [updateCategory] = useUpdateCategoryMutation();

    const maxProductId = useSelector(selectMaxProductId);

    const handleSubmitNewProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            id: (maxProductId + 1).toString(),
            name: newProductName,
            stock: newProductStock,
            sold: 0,
            price: newProductPrice,
        };

        const updatedProducts = [...existingCategory.products, newProduct];

        const updatedCategory = {
            ...existingCategory,
            products: updatedProducts,
        };

        try {
            await updateCategory(updatedCategory).unwrap();
            setNewProductName('');
            setNewProductPrice();
            setNewProductStock();
            setShowAddProduct(false);
        } catch (err) {
            console.error("Failed to add product:", err);
            if (err.data) {
                console.error("Error data:", err.data);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
                <input 
                    type="text" 
                    value={newProductName} 
                    onChange={(e) => setNewProductName(e.target.value)} 
                    placeholder="Product Name" 
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="number" 
                    value={newProductPrice} 
                    onChange={(e) => setNewProductPrice(e.target.value)} 
                    placeholder="Product Price" 
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="number" 
                    value={newProductStock} 
                    onChange={(e) => setNewProductStock(e.target.value)} 
                    placeholder="Product Stock" 
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={handleSubmitNewProduct}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Add
                    </button>
                    <button 
                        onClick={() => setShowAddProduct(false)} 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;