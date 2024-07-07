import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./style.css";
import Shop from "./Shop";
import Login from "./Login";
import ManageProducts from "./ManageProducts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}

export default App;
