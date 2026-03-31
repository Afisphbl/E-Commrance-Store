import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import "./Cart.css";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import CartItem from "../../components/CartItem/CartItem";
import { formatPrice } from "../../utils/helper";

function Cart() {
  const { cartState, clearCart } = useCart();

  if (cartState.totalQuantity === 0) return <EmptyCart />;

  return (
    <section className="cart-page container">
      <h1 className="page-title">Shopping Cart</h1>
      <p className="cart-meta">Total Items: {cartState.totalQuantity}</p>

      <div className="cart-layout">
        <div className="cart-list-container">
          <div className="cart-list-header">
            <h2>Product</h2>
            <p>Action</p>
          </div>

          <div className="cart-list">
            {cartState.items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <div className="cart-actions">
            <Link
              to="/products"
              className="btn-secondary flex align-center gap-2 w-fit"
            >
              <ArrowBigLeft size={20} />
              Continue Shopping
            </Link>
            <button
              className="btn-destructive btn"
              aria-label="Clear cart"
              onClick={clearCart}
            >
              <Trash2 size={20} />
              Clear Cart
            </button>
          </div>
        </div>
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <p>Total Items: {cartState.totalQuantity}</p>
              <p>{formatPrice(cartState.totalAmount)}</p>
            </div>
            <div className="summary-row">
              <p>Shipping:</p>
              <p>
                {cartState.shipping > 0
                  ? formatPrice(cartState.shipping)
                  : "Free"}
              </p>
            </div>

            <div className="summary-divider"></div>

            <div className="grand-total">
              <div className="summary-row">
                <p>Total:</p>
                <p>{formatPrice(cartState.totalAmount + cartState.shipping)}</p>
              </div>
            </div>

            <button className="btn-primary w-full">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <div className="cart-empty container">
      <div className="cart-empty-content">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
