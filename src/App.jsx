import React from "react";
import { Route, Routes } from "react-router-dom";
import "../src/assets/styles/scss/_all.scss";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProductList from "./components/Products/ProductList";
import FullProduct from "./components/Products/FullProduct";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items/:id" element={<FullProduct />} />
      </Routes>
    </div>
  );
}

export default App;
