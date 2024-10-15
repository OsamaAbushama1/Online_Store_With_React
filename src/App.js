import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import OrderSummary from "./components/OrderSummary";

function App() {
  return (
    <div className="App">
     <AppNavbar/>
     <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="/order-summary" element={<OrderSummary />} />
     </Routes>
    </div>
  );
}

export default App;
