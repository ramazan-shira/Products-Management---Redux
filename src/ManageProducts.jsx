import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  setProductToUpdate,
  toggleLogOut,
  toggleOnEdit,
  updateProduct,
} from "./productsSlice";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import Quantity from "./Quantity";

const ManageProducts = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [nameError, setNameError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const validLogin = useSelector((state) => state.products.validLogin);
  const onEdit = useSelector((state) => state.products.onEdit);
  const productOnEdit = useSelector((state) => state.products.productOnEdit);

  const regExNumber = /^\d+$/;
  const dispatch = useDispatch();

  const handleSave = () => {
    let valid = false;
    if (name === "") {
      setNameError("Product name cannot be empty!");
      valid = false;
    } else {
      valid = true;
      setNameError("");
    }

    if (unit === "") {
      setUnitError("Select a unit!");
      valid = false;
    } else {
      valid = true;
      setUnitError("");
    }

    if (price === "") {
      setPriceError("Price cannot be empty!");
      valid = false;
    } else if (price === 0) {
      setPriceError("Price must be greater than 0!");
      valid = false;
    } else if (!regExNumber.test(price)) {
      setPriceError("Price must be a number");
      valid = false;
    } else {
      valid = true;
      setPriceError("");
    }

    if (quantity === "") {
      setQuantityError("Quantity cannot be empty!");
      valid = false;
    } else if (quantity === 0) {
      setQuantityError("Quantity must be greater than 0!");
      valid = false;
    } else if (!regExNumber.test(quantity)) {
      setQuantityError("Quantity must be a number");
      valid = false;
    } else {
      valid = true;
      setQuantityError("");
    }

    if (valid) {
      dispatch(
        addProduct({
          name,
          unit,
          price,
          quantity,
        })
      );
      setName("");
      setQuantity("");
      setPrice("");
      setUnit("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const handleEdit = (product) => {
    dispatch(toggleOnEdit({ onEdit: !onEdit }));
    dispatch(setProductToUpdate({ productOnEdit: product }));
    setName(product.name);
    setUnit(product.unit);
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  const handleCancel = () => {
    dispatch(toggleOnEdit({ onEdit: false }));
  };

  const handleUpdate = () => {
    dispatch(
      updateProduct({ id: productOnEdit.id, name, unit, price, quantity })
    );
    dispatch(toggleOnEdit({ onEdit: false }));
    dispatch(setProductToUpdate({ productOnEdit: {} }));
    setName("");
    setUnit("");
    setPrice("");
    setQuantity("");
  };

  const products = useSelector((state) => state.products.products);

  const navigate = useNavigate("");
  const logOut = () => {
    dispatch(toggleLogOut());
    navigate("/");
  };
  return (
    validLogin && (
      <div className="products-management">
        <div className="log-out">
          <button onClick={logOut}>
            Log Out <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
        <div className="add-products">
          <h1>Add products</h1>
          <div className="form">
            <div className="form-input">
              <div className="input">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <span className="error">{nameError}</span>
            </div>
            <div className="form-input">
              <div className="input">
                <label>Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="select">Choose unit</option>
                  <option value="piece">Piece</option>
                  <option value="meter">m</option>
                  <option value="kg">kg</option>
                  <option value="litre">l</option>
                </select>
              </div>
              <span className="error">{unitError}</span>
            </div>
            <div className="form-input">
              <div className="input">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <span className="error">{priceError}</span>
            </div>
            <div className="form-input">
              <div className="input">
                <label>Quantity</label>
                <input
                  type="text"
                  placeholder="Product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <span className="error">{quantityError}</span>
            </div>
            <div className="form-action">
              {onEdit ? (
                <div className="edit-btns">
                  <button onClick={handleUpdate} className="save">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleSave}>Add Product</button>
              )}
            </div>
          </div>
          <Link to="/shop">
            <button className="view-products">Buy Products</button>
          </Link>
        </div>
        {products.length > 0 && (
          <div className="products">
            <h1 className="products-title">Products</h1>
            <div className="products-cards">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-info">
                    <p className="name">{product.name}</p>
                    <p>
                      <span>Unit: </span>
                      {product.unit}
                    </p>
                    <p>
                      <span>Price: </span>
                      {product.price} $
                    </p>
                    <p>
                      <span>Quantity: </span>
                      {product.quantity}
                    </p>
                  </div>
                  <Quantity product={product} />
                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => handleDelete(product.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ManageProducts;
