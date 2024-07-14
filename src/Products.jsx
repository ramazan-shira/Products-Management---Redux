import "./productsStyle.css";
import BuyQuantity from "./BuyQuantity";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="products-gallery">
      {products?.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-name">{product.name}</div>
          <div className="product-price">{product.price} $</div>
          <div className="add-to-cart">
            <BuyQuantity product={product} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
