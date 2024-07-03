import { useDispatch, useSelector } from "react-redux";
import "./productsStyle.css";
import { useState } from "react";
import { addToBag } from "./productsSlice";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleDecrease = (id) => {
    products.map((product) => {
      if (product.id === id) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    });
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const addInBag = (product) => {
    dispatch(
      addToBag({
        id: product.id,
        name: product.name,
        quantity,
        price: product.price,
        value: quantity * product.price,
      })
    );
  };
  return (
    <div className="products-gallery">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-name">{product.name}</div>
          <div className="product-price">{product.price} $</div>
          <div className="add-to-cart">
            <div className="quantity-to-buy">
              <button
                className="minus"
                onClick={() => handleDecrease(product.id)}
                disabled={quantity === 1}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                className="plus"
                onClick={handleIncrease}
                disabled={quantity === product.quantity}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="cart-btn">
              <button className="cart" onClick={() => addInBag(product)}>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
