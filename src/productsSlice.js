import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    onEdit: false,
    productOnEdit: {},
    productsInBag: [],
    bagTotal: 0,
    validLogin: false,
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
          price: action.payload.price,
          quantity: action.payload.quantity,
          availableStock: action.payload.quantity,
        });
      }
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
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
    },

    addQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity =
            Number(product.quantity) + Number(action.payload.stock);
        }
        return product;
      });
    },

    toggleLogin: (state, action) => {
      if (
        action.payload.username === "admin" &&
        action.payload.password === "admin"
      ) {
        state.validLogin = true;
        state.loginError = "";
      } else {
        state.loginError = "Incorrect username or password!";
      }
    },

    toggleLogOut: (state, action) => {
      state.validLogin = false;
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
        });
      }
      state.bagTotal += action.payload.value;
    },

    decreaseQuantity: (state, action) => {
      state.productsInBag = state.productsInBag.map((productInBag) => {
        if (
          productInBag.id === action.payload.id &&
          productInBag.quantity > 1
        ) {
          productInBag.quantity -= 1;
          state.bagTotal -= Number(productInBag.price);
          state.quantityError = "";
        }
        return productInBag;
      });
    },

    // increaseQuantity: (state, action) => {
    //   state.productsInBag = state.productsInBag.map((productInBag) => {
    //     if (productInBag.id === action.payload.id) {
    //       productInBag.quantity += 1;
    //       state.bagTotal += Number(productInBag.price);
    //     }
    //     return productInBag;
    //   });
    // },
    increaseQuantity: (state, action) => {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          state.productsInBag.map((productInBag) => {
            if (
              productInBag.id === action.payload.id &&
              productInBag.quantity < product.quantity
            ) {
              productInBag.quantity += 1;
              state.bagTotal += Number(productInBag.price);
              state.quantityError = "";
              product.availableStock -= productInBag.quantity;
            } else {
              state.quantityError = "Out of stock!";
            }
            return productInBag;
          });
        }
        return product;
      });
    },

    removeFromCart: (state, action) => {
      state.productsInBag = state.productsInBag.filter(
        (productInBag) => productInBag.id !== action.payload.productInBag.id
      );
      state.bagTotal -=
        action.payload.productInBag.price *
        action.payload.productInBag.quantity;
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
} = productsSlice.actions;
export default productsSlice.reducer;
