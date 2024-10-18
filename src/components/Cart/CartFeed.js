import { useState } from "react";
import CartButton from "./CartButton";
import Cart from "./Cart";
const CartFeed = ({ products }) => {




  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart(!showCart);

  return (

    <div className={`flex flex-col justify-center fixed bottom-0 w-full transition-transform`}>

      <CartButton showCart={showCart} toggleCart={toggleCart}/>
      
      <Cart products={products} showCart={showCart} />

    </div>
  )
}

export default CartFeed;