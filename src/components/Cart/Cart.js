import React from 'react'
import CartItem from './CartItem';
import { useSelector, useDispatch } from "react-redux";
import { selectTotalPrice, selectTotalQuantity, clearCart } from "../../features/cart/cartSlice"; 
import { selectAllCategories, useUpdateCategoryMutation } from '../../features/categories/categoriesSlice';
import { addCheckoutOrder } from "../../features/orders/ordersSlice";
const Cart = ({ products, showCart, changeQuantity}) => {
  const dispatch = useDispatch();

  const totalPrice = useSelector(selectTotalPrice).toFixed(2);
  const totalQty = useSelector(selectTotalQuantity);

  const cart = useSelector((state) => state.cart.cart);

  const categories = useSelector(selectAllCategories);

  const [updateCategory] = useUpdateCategoryMutation();

  const handleCheckout = async () => {
    try {
      for (const cartItem of cart) {
        const category = categories.find(category =>
          category.products.some(prod => Number(prod.id) === Number(cartItem.id))
        );
  
        if (!category) {
          console.error(`Category for product ID ${cartItem.id} not found.`);
          continue;
        }

        const foundProduct = category.products.find(prod => Number(prod.id) === Number(cartItem.id));
  
        if (foundProduct) {
          const updatedStock = foundProduct.stock - cartItem.quantity;
          const updatedSold = foundProduct.sold + cartItem.quantity;
          const updatedCategory = {
            ...category,
            products: category.products.map(prod =>
              prod.id === foundProduct.id
                ? { ...foundProduct, stock: updatedStock, sold: updatedSold }
                : prod
            ),
          };
  
          const response = await updateCategory(updatedCategory);
          console.log("Update response:", response);
          
        }
      }

      const checkoutRecord = {
        products: cart,
        date: new Date().toISOString(),
        totalPrice: totalPrice,
        totalQty: totalQty,
      };
      console.log("Adding checkout order:", checkoutRecord);
      dispatch(addCheckoutOrder(checkoutRecord));
  
      dispatch(clearCart());
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className={`flex flex-wrap w-full fixed bottom-0 h-64 p-4 overflow-auto bg-gray-900 text-white transition-all duration-300 ease-in-out ${showCart ? 'translate-y-0 opacity-100' : 'translate-y-full'}`}>

      {cart.length>0 ? (
        <>
          <div className='flex justify-center items-center'>
          {cart.map((product, id) => (
              <CartItem key={id}products={products} product={product} changeQuantity={changeQuantity} />
          ))}
          </div>


          {totalPrice>0 &&

          <div className='flex justify-around items-center w-full bg-gray-600 p-1' >

              <h1 className='text-white '>Total Price: {totalPrice} EGP</h1>

              <button className='bg-green-700 rounded-2xl p-2' onClick={handleCheckout}>
                  Checkout
              </button>

          </div>
          }

        </>
        ) : (
        <div className='flex justify-center items-center w-full p-1' >

          <h1 className='text-3xl text-white font-bold'>Your Cart is Empty.</h1>

        </div>
      )}   

    </div> 
  )
}

export default Cart;