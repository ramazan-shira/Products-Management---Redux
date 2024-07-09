import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBag } from "./productsSlice";

const BuyQuantity = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  const handleIncrease = () => {
    if (quantity < product.availableStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setError("");
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setError("Out of stock!");
    }
  };

  const handleDecrease = () => {
    if (quantity - 1 <= product.availableStock) {
      setError("");
    } else {
      setError("Out of stock!");
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const dispatch = useDispatch();

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
    setError("");
    setQuantity(1);
  };
  return (
    <>
      <div className="quantity-to-buy">
        <div className="quantity-input">
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
          <button className="plus" onClick={handleIncrease}>
            <i className="fa-solid fa-plus"></i>
          </button>
          <div className="cart-btn">
            <button
              className="cart"
              onClick={() => addInBag(product)}
              disabled={quantity > product.availableStock}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
        <div className="error">{error}</div>
      </div>
    </>
  );
};

export default BuyQuantity;
