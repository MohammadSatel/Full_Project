import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { removeFromCart, clearCart, CartItem } from '../features/cart/cartSlice';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { placeOrder } from '../features/cart/cartApi';
import '../features/cart/Cart.css'; // Make sure this path is correct

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSuccess = async () => {
    if (authToken) {
      try {
        await placeOrder(authToken, cartItems, totalSum);
        dispatch(clearCart());
        setOrderPlaced(true);
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
      }
    } else {
      console.error('Auth token is null');
      alert('Authentication required for placing an order.');
    }
  };

  useEffect(() => {
    setShowLoginAlert(!authToken);
  }, [authToken]);

  return (
    <div className="card">
      {orderPlaced && <div className="alert alert-success">Order placed successfully!</div>}
      {paypalError && <div className="alert alert-danger">{paypalError}</div>}
      {showLoginAlert && <div className="alert alert-danger">Please log in to proceed with checkout.</div>}
      <div className="card-body">
        <h5 className="card-title">Shopping Cart</h5>
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} x {item.quantity} - ${item.price * item.quantity}
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <strong>Total: ${totalSum}</strong>
        </div>
        <div className="paypal-buttons-container">
          {authToken && totalSum > 0 && (
            <PayPalScriptProvider options={{ clientId: "ASOT4hn_DSjrsM66d85x6QwmXabnCzldLqdJhQMrVIWE-RuHMswGT3pJ0sLX-643tz00gkMXV9rMDw-J" }}>
              <PayPalButtons 
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: totalSum.toString(),
                      },
                    }],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    if (actions.order) {
                      await actions.order.capture();
                      handleOrderSuccess();
                    } else {
                      console.error('Order actions not available');
                      setPaypalError('Error: Order actions not available.');
                    }
                  } catch (error) {
                    console.error('Error capturing order:', error);
                    setPaypalError('Error processing payment. Please try again.');
                  }
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
