import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/Checkout.css';

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);

  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = calculateTotal();
  const gst = total * 0.28;
  const shipping = 10;
  const grandTotal = total + gst + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\nTotal: $${grandTotal.toFixed(2)}`);
  };

  return (
    <div className="checkout">
      <h3>Checkout Summary</h3>
      <div className="checkout-items">
        <h4>Items in your Cart:</h4>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.title}</span> -{' '}
              <span>${item.price.toFixed(2)}</span> x{' '}
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="checkout-pricing">
        <p>Total: ${total.toFixed(2)}</p>
        <p>GST (28%): ${gst.toFixed(2)}</p>
        <p>Shipping: ${shipping}</p>
        <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h4>Shipping Address</h4>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your address"
          required
        />

        <h4>Payment Method</h4>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>

        <button type="submit" className="checkout-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
