import React from 'react';
import { useSelector } from 'react-redux';
import CartProductCard from './CartProductCard';

const CartPage = () => {
  const items = useSelector(state => state.cart.items);
console.log("item",items)
  return (
    <div className="cart-container">
    {items.length > 0 ? (
      items.map((product) => (
        <CartProductCard key={product.id} product={product} />
      ))
    ) : (
      <p>Your cart is empty!</p>
    )}
  </div>
  );
};

export default CartPage;
