import { Container, Table, Button , Image} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clear, deleteFromCart, updateQuantity } from "../rtk/slices/cartSlice";
import './Cart.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, product) => acc += product.price * product.quantity, 0);
  const handleConfirm = () => {
    if (cart.length === 0) {
        alert(" Your cart is empty. Please add some products to your cart.");
      } else {
        navigate('/order-summary'); 
      }
  };
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (productId, change) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      const newQuantity = product.quantity + change;
      if (newQuantity > 0) { 
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
      }
    }
  };

  return (
    <Container>
      <h1 className="py">Welcome To Cart</h1>
      <Button className="btn-clear-cart" variant="primary" onClick={()=>dispatch(clear())}>Clear Cart</Button>
      <Table striped bordered hover size="sm" className="table-custom">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Img</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td><Image src={product.image} alt={product.title} style={{width:"100px" , height: "100px"}} width="50" /></td>
              <td>{product.price}$</td>
              <td className="quantity-control ">
                <Button className="btn-quantity" variant="secondary" onClick={() => handleQuantityChange(product.id, -1)}>-</Button>
                <span className="mx-2 quantity-text">{product.quantity}</span>
                <Button className="btn-quantity" variant="secondary" onClick={() => handleQuantityChange(product.id, 1)}>+</Button>
              </td>
              <td>
                <Button variant="danger" className="btn-delete-product" onClick={()=>dispatch(deleteFromCart(product))}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="total-price">Total Price : {totalPrice.toFixed(2)}$</h5>
      <Button variant="success" className="mt-4" onClick={handleConfirm}>
        Confirm Order
      </Button>
    </Container>
  );
}

export default Cart;
