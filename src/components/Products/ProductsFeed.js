import Products from './Products.js';
import CartFeed from '../Cart/CartFeed.js';
import Loading from '../../pages/Loading.js';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../features/cart/cartSlice.js';

const ProductsFeed = ({ products }) => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (!products) {
        return <Loading />;
    }

  return (
    <div className='flex flex-wrap justify-center items-center'>

        <Products addToCart={addToCart} products={products} />

        <CartFeed cart={cart} addToCart={handleAddToCart} products={products}/>

    </div>
  )
}

export default ProductsFeed;