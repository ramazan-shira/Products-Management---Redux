import { useDispatch, useSelector } from "react-redux";
import "./productsStyle.css";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./productsSlice";
const Cart = () => {
  const productsInBag = useSelector((state) => state.products.productsInBag);
  const bagTotal = useSelector((state) => state.products.bagTotal);

  const quantityError = useSelector((state) => state.products.quantityError);

  const dispatch = useDispatch();

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleRemove = (productInBag) => {
    dispatch(removeFromCart({ productInBag }));
  };
  return (
    <div className="shopping-cart">
      <div className="cart-title">
        Shopping Bag <i className="fa-solid fa-cart-shopping"></i>
      </div>
      {productsInBag.map((productInBag) => (
        <div className="added-product-card" key={productInBag.id}>
          <div className="bag-product">
            <div className="bag-product-info">
              <div className="shop-info">
                <p className="prod-name">{productInBag.name}</p>

                <p>
                  <button onClick={() => handleDecrease(productInBag.id)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  {productInBag.quantity}{" "}
                  <button onClick={() => handleIncrease(productInBag.id)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>{" "}
                  * {productInBag.price}
                </p>
              </div>
              <div className="value">
                <p>
                  Value:{" "}
                  {Number(productInBag.price) * Number(productInBag.quantity)}
                </p>
              </div>
            </div>
            <div className="error">{quantityError}</div>
          </div>
          <div className="cart-action">
            <button onClick={() => handleRemove(productInBag)}>
              <i className="fa-solid fa-square-xmark"></i>
            </button>
          </div>
        </div>
      ))}
      <p className="total">Total: {bagTotal}</p>
    </div>
  );
};

export default Cart;
