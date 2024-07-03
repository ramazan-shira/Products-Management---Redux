import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    onEdit: false,
    productOnEdit: {},
    productsInBag: [],
    bagTotal: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        id: new Date().getTime(),
        name: action.payload.name,
        unit: action.payload.unit,
        price: action.payload.price,
        quantity: action.payload.quantity,
      });
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
    addToBag: (state, action) => {
      state.productsInBag.push({
        id: action.payload.id,
        name: action.payload.name,
        quantity: action.payload.quantity,
        price: action.payload.price,
        value: action.payload.value,
      });
    },
    cartTotal: (state, action) => {
      let total = [];
      state.productsInBag.forEach((productInBag) => {
        total.push(productInBag.value);
      });
      total.forEach((total) => {
        state.bagTotal += total;
      });
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
} = productsSlice.actions;
export default productsSlice.reducer;
