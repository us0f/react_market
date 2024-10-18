import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../features/categories/categoriesSlice";

const DeleteCategory = ({ categoryId, setShowDeleteCategoryConfirmation }) => {
    const navigate = useNavigate();

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleConfirmDeleteCategory = async () => {
        if (!categoryId) return;
        try {
            await deleteCategory(categoryId).unwrap();
            navigate(`/manage`);
        } catch (error) {
            console.error("Failed to delete category:", error);
        } finally {
            setShowDeleteCategoryConfirmation(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete the category "{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}" ?</p>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={handleConfirmDeleteCategory}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => setShowDeleteCategoryConfirmation(false)} 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCategory;