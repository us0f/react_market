import { useState } from 'react';
import { useAddCategoryMutation } from "../../features/categories/categoriesSlice";

const AddCategory = ({ setShowAddCategory }) => {

    const [newCategoryName, setNewCategoryName] = useState("");

    const [addCategory] = useAddCategoryMutation();

    const handleSubmitNewCategory = async (e) => {
        e.preventDefault();

        const newCategory = {
            id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
            name: newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1),
            products: [],
        };

        try {
            await addCategory(newCategory).unwrap();
            setNewCategoryName('');
            setShowAddCategory(false);
        } catch (err) {
            console.error("Failed to add category:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                    placeholder="Category Name" 
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button 
                        onClick={handleSubmitNewCategory}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Add
                    </button>
                    <button 
                        onClick={() => setShowAddCategory(false)} 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;