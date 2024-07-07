import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { addQuantity } from "./productsSlice";
const Quantity = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [stock, setStock] = useState(0);

  const handleDecrease = () => {
    setStock((prevStock) => prevStock - 1);
  };

  const handleIncrease = () => {
    setStock((prevStock) => prevStock + 1);
  };

  const addStock = (id) => {
    dispatch(addQuantity({ id, stock }));
    setStock(1);
  };

  return (
    <div className="add-stock">
      <div className="quantity">
        <button onClick={handleDecrease}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={handleIncrease}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <button className="add-quantity" onClick={() => addStock(product.id)}>
        Add Stock
      </button>
    </div>
  );
};

export default Quantity;
