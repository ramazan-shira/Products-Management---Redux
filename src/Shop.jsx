import { Link } from "react-router-dom";
import Cart from "./Cart";
import Products from "./Products";
import "./productsStyle.css";
import { useSelector } from "react-redux";
const Shop = () => {
  const validLogin = useSelector((state) => state.products.validLogin);
  return (
    <div className="shop">
      <div className="shoping-products">
        <Products />
        <Cart />
      </div>
      {validLogin && (
        <Link to="/manage-products">
          <button>Manage Products</button>
        </Link>
      )}
    </div>
  );
};

export default Shop;
