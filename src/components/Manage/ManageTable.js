import ManageToolBar from './ManageToolBar';
import ManageHead from './ManageHead';
import Stock from './Stock';
// import { useUpdateCategoryMutation } from '../../features/categories/categoriesSlice';

const ManageTable = ({ category, products }) => {

    // const [updateCategory] = useUpdateCategoryMutation();

    return (
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">

            <ManageToolBar />

            <div className="w-full overflow-x-scroll xl:overflow-x-hidden">

                <table className="min-w-full mx-6 bg-white dark:bg-gray-800">

                    <ManageHead />

                    <tbody>

                        {products.map((product, id) => (
                            <Stock key={id} category={category} product={product} />
                        ))}

                    </tbody>

                </table>

            </div>
            
    </div>
    )
}

export default ManageTable;