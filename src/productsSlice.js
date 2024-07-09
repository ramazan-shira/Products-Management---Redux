import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: JSON.parse(localStorage.getItem("products")),
    onEdit: false,
    productOnEdit: {},
    productsInBag: [],
    bagTotal: 0,
    validLogin: JSON.parse(localStorage.getItem("validLogin")),
    loginError: "",
    quantityError: "",
  },
  reducers: {
    addProduct: (state, action) => {
      const addedProduct = state.products.find((product) =>
        product.name.toLowerCase().includes(action.payload.name.toLowerCase())
      );
      if (addedProduct) {
        alert("Product Exists");
      } else {
        state.products.push({
          id: new Date().getTime(),
          name: action.payload.name,
          unit: action.payload.unit,
          price: Number(action.payload.price),
          quantity: Number(action.payload.quantity),
          availableStock: Number(action.payload.quantity),
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    toggleOnEdit: (state, action) => {
      state.onEdit = action.payload.onEdit;
    },

    setProductToUpdate: (state, action) => {
      state.productOnEdit = action.payload.productOnEdit;
    },

    updateProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.name = action.payload.name;
          product.unit = action.payload.unit;
          product.price = action.payload.price;
          product.quantity = action.payload.quantity;
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    addQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity =
            Number(product.quantity) + Number(action.payload.stock);
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    toggleLogin: (state, action) => {
      if (
        action.payload.username === "admin" &&
        action.payload.password === "admin"
      ) {
        state.validLogin = true;
        state.loginError = "";
      } else {
        state.validLogin = false;
        state.loginError = "Incorrect username or password!";
      }
      localStorage.setItem("validLogin", JSON.stringify(state.validLogin));
    },

    toggleLogOut: (state, action) => {
      state.validLogin = false;
      localStorage.setItem("validLogin", JSON.stringify(state.validLogin));
    },

    addToBag: (state, action) => {
      const found = state.productsInBag.find(
        (productInBag) => productInBag.id === action.payload.id
      );

      if (found) {
        state.productsInBag.map((productInBag) => {
          if (productInBag.id === action.payload.id) {
            productInBag.quantity += action.payload.quantity;
          }
          return productInBag;
        });
      } else {
        state.productsInBag.push({
          id: action.payload.id,
          name: action.payload.name,
          quantity: action.payload.quantity,
          price: action.payload.price,
          value: action.payload.value,
          quantityError: "",
        });
      }
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.availableStock -= action.payload.quantity;
        }
        return product;
      });
      state.bagTotal += action.payload.value;
    },

    decreaseQuantity: (state, action) => {
      state.productsInBag = state.productsInBag.map((productInBag) => {
        if (
          productInBag.id === action.payload.id &&
          productInBag.quantity > 1
        ) {
          productInBag.quantity -= 1;
          state.products = state.products.map((product) => {
            if (product.id === action.payload.id) {
              product.availableStock += 1;
            }
            return product;
          });
          state.bagTotal -= Number(productInBag.price);
          productInBag.quantityError = "";
        }
        return productInBag;
      });
    },

    increaseQuantity: (state, action) => {
      const selectedProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      state.productsInBag = state.productsInBag.map((productInBag) => {
        if (productInBag.id === action.payload.id) {
          if (productInBag.quantity < selectedProduct.quantity) {
            productInBag.quantity += 1;
            selectedProduct.availableStock -= 1;
            state.bagTotal += productInBag.price;
            state.products = state.products.map((product) => {
              if (product.id === action.payload.id) {
                product.availableStock =
                  product.quantity - productInBag.quantity;
              }
              return product;
            });
          } else {
            productInBag.quantityError = "Out of stock!";
          }
        }
        return productInBag;
      });
    },

    removeFromCart: (state, action) => {
      state.productsInBag = state.productsInBag.filter(
        (productInBag) => productInBag.id !== action.payload.productInBag.id
      );
      state.products = state.products.map((product) => {
        if (product.id === action.payload.productInBag.id) {
          product.availableStock = product.quantity;
        }
        return product;
      });
      state.bagTotal -=
        action.payload.productInBag.price *
        action.payload.productInBag.quantity;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    completeShopping: (state, action) => {
      state.productsInBag = state.productsInBag.map((productInBag) => {
        state.products = state.products.map((product) => {
          if (product.id === productInBag.id) {
            product.quantity -= productInBag.quantity;
            product.availableStock = product.quantity;
          }
          return product;
        });
        return productInBag;
      });
      state.productsInBag = [];
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  toggleOnEdit,
  setProductToUpdate,
  updateProduct,
  addQuantity,
  addToBag,
  validLogin,
  toggleLogin,
  toggleLogOut,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  completeShopping,
} = productsSlice.actions;
export default productsSlice.reducer;
