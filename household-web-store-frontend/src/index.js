import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import NoPage from "./Pages/NoPage/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
