import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

const ManageNav = () => {

    const { categoryId } = useParams();

    const currentCategory = categoryId ? (categoryId.charAt(0).toUpperCase() + categoryId.slice(1)) : '';

    const categories = useSelector(selectAllCategories);

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showDeleteCategoryConfirmation, setShowDeleteCategoryConfirmation] = useState(false);

    const handleAddCategory = () => {
        setShowAddCategory(true);
    };
    
    const handleDeleteCategory = () => {
        setShowDeleteCategoryConfirmation(true);
    };

    return (
        <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400">
            {categories.map( (category, id) => (

            <div key={id} className="me-2">

                <Link to={`/manage/${category.id}`} aria-current="page" className={`inline-block p-4 w-24 ${categoryId === category.id ? 'text-blue-600 bg-gray-200 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500' : ''}`} >{category.name}</Link>

            </div>
            ))}

            <div className="lg:ml-auto flex items-center">
                <button onClick={handleAddCategory} className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-green-700 hover:bg-green-600 focus:outline-none rounded text-sm font-medium leading-none text-white">
                    Add Category
                </button>

                <button onClick={handleDeleteCategory} disabled={!categoryId} className={`inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded text-sm font-medium leading-none text-white ${categoryId ? '' : 'opacity-50'}`}>
                    Delete {currentCategory}
                </button>
            </div>

            {/* Add Category Modal */}
            {showAddCategory && (
                <AddCategory setShowAddCategory={setShowAddCategory} />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteCategoryConfirmation && (
                <DeleteCategory categoryId={categoryId} setShowDeleteCategoryConfirmation={setShowDeleteCategoryConfirmation} />
            )}

        </div>
    )
}

export default ManageNav;