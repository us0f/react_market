import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const OrdersNav = ({ currentPage, handlePageChange, totalPages }) => {

  return (
    <div className="flex fixed w-full h-full justify-between items-center px-32 pointer-events-none">

        <FaArrowAltCircleLeft
         className={`size-28 rounded-full bg-gray-500 text-white hover:bg-gray-600 cursor-pointer pointer-events-auto ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
         onClick={() => handlePageChange(currentPage - 1)}
         disabled={currentPage === 1}
        />

        <FaArrowAltCircleRight
         className={`size-28 rounded-full bg-gray-500 text-white hover:bg-gray-600 cursor-pointer pointer-events-auto ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} 
         onClick={() => handlePageChange(currentPage + 1)} 
         disabled={currentPage === totalPages} />

    </div>
  )
}

export default OrdersNav;