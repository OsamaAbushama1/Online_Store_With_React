import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { clear } from '../rtk/slices/cartSlice';

function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const totalPrice = cart.reduce((acc, product) => acc += product.price, 0);

  const handleConfirm = () => {
    alert("Thank you for your order!");
    dispatch(clear()); 
  };
  return (
    <Container className="py-5">
      <h1 className="mb-5 mt-5">Order Summary</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="mt-3">Total Price: {totalPrice.toFixed(2)}$</h5>
      <Button variant="success" className="mt-3" onClick={handleConfirm}>
        Confirm Order
      </Button>
    </Container>
  );
}

export default OrderSummary;
