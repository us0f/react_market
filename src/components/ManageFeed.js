import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectCategoryById } from '../features/categories/categoriesSlice';
import ManageNav from "./Manage/ManageNav";
import ManageTable from './Manage/ManageTable';

const ManageFeed = () => {
    const { categoryId } = useParams();

    const category = useSelector(state => selectCategoryById(state, categoryId));
    


    return (
        <div className="flex flex-col w-full h-full mx-60 py-10">
            <ManageNav />
            {categoryId && category ? (
                    
                <ManageTable category={category} products={category.products} />

            ) : (

                <div className="mt-60 place-content-center bg-[#f7f7f8] px-4 dark:bg-gray-900">
                    <div className="text-center">
                     <h1 className="text-9xl font-black text-gray-300 dark:text-gray-700">Select A Category</h1>
                    </div>
                </div>
               
            )}
        </div>
    );
};
export default ManageFeed;
