import { useDispatch } from "react-redux";
import { changeQuantity, setQuantity } from "../../features/cart/cartSlice"; 

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        dispatch(setQuantity({ id: product.id, quantity: parseInt(value) || 0 }));
    }
  };

  let prodImg;

  try {
  prodImg = require(`../../assets/prodImages/${product.id}.png`);
  } catch (error) {
  prodImg = require(`../../assets/unknown.png`);
  }

  return (
    <div className="flex flex-col m-2 justify-center items-center">

        <img src={ prodImg } alt={product.name} className="size-28" />

        <div className="">
            <div className="name">{product.name}</div>
            <div className="totalPrice">{(product.price * product.quantity).toFixed(2)} EGP</div>
        </div>

        <div className="flex items-center justify-between">
            <span className="bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={() => dispatch(changeQuantity({ id: product.id, type: 'remove' }))}>
            -
            </span>

            <input
                type="text"
                value={product.quantity}
                onChange={handleQuantityChange}
                min="0"
                className="w-12 text-center text-black border border-gray-400 rounded"
            />
            
            <span className="bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={() => dispatch(changeQuantity({ id: product.id, type: 'add' }))}>
            +
            </span>
        </div>

    </div>
  )
}

export default CartItem;