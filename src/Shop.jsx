import { Link } from "react-router-dom";
import Cart from "./Cart";
import Products from "./Products";
import "./productsStyle.css";
const Shop = () => {
  return (
    <div className="shop">
      <div className="shoping-products">
        <Products />
        <Cart />
      </div>
      <Link to="/">
        <button>Manage Products</button>
      </Link>
    </div>
  );
};

export default Shop;
