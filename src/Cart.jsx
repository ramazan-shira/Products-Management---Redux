import { useSelector } from "react-redux";
import "./productsStyle.css";
const Cart = () => {
  const productsInBag = useSelector((state) => state.products.productsInBag);
  const bagTotal = useSelector((state) => state.products.bagTotal);

  return (
    <div className="shopping-cart">
      <div className="cart-title">Shopping Bag</div>
      {productsInBag.map((productInBag) => (
        <div className="added-product-card" key={productInBag.id}>
          <div className="shop-info">
            <p>{productInBag.name}</p>
            <p>
              {productInBag.quantity} * {productInBag.price}
            </p>
          </div>
          <div className="value">
            <p>
              Value:{" "}
              {Number(productInBag.price) * Number(productInBag.quantity)}
            </p>
          </div>
        </div>
      ))}
      <p className="total">{bagTotal}</p>
    </div>
  );
};

export default Cart;
