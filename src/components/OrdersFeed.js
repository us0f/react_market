import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrdersByPage, selectTotalPages, clearOrders, selectTotalCount } from "../features/orders/ordersSlice";
import OrdersNav from "./Orders/OrdersNav";
import Order from "./Orders/Order";

const OrdersFeed = () => {
  const dispatch = useDispatch();

  const ordersCount = useSelector(selectTotalCount);

  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 1;

  const totalPages = useSelector((state) => selectTotalPages(state, itemsPerPage));

  const orders = useSelector((state) => selectOrdersByPage(state, currentPage, itemsPerPage));

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  const handleClearOrders = () => {
    dispatch(clearOrders());
  };

  return (
    <>

      <div className='flex flex-col w-full h-full mx-96 mt-10 mb-10'>
              
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black">Order History</h2>
          <h2 className="font-manrope font-bold text-xl text-black text-opacity-50">{ordersCount} {`${ordersCount<=1 ? 'Order' : 'Orders'} `}</h2>
          <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-red-50 hover:border-red-400" onClick={handleClearOrders}>Clear History</button>
        </div>

        {orders.length > 0 ? (

          <Order orders={orders}/>

        ) : (

          <p className="mt-72 text-3xl font-semibold text-center text-gray-500">No checkout history available.</p>

        )}

      </div>

      <OrdersNav currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />

    </>
  )
}

export default OrdersFeed;